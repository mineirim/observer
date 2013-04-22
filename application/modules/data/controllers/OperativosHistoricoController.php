<?php

class Data_OperativosHistoricoController extends Zend_Rest_Controller
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
        $where=null;
         if($this->_hasParam('filter'))
        {
            $filtro  = json_decode($this->_getParam('filter'),true);
            if($filtro[0]['property']=='operativo_id')
                $where =  "id=". $filtro[0]['value'];
        }else{
            $operativo_id = $this->getParam('operativo_id');
            if(!$operativo_id)
                return;
            $where = 'id='.$operativo_id;
        }
        
        $operativos_table = new Data_Model_DbTable_Operativos();
        $operativo = $operativos_table->fetchRow($where);
        $operativo_current = $operativo->toArray();
        $operativo_current['operativo_id'] = $operativo->id;
        $operativo_current['id'] = 0;
        $historico = new Data_Model_DbTable_OperativosHistorico();
        $this->_helper->viewRenderer->setNoRender(true);
        $page = $historico->getOnePageOfOrderEntries($this->getAllParams());
        $rows = array();
        $rows[] = $operativo_current;
        $this->view->rows = array_merge($rows, $page['rows']);
        $this->view->total = $page['total']+1;
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
                $operativos_table = new Data_Model_DbTable_OperativosHistorico();
                $formData = $this->getRequest()->getParam('rows');
                $formData = json_decode($formData,true);
                $id=$formData['id'];
                unset($formData['id']);
                $operativos_table->update($formData, "id=$id");
                $this->view->msg = "Dados atualizados com sucesso!";
                $obj = $operativos_table->fetchRow("id=$id");
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
        
                $operativos_table = new Data_Model_DbTable_OperativosHistorico();
                $formData = $this->getRequest()->getPost('rows');
                $formData = json_decode($formData,true);
                unset($formData['id']);
                foreach ($formData as $key => $value) {
                    if($value=='')
                       unset($formData[$key]);
                }
                $id = $operativos_table->insert($formData);
                $this->view->msg="Dados inseridos com sucesso!";
        
                $obj = $operativos_table->fetchRow("id=$id");
                $this->view->rows = $obj;
                $this->view->success=true;
                $this->view->metodo = $this->getRequest()->getMethod();
                $this->getResponse()->setHttpResponseCode(201);
        
            }  catch (Zend_Db_Statement_Exception $e){
                $this->view->success = false;
                $this->view->method  = $this->getRequest()->getMethod();
                $this->view->msg     = "Erro ao atualizar/inserir registro<br>".$e->getMessage();
                $this->getResponse()->setHttpResponseCode(500);
            }catch (Exception $e){
                $this->view->success = false;
                $this->view->method  = $this->getRequest()->getMethod();
                $this->view->msg     = "Erro ao atualizar/inserir registro<br>$e->getMessage()<br>$e->getTraceAsString()";
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
                $operativos_table = new Data_Model_DbTable_OperativosHistorico();
                $id = $this->_getParam('id');
                $operativos_table->delete('id='.$id);
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

