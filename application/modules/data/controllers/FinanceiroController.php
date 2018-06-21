<?php

class Data_FinanceiroController extends Zend_Rest_Controller
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
        $this->getResponse()->setHttpResponseCode(204);
    }
    public function indexAction()
    {
        $this->_helper->viewRenderer->setNoRender(true);
        $where=null;
        if($this->_getParam('filter')){
            $filtro  = json_decode($this->_getParam('filter'),true);
            //se passado filtro =null, então deve retornar objeto vazio
            if(!$filtro[0]['value'])
                return;
           
            $where = $filtro[0]['property']."=".$filtro[0]['value'];
        }        
        $financeiro_model = new Data_Model_Financeiro();
        $rows = $financeiro_model->getArray($where, 'id',true);

        $this->view->rows= $rows;
        $this->view->total = count($rows);
        $this->getResponse()->setHttpResponseCode(200);
    }

    public function getAction()
    {
        $this->_helper->viewRenderer->setNoRender(true);
        $financeiro_model = new Data_Model_Financeiro();
        $execucao_orcamentaria = $financeiro_model->getExecucaoOrcamentaria($this->getParam('id'));
        $this->view->executado= number_format($execucao_orcamentaria['executado'],2,',','.');
        $this->view->programado=number_format($execucao_orcamentaria['programado'],2,',','.');
        $this->view->saldo = number_format($execucao_orcamentaria['saldo'],2,',','.');
        $this->getResponse()->setHttpResponseCode(200);
    }

    public function putAction()
    {
        //gerado automaticamente
        if(($this->getRequest()->isPut())){
            try{
                $financeiro_table = new Data_Model_DbTable_Financeiro();
                $formData = $this->getRequest()->getParam('rows');
                $formData = json_decode($formData,true);
                $id=$formData['id'];
                unset($formData['id']);
                $financeiro_table->update($formData, "id=$id");
                $this->view->msg = "Dados atualizados com sucesso!";
                $obj = $financeiro_table->fetchRow("id=$id");
                $this->view->rows = $obj->toArray();
                $this->view->success=true;
                $this->getResponse()->setHttpResponseCode(201);
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
        
                $financeiro_table = new Data_Model_DbTable_Financeiro();
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
                $id = $financeiro_table->insert($formData);
                $this->view->msg="Dados inseridos com sucesso!";
        
                $obj = $financeiro_table->fetchRow("id=$id");
                $this->view->rows = $obj->toArray();
                $this->view->success=true;
                $this->getResponse()->setHttpResponseCode(201);
        
            }  catch (Exception $e){
                $this->view->success = false;
                $this->view->method  = $this->getRequest()->getMethod();
                $this->view->msg     = "Erro ao atualizar/inserir registro<br>".$e->getMessage()."<br>".$e->getTraceAsString();
                $this->getResponse()->setHttpResponseCode(500);
            }
        }else{
            $this->view->msg="Método ".$this->getRequest()->getMethod();
            $this->getResponse()->setHttpResponseCode(501);
        }
    }

    public function deleteAction()
    {
        if($this->getRequest()->isDelete()){
            try{
                $financeiro_table = new Data_Model_DbTable_Financeiro();
                $id = $this->_getParam('id');
                $financeiro_table->delete('id='.$id);
                $this->view->success=true;
                $this->view->msg="Dados apagados com sucesso!";
                $this->getResponse()->setHttpResponseCode(204);
            }  catch (Exception $e){
                $this->view->success=false;
                $this->view->msg = "Erro ao apagar o registro<br>".$e->getTraceAsString();
                $this->getResponse()->setHttpResponseCode(500);
            }
        }else{
            $this->view->msg="Método delete";
            $this->view->parametros = $this->_getAllParams();
            $this->getResponse()->setHttpResponseCode(501);
        }
    }


}

