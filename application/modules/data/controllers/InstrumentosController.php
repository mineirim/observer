<?php

class Data_InstrumentosController extends Zend_Rest_Controller
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

    public function headAction()
    {
        $this->getResponse()->setHttpResponseCode(200);
    }
    public function indexAction()
    {
        $instrumentos_table = new Data_Model_DbTable_Instrumentos();
        $this->_helper->viewRenderer->setNoRender(true);
        if($this->getParam('tree')){
            $id = $this->getParam('id',1);
            $instrumentos_model  = new Data_Model_Instrumentos();
            $stmt =  $instrumentos_model->getRecursiveStructure($id);
            $this->view->total = $stmt->rowCount();
            $this->view->rows= $stmt->fetchAll();
        }else{
            $page = $instrumentos_table->getOnePageOfOrderEntries($this->getAllParams());
            $this->view->rows =$page['rows'];
            $this->view->total = $page['total'];
        }
        $this->getResponse()->setHttpResponseCode(200);
    }

    public function getAction()
    {
        if($this->getParam('children')){
            $instrumentos_table = new Data_Model_DbTable_Instrumentos();
            $this->_helper->viewRenderer->setNoRender(true);   
            $id = $this->getParam('id',1);
            $this->view->rows = $instrumentos_table->fetchAll(['instrumento_id=?'=>$id])->toArray();
        }else{
            return $this->_forward('index');
        }
        $this->getResponse()->setHttpResponseCode(200);
    }

    public function putAction()
    {
        //gerado automaticamente
        if(($this->getRequest()->isPut())){
            try{
                $instrumentos_table = new Data_Model_DbTable_Instrumentos();
                $formData = $this->getRequest()->getParam('rows');
                $formData = json_decode($formData,true);
                $id=$formData['id'];
                unset($formData['id']);
                
                if($formData['instrumento_id']=="")
                    unset($formData['instrumento_id']);
                $instrumentos_table->update($formData, "id=$id");
                $this->view->msg = "Dados atualizados com sucesso!";
                $obj = $instrumentos_table->fetchRow("id=$id");
                $this->view->rows = $obj->toArray();
                $this->view->success=true;
                $this->getResponse()->setHttpResponseCode(200);
        
            }  catch (Exception $e){
                $this->view->success=false;
                $this->view->method = $this->getRequest()->getMethod();
                $this->view->msg = "Erro ao atualizar registro<br>".$e->getMessage() ."<br>".$e->getTraceAsString();
                $this->getResponse()->setHttpResponseCode(500);
            }
        }else{
            $this->view->msg="Método ".$this->getRequest()->getMethod();
                $this->getResponse()->setHttpResponseCode(501);
        }
    }

    public function postAction()
    {
        //gerado automaticamente
        if($this->getRequest()->isPost()){
            try{
        
                $instrumentos_table = new Data_Model_DbTable_Instrumentos();
                $formData = $this->getRequest()->getPost('rows');
                $formData = json_decode($formData,true);
                unset($formData['id']);
                foreach ($formData as $key => $value) {
                    if($value=='')
                       unset($formData[$key]);
                }
                $id = $instrumentos_table->insert($formData);
                $this->view->msg="Dados inseridos com sucesso!";
        
                $obj = $instrumentos_table->fetchRow("id=$id");
                $this->view->rows = $obj;
                $this->view->success=true;
                $this->view->metodo = $this->getRequest()->getMethod();
                $this->getResponse()->setHttpResponseCode(200);
        
            }  catch (Exception $e){
                $this->view->success = false;
                $this->view->method  = $this->getRequest()->getMethod();
                $this->view->msg     = "Erro ao atualizar/inserir registro<br>{$e->getMessage()}";
                $this->view->trace  ="{$e->getTraceAsString()}";
                
                $this->getResponse()->setHttpResponseCode(500);
            }
        }else{
            
                $this->getResponse()->setHttpResponseCode(501);
            $this->view->msg="Método ".$this->getRequest()->getMethod();
        }
    }

    public function deleteAction()
    {
        if($this->getRequest()->isDelete()){
            try{
                $instrumentos_table = new Data_Model_DbTable_Instrumentos();
                $id = $this->_getParam('id');
                $instrumentos_table->delete('id='.$id);
                $this->view->success=true;
                $this->view->msg="Dados apagados com sucesso!";
            }  catch (Exception $e){
                $this->view->success=false;
                $this->view->msg = "Erro ao apagar o registro<br>".$e->getTraceAsString();
            }
            
                $this->getResponse()->setHttpResponseCode(204);
        }else{
            $this->view->msg="Método delete";
            $this->view->parametros = $this->_getAllParams();
            
                $this->getResponse()->setHttpResponseCode(501);
        }
    }


}

