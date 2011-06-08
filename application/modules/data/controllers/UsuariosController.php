<?php
/**
* @author Marcone Costa <blog@marconecosta.com.br>
* @link www.barraetc.com.br/blogpress
*/
class Data_UsuariosController extends Zend_Rest_Controller
{

    public function init()
    {
		$swContext = $this->_helper->contextSwitch();
		$swContext->setAutoJsonSerialization(true);
		$swContext->addActionContext('index', array('json', 'xml'))
				->addActionContext('put', array( 'json', 'xml'))
				->addActionContext('post', array('json', 'xml'))
				->addActionContext('get', array('json', 'xml'))
				->addActionContext('delete', array( 'json', 'xml'))
				->initContext('json');
		$this->_helper->layout()->disableLayout();
    }

    public function indexAction()
    {
	$usuarios_table = new Application_Model_DbTable_Usuarios();
        $usuarios = $usuarios_table->fetchAll(null, 'id');
        $this->_helper->viewRenderer->setNoRender(true);
        $arr = array('rows'=> $usuarios->toArray(), 'total' => count($usuarios));
        $this->view->rows= $usuarios->toArray();
        $this->view->total = count($usuarios);
    }

    public function getAction()
    {
        // action body
    }

    public function postAction()
    {
        if($this->getRequest()->isPost()){
            try{
                
                $usuarios_table = new Application_Model_DbTable_Usuarios();
                $formData = $this->getRequest()->getPost('rows');
                $formData = json_decode($formData,true);
                unset($formData['id']);
				
                $id = $usuarios_table->insert($formData);
                $this->view->msg="Dados inseridos com sucesso!";

                $obj = $usuarios_table->fetchRow("id=$id");
                $this->view->record = $obj->toArray();
                $this->view->success=true;
            }  catch (Exception $e){
                $this->view->success=false;
                $this->view->method = $this->getRequest()->getMethod();
                $this->view->msg = "Erro ao inserir registro<br>".$e->getMessage() ."<br>".$e->getTraceAsString();
            }
        }else{
            $this->view->msg="Método ".$this->getRequest()->getMethod();
        }
    }

    public function putAction()
    {
	    if(($this->getRequest()->isPut())){
            try{
                $usuarios_table = new Application_Model_DbTable_Usuarios();
                $formData = $this->getRequest()->getParam('rows');
                $formData = json_decode($formData,true);
                $id=$formData['id'];
                unset($formData['id']);
                $usuarios_table->update($formData, "id=$id");
                $this->view->msg = "Dados atualizados com sucesso!";
                $obj = $usuarios_table->fetchRow("id=$id");
                $this->view->record = $obj->toArray();
                $this->view->success=true;
            }  catch (Exception $e){
                $this->view->success=false;
                $this->view->method = $this->getRequest()->getMethod();
                $this->view->msg = "Erro ao atualizar/inserir registro<br>".$e->getMessage() ."<br>".$e->getTraceAsString();
            }
        }else{
            $this->view->msg="Método ".$this->getRequest()->getMethod();
        }
    }
    public function deleteAction()
    {
        if($this->getRequest()->isDelete()){
            try{
                $usuarios_table = new Application_Model_DbTable_Usuarios();
                $id = $this->_getParam('id');
                $usuarios_table->delete('id='.$id);
                $this->view->success=true;
                $this->view->msg="Dados apagados com sucesso!";
            }  catch (Exception $e){
                $this->view->success=false;
                $this->view->msg = "Erro ao apagar o registro<br>".$e->getTraceAsString();
            }
        }else{
            $this->view->msg="Método delete";
            $this->view->parametros = $this->_getAllParams();
        }
    }

}











