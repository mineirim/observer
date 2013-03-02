<?php

class Data_AndamentosController extends Zend_Rest_Controller
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
        
        $andamentos_table = new Data_Model_DbTable_Andamentos();
        $rows = $andamentos_table->fetchAll(null, 'id');
        $this->_helper->viewRenderer->setNoRender(true);
        $this->view->rows= $rows->toArray();
        $this->view->total = count($rows);
        $this->getResponse()->setHttpResponseCode(200);
    }

    public function getAction()
    {
        // action body
    }

    public function putAction()
    {
        //gerado automaticamente
        if(($this->getRequest()->isPut())){
            try{
                $andamentos_table = new Data_Model_DbTable_Andamentos();
                $formData = $this->getRequest()->getParam('rows');
                $formData = json_decode($formData,true);
                $id=$formData['id'];
                unset($formData['id']);
                $andamentos_table->update($formData, "id=$id");
                $this->view->msg = "Dados atualizados com sucesso!";
                $obj = $andamentos_table->fetchRow("id=$id");
                $this->view->record = $obj->toArray();
                $this->view->success=true;
                $this->getResponse()->setHttpResponseCode(202);
            }  catch (Exception $e){
                $this->getResponse()->setHttpResponseCode(500);
                $this->view->success=false;
                $this->view->method = $this->getRequest()->getMethod();
                $this->view->msg = "Erro ao atualizar registro<br>".$e->getMessage();
                $this->view->trace =$e->getTraceAsString();
                
            }
        }else{
            $this->getResponse()->setHttpResponseCode(501);
            $this->view->msg="Método ".$this->getRequest()->getMethod();
        }
    }

    public function postAction()
    {
        //gerado automaticamente
        if($this->getRequest()->isPost()){
            try{
        
                $andamentos_table = new Data_Model_DbTable_Andamentos();
                $formData = $this->getRequest()->getPost('rows');
                $formData = json_decode($formData,true);
                unset($formData['id']);
                foreach ($formData as $key => $value) {
                    if($value=='')
                       unset($formData[$key]);
                }
                $id = $andamentos_table->insert($formData);
                $this->view->msg="Dados inseridos com sucesso!";
        
                $obj = $andamentos_table->fetchRow("id=$id");
                $this->view->record = $obj;
                $this->view->success=true;
                $this->view->metodo = $this->getRequest()->getMethod();
                $this->getResponse()->setHttpResponseCode(202);
        
            }  catch (Exception $e){
                $this->getResponse()->setHttpResponseCode(500);
                $this->view->success = false;
                $this->view->method  = $this->getRequest()->getMethod();
                $this->view->msg     = "Erro ao atualizar/inserir registro<br>{$e->getMessage()}";
                $this->view->trace   = $e->getTraceAsString();
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
                $andamentos_table = new Data_Model_DbTable_Andamentos();
                $id = $this->_getParam('id');
                $andamentos_table->delete('id='.$id);
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

