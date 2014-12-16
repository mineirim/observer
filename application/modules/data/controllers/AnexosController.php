<?php

class Data_AnexosController extends Zend_Rest_Controller
{

    public function init()
    {
        $swContext = $this->_helper->contextSwitch();
        $swContext->setAutoJsonSerialization(true);
        $swContext->addActionContext('index', array('json', 'xml'))
                        ->addActionContext('put', array( 'json', 'xml'))
//                        ->addActionContext('post', array('json', 'xml'))// quando envia arquivo via extjs a resposta precisa ser text/html *http://stackoverflow.com/questions/14110084/why-success-callback-is-not-called-in-extjs-form-submission
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
        $rows=array();
        if($this->getParam('programacao')){
            if($this->getParam('programacao_id')){
                $programacoes_model = new Data_Model_Programacoes();
                $programcao = $programacoes_model->getRow('id='.$this->getParam('programacao_id'));
                $rows = $programcao->getAnexos()->getAsArray();                
            }
        }else{
            $anexos_table = new Data_Model_DbTable_Anexos();
            $rows = $anexos_table->fetchAll(null, 'id')->toArray();
        }
        $this->_helper->viewRenderer->setNoRender(true);
        $this->view->rows= $rows;
        $this->view->total = count($rows);
        $this->getResponse()->setHttpResponseCode(200);
    }

    public function getAction()
    {
        // action body
    }

    public function putAction()
    {

    }

    public function postAction()
    {
        
        $logger = Zend_Registry::get('logger');
        if($this->getRequest()->isPost()){
            try{
                $this->view->resposta =array();
                $anexosTable = new Data_Model_DbTable_Anexos();
                $upload = new Zend_File_Transfer_Adapter_Http();
                $upload->setDestination(APPLICATION_PATH.'/../files');
                if($upload->receive()){
                    $formData = $this->getRequest()->getPost();
                    $data =array('nome'=>$upload->getFileName(null,false),
                                'caminho'=>$upload->getDestination(),
                                'mimetype' => $upload->getMimeType(),
                                'file_size' => $upload->getFileSize(),
                                'hash_sum' => $upload->getHash('sha1')
                        );
                    $id = $anexosTable->insert($data);
                    $newName = $upload->getDestination()."/".str_pad($id,'5','0',STR_PAD_LEFT) . ' - ' .$upload->getFileName(null,false);
                    rename($upload->getFileName(), $newName);
                    $anexosTable->update(array('nome'=>str_pad($id,'5','0',STR_PAD_LEFT) . ' - ' .$upload->getFileName(null,false)), 'id='.$id);
                    $anexoTags = new Data_Model_DbTable_AnexoTags();
                    foreach ($formData['tags'] as $value) {
                        $anexoTags->insert(array('anexo_id'=>$id, 'tag_id'=>$value));
                    }
                    $programacaoAnexosTable = new Data_Model_DbTable_ProgramacaoAnexos();
                    
                    $programacaoAnexosTable->insert(array('programacao_id'=>$formData['programacao_id'], 'anexo_id'=>$id));
                    
                    
                    $this->view->resposta['rows'] = array('nome'=> str_pad($id,'5','0',STR_PAD_LEFT) . ' - ' .$upload->getFileName(null,false),
                        'sum_hash'=> $data['hash_sum']);
                    $this->view->resposta['success']=true;                    
                    $this->getResponse()->setHttpResponseCode(200);

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

