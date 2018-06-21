<?php

class Data_DespesasController extends Zend_Rest_Controller
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
        $despesas_table = new Data_Model_Despesas();
        $this->_helper->viewRenderer->setNoRender(true);
        $where=null;
        if($this->_getParam('filter')){
            $filtro  = json_decode($this->_getParam('filter'),true);
            //se passado filtro =null, então deve retornar objeto vazio
            if(!$filtro[0]['value']){
                return;
            }
           
            
            if($filtro[0]['property']=='programacao_id' && $filtro[0]['value']){
                $where = $filtro[0]['property']."=".$filtro[0]['value'];
                $financeiro_table = new Data_Model_Financeiro();
                $arr_financeiros = $financeiro_table->getArray($where);
                $ids = array();
                foreach ($arr_financeiros as $key => $value)
                {                    
                    $ids[]= $value['id'];
                }
                $where  = count($ids)>0 ? ' financeiro_id in(' . implode(',', $ids) . ') ': ' false ';
            }
            
        } 
        $page = $despesas_table->getArray($this->getAllParams(), $where,true);
        $this->view->rows =$page['rows'];
        $this->view->total = $page['total'];
    }

    public function getAction()
    {
        $this->_helper->viewRenderer->setNoRender(true);
        $financeiroModel = new Data_Model_DbTable_Despesas();
        $this->view->row = $financeiroModel->find($this->getParam('id'))->toArray();
        $this->view->rows = $financeiroModel->find($this->getParam('id'))->toArray();
//        var_dump($financeiroModel->find($this->getParam('id'))->toArray());die;
        $this->getResponse()->setHttpResponseCode(200);
    }

    public function putAction()
    {
        //gerado automaticamente
        if(($this->getRequest()->isPut())){
            try{
                $despesas_table = new Data_Model_DbTable_Despesas();
                if ($this->getRequest()->getParam('rows')) {
                        $formDataJson = $this->getRequest()->getParam('rows');
                        $formData     = json_decode($formDataJson, true);
                } else {
                        $formDataJson = $this->getRequest()->getRawBody();
                        $formData     = json_decode($formDataJson, true);
                }   
                $id=$formData['id'];
                unset($formData['id']);
                $despesas_table->update($formData, "id=$id");
                $this->view->msg = "Dados atualizados com sucesso!";
                $obj = $despesas_table->fetchRow("id=$id");
                $this->view->rows = $obj->toArray();
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
        
                $despesas_table = new Data_Model_DbTable_Despesas();
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
                $id = $despesas_table->insert($formData);
                $this->view->msg="Dados inseridos com sucesso!";
        
                $obj = $despesas_table->fetchRow("id=$id");
                $this->view->rows = $obj->toArray();
                $this->view->success=true;
                $this->view->metodo = $this->getRequest()->getMethod();
        
            }  catch (Exception $e){
                $this->getResponse()->setHttpResponseCode(500);
                $this->view->success = false;
                $this->view->method  = $this->getRequest()->getMethod();
                $this->view->msg     = "Erro ao atualizar/inserir registro<br>{$e->getMessage()}<br>{$e->getTraceAsString()}";
            }
        }else{
            $this->view->msg="Método ".$this->getRequest()->getMethod();
        }
    }

    public function deleteAction()
    {
        if($this->getRequest()->isDelete()){
            try{
                $despesas_table = new Data_Model_DbTable_Despesas();
                $id = $this->_getParam('id');
                $despesas_table->delete('id='.$id);
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

