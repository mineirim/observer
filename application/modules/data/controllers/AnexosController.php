<?php

class Data_AnexosController extends Zend_Rest_Controller
{

    public function init()
    {
        $swContext = $this->_helper->contextSwitch();
        $swContext->setAutoJsonSerialization(true);
        $swContext->addActionContext('index', array('json', 'xml'))
                        ->addActionContext('put', array( 'json', 'xml'))
                        //->addActionContext('post', array('html', 'xml'))
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
        $anexos_table = new Data_Model_DbTable_Anexos();
        $rows = $anexos_table->fetchAll(null, 'id');
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
                $anexos_table = new Data_Model_DbTable_Anexos();
                $formData = $this->getRequest()->getParam('rows');
                $formData = json_decode($formData,true);
                $id=$formData['id'];
                unset($formData['id']);
                $anexos_table->update($formData, "id=$id");
                $this->view->msg = "Dados atualizados com sucesso!";
                $obj = $anexos_table->fetchRow("id=$id");
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
        
        $logger = Zend_Registry::get('logger');
        if($this->getRequest()->isPost()){
            try{
                $this->view->resposta =array();
                $anexos_table = new Data_Model_DbTable_Anexos();
                $upload = new Zend_File_Transfer_Adapter_Http();
                $upload->setDestination(APPLICATION_PATH.'/../files');
                $files = $upload->getFileInfo();
                if($upload->receive()){
                    $this->view->resposta['rows'] = array('nome'=> $upload->getFileName(null,false),
                        'sum_hash'=> $upload->getHash('sha1'));
                    $this->view->resposta['success']=true;
                    $this->getResponse()->setHttpResponseCode(201);

                }else{
                    
                    $this->view->resposta['success']=false;
                    $messages = $upload->getMessages();
                    $this->view->resposta['msg']= implode("\n", $messages);
                    $logger->log($upload,  Zend_Log::ALERT);
                    $this->getResponse()->setHttpResponseCode(500);
                }
        
            }  catch (Zend_File_Transfer_Exception $e){
                $logger->log("erro 1",  Zend_Log::ALERT);
                $this->view->success = false;
                $this->view->method  = $this->getRequest()->getMethod();
                $this->view->msg     = "Erro ao atualizar/inserir registro<br>".$e->__toString();
                $this->getResponse()->setHttpResponseCode(500);
                
            }  catch (Exception $e){
                $logger->log("erro 12",  Zend_Log::ALERT);
                $this->view->success = false;
                $this->view->method  = $this->getRequest()->getMethod();
                $this->view->msg     = "Erro ao atualizar/inserir registro<br>";
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
                $anexos_table = new Data_Model_DbTable_Anexos();
                $id = $this->_getParam('id');
                $anexos_table->delete('id='.$id);
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

