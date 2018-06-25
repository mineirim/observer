<?php

class Data_SetoresController extends Zend_Rest_Controller
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
        $setores_table = new Data_Model_DbTable_Setores();
        $this->_helper->viewRenderer->setNoRender(true);
        $page = $setores_table->getOnePageOfOrderEntries($this->getAllParams());
        $this->view->rows =$page['rows'];
        $this->view->row =$page['rows'];
        $this->view->total = $page['total'];
    }

    public function getAction()
    {
        $this->_helper->viewRenderer->setNoRender(true);
        $setoresDBTable   = new Data_Model_DbTable_Setores();
        $setor = $setoresDBTable->find($this->getParam('id'));
        $this->view->row = $setor->toArray();
        $this->view->rows = $setor->toArray();
    }

    public function putAction()
    {
        //gerado automaticamente
        if(($this->getRequest()->isPut())){
            try{
                $setores_table = new Data_Model_DbTable_Setores();
                if ($this->getRequest()->getParam('rows')) {
                        $formDataJson = $this->getRequest()->getParam('rows');
                        $formData     = json_decode($formDataJson, true);
                } else {
                        $formDataJson = $this->getRequest()->getRawBody();
                        $formData     = json_decode($formDataJson, true);

                }                
                $id=$formData['id'];
                unset($formData['id']);
                $setores_table->update($formData, "id=$id");
                $this->view->msg = "Dados atualizados com sucesso!";
                $obj = $setores_table->fetchRow("id=$id");
                $this->view->record = $obj->toArray();
                $this->view->success=true;
                $this->view->rows    = $obj->toArray();
                $this->view->row    = $obj->toArray();
        
            }  catch (Exception $e){
                $this->view->success=false;
                $this->view->method = $this->getRequest()->getMethod();
                $this->view->msg = "Erro ao atualizar registro<br>".$e->getMessage() ."<br>".$e->getTraceAsString();
            }
        }else{
            $this->view->msg="Método ".$this->getRequest()->getMethod();
        }
    }

    public function postAction()
    {
        //gerado automaticamente
        if($this->getRequest()->isPost()){
            try{
        
                $setores_table = new Data_Model_DbTable_Setores();
                if ($this->getRequest()->getParam('rows')) {
                        $formDataJson = $this->getRequest()->getParam('rows');
                        $formData     = json_decode($formDataJson, true);
                } else {
                        $formDataJson = $this->getRequest()->getRawBody();
                        $formData     = json_decode($formDataJson, true);

                }
                unset($formData['id']);
                foreach ($formData as $key => $value) {
                    if($value=='')
                       unset($formData[$key]);
                }
                $id = $setores_table->insert($formData);
                $this->view->msg="Dados inseridos com sucesso!";
        
                $obj = $setores_table->fetchRow("id=$id");                
                $this->view->rows    = $obj->toArray();
                $this->view->row    = $obj->toArray();
                $this->view->record = $obj->toArray();
                $this->view->success=true;
                $this->view->metodo = $this->getRequest()->getMethod();
        
            }  catch (Exception $e){
                $this->view->success = false;
                $this->view->method  = $this->getRequest()->getMethod();
                $this->view->msg     = "Erro ao atualizar/inserir registro<br>$e->getMessage()<br>$e->getTraceAsString()";
            }
        }else{
            $this->view->msg="Método ".$this->getRequest()->getMethod();
        }
    }

    public function deleteAction()
    {
        if($this->getRequest()->isDelete()){
            try{
                $setores_table = new Data_Model_DbTable_Setores();
                $id = $this->_getParam('id');
                $setores_table->delete('id='.$id);
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

