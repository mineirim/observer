<?php

class Data_OrganizacoesController extends Zend_Rest_Controller
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
        $organizacoes_table = new Data_Model_DbTable_Organizacoes();
        $rows = $organizacoes_table->fetchAll(null, 'id');
        $this->_helper->viewRenderer->setNoRender(true);
        $this->view->rows= $rows->toArray();
        $this->view->total = count($rows);
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
                $organizacoes_table = new Data_Model_DbTable_Organizacoes();
                $formData = $this->getRequest()->getParam('rows');
                $formData = json_decode($formData,true);
                $id=$formData['id'];
                unset($formData['id']);
                $organizacoes_table->update($formData, "id=$id");
                $this->view->msg = "Dados atualizados com sucesso!";
                $obj = $organizacoes_table->fetchRow("id=$id");
                $this->view->record = $obj->toArray();
                $this->view->success=true;
        
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
        
                $organizacoes_table = new Data_Model_DbTable_Organizacoes();
                $formData = $this->getRequest()->getPost('rows');
                $formData = json_decode($formData,true);
                unset($formData['id']);
                foreach ($formData as $key => $value) {
                    if($value=='')
                       unset($formData[$key]);
                }
                $id = $organizacoes_table->insert($formData);
                $this->view->msg="Dados inseridos com sucesso!";
        
                $obj = $organizacoes_table->fetchRow("id=$id");
                $this->view->record = $obj;
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
                $organizacoes_table = new Data_Model_DbTable_Organizacoes();
                $id = $this->_getParam('id');
                $organizacoes_table->delete('id='.$id);
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

