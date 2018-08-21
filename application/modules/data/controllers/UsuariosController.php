<?php

/**
 * @author Marcone Costa <blog@marconecosta.com.br>
 * @link www.barraetc.com.br/blogpress
 */
class Data_UsuariosController extends Zend_Rest_Controller {

    public function init() {
        $swContext = $this->_helper->contextSwitch();
        $swContext->setAutoJsonSerialization(true);
        $swContext->addActionContext('index', array('json', 'xml'))
                ->addActionContext('put', array('json', 'xml'))
                ->addActionContext('post', array('json', 'xml'))
                ->addActionContext('get', array('json', 'xml'))
                ->addActionContext('delete', array('json', 'xml'))
                ->initContext('json');
        $this->_helper->layout()->disableLayout();
        $this->_helper->viewRenderer->setNoRender(true);
    }
    public function headAction()
    {
        $this->getResponse()->setHttpResponseCode(204);
    }

    public function indexAction() {
        $usuarios_table = new Data_Model_DbTable_Usuarios();       
        
        $this->_helper->viewRenderer->setNoRender(true);
        if($this->getParam('valid')){
            $where = "situacao_id=1 ";            
        }else{
            $where = "situacao_id<>2 ";            
        }
        if($this->_getParam('filter')){
            $filtro  = json_decode($this->_getParam('filter'),true);
            //se passado filtro =null, então deve retornar objeto vazio
            if (!$filtro[0]['value']) {
                return;
            }

            $where .= " AND " . $filtro[0]['property']."='".$filtro[0]['value']."'";
        }        
        $params = $this->getAllParams();
        $params['sort']=[
                        ['field'=>'situacao_id','dir'=>'desc'],
                        ['field'=>'nome','dir'=>'asc']
                        ];
        $page = $usuarios_table->getOnePageOfOrderEntries($params,$where);
        $this->view->rows =$page['rows'];
        $this->view->total = $page['total'];
        $this->getResponse()->setHttpResponseCode(200);
    }

    public function getAction() {
        $usuarios_table = new Data_Model_Usuarios();
        try{
            if($this->_getParam('id')=='me'){
                $user = Zend_Auth::getInstance()->getIdentity();
                $usuarioId = $user->id;
            }else{
                $usuarioId =$this->_getParam('id');
            }
            $usuario = $usuarios_table->getUsuario($usuarioId) ;
            $this->view->rows = [$usuario->toArray()];
            $this->view->total = count($usuario);
            $this->getResponse()->setHttpResponseCode(200);
        }  catch (Exception $e){
            $this->view->success=false;
            $this->view->msg = "Erro abrir o registro<br>" . $e->getMessage() . "<br>" . $e->getTraceAsString();
            $this->getResponse()->setHttpResponseCode(500);
        }
    }

    public function postAction() {
        if ($this->getRequest()->isPost()) {
            try {
                if($this->getRequest()->getParam('rows')){
                    $formDataJson = $this->getRequest()->getParam('rows');  
                }else{
                    $formDataJson=$this->getRequest()->getRawBody();
                    
                }
                $usuarios_table = new Data_Model_Usuarios();
                $formData = json_decode($formDataJson, true);
                $usuarios_table->checaDuplicidade($formData['usuario']);
                unset($formData['id']);
                $obj = $usuarios_table->addUsuario($formData);
                $this->view->msg = "Dados inseridos com sucesso!";
                $this->view->rows = $obj->toArray();
                $this->view->success = true;
                $this->getResponse()->setHttpResponseCode(201);
            } catch (Exception $e) {
                $this->view->success = false;
                $this->view->method = $this->getRequest()->getMethod();
                $this->view->msg = "<b>Erro ao inserir registro</b><br>" . $e->getMessage() ;
                $this->view->trace = $e->getTraceAsString();
                $this->getResponse()->setHttpResponseCode(500);
            }
        } else {
            $this->view->msg = "Método " . $this->getRequest()->getMethod();
            $this->getResponse()->setHttpResponseCode(501);
        }
    }

    public function putAction() {
        if (($this->getRequest()->isPut())) {
            try {
                $usuarios_table = new Data_Model_Usuarios();
                if($this->getRequest()->getParam('rows')){
                    $formDataJson = $this->getRequest()->getParam('rows');  
                }else{
                    $formDataJson=$this->getRequest()->getRawBody();
                    
                }
                $formData = json_decode($formDataJson, true);

                $id = $formData['id'];
                unset($formData['id']);
                if(isset($formData['senha'])){
                    $alterarSenha = isset($formData['alterar_senha'])? $formData['alterar_senha'] :false;
                    $obj = $usuarios_table->updatePassword("id=$id",$formData['senha'],$alterarSenha);
                    $sess = new Zend_Session_Namespace('changePassword');
                    if(isset($sess->forceChange)){
                        $logger = Zend_Registry::get('logger');
                        $usuarios_table->updateUsuario(array('alterar_senha'=>'false'),"id=$id");
                        Zend_Session::destroy('changePassword');
                        $logger->log(Zend_Auth::getInstance ()->getIdentity(),  Zend_Log::ALERT);
                        $this->logar($obj->usuario, $formData['senha']);
                        $logger->log(Zend_Auth::getInstance ()->getIdentity(),  Zend_Log::ALERT);
                        $obj = $usuarios_table->getUsuario($id);
                    }
                }else{
                    $obj = $usuarios_table->updateUsuario($formData, "id=$id");
                }
                $this->view->msg = "Dados atualizados com sucesso!";
                
                $this->view->rows = $obj->toArray();
                $this->view->success = true;
                $this->getResponse()->setHttpResponseCode(201);
            } catch (Exception $e) {
                $this->view->success = false;
                $this->view->method = $this->getRequest()->getMethod();
                $this->view->msg = "Erro ao atualizar registro<br>" . $e->getMessage() . "<br>" . $e->getTraceAsString();
                $this->getResponse()->setHttpResponseCode(500);
            }
        } else {
            $this->view->msg = "Método " . $this->getRequest()->getMethod();
            $this->getResponse()->setHttpResponseCode(501);
        }
    }

    public function deleteAction() {
        if ($this->getRequest()->isDelete()) {
            try {
                $usuarios_table = new Data_Model_Usuarios();
                $id = $this->_getParam('id');
                $usuarios_table->deleteUsuario($id);
                $this->view->success = true;
                $this->view->msg = "Dados apagados com sucesso!";
                $this->getResponse()->setHttpResponseCode(204);
            } catch (Exception $e) {
                $this->view->success = false;
                $this->view->msg = "Erro ao apagar o registro<br>" . $e->getTraceAsString();
                $this->getResponse()->setHttpResponseCode(500);
            }
        } else {
            $this->view->msg = "Método ". $this->getRequest()->getMethod();;
            $this->view->parametros = $this->_getAllParams();
            $this->getResponse()->setHttpResponseCode(501);
        }
    }
    private function logar($username,$password){
               try {
 
            $db = Zend_Registry::get('db'); 
            $authadapter = new Zend_Auth_Adapter_DbTable($db);

            // Assign the authentication informations to the adapter
            $authadapter->setTableName('usuarios')
                    ->setIdentityColumn('usuario')
                    ->setCredentialColumn('senha')
                    ->setCredentialTreatment("MD5(  ? || salt)");
            //Zend_Registry::set('auth', $authadapter);
            $filter = new Zend_Filter ( );
            $filter->addFilter(new Zend_Filter_StringTrim())->addFilter(new Zend_Filter_StripTags())->addFilter(new Zend_Filter_Alnum());

            // Give the adapter the username and the password
            $username = $filter->filter($username);
            $password = $filter->filter($password);
            $authadapter->setIdentity($username)->setCredential($password);

            $auth = Zend_Auth::getInstance();
            $auth->clearIdentity();
            $auth->getStorage()->clear();
            $result = $authadapter->authenticate(); //  $auth->authenticate ($authadapter);

            $zf_auth = Zend_Auth::getInstance();

            if ($result->isValid()) {
                
                $zf_auth = Zend_Auth::getInstance();
                $auth->getStorage()->write($authadapter->getResultRowObject(null, array('senha', 'salt')));
 
            } else {
                // Not valid, show the loginform
            }
        } catch (Zend_Auth_Exception $e) {
            $this->view->success=false;
            $this->view->errorMessage = $e->getMessage();
        } catch (Zend_Db_Adapter_Exception $e) {
            $this->view->success=false;
            $this->view->errorMessage = $e->getMessage();
        } catch (Zend_Exception $e) {
            $this->view->success=false;
            $this->view->errorMessage = $e->getMessage();
        }
    }

}

