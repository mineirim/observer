<?php

class Data_AnexosController extends Zend_Rest_Controller {

    public function init() {
        $swContext = $this->_helper->contextSwitch();
        $swContext->setAutoJsonSerialization(true);
        $swContext->addActionContext('index', ['json', 'xml'])
                ->addActionContext('put', ['json', 'xml'])
//                        ->addActionContext('post', array('json', 'xml'))// quando envia arquivo via extjs a resposta precisa ser text/html *http://stackoverflow.com/questions/14110084/why-success-callback-is-not-called-in-extjs-form-submission
                ->addActionContext('get', ['json', 'xml'])
                ->addActionContext('delete', ['json', 'xml'])
                ->initContext('json');
        $this->_helper->layout()->disableLayout();
    }

    public function headAction() {
        $this->getResponse()->setHttpResponseCode(200);
    }

    public function indexAction() {
        $rows = [];
        $anexosDBTable = new Data_Model_DbTable_Anexos();
        $programacoesTable = new Data_Model_DbTable_Programacoes;
        if ($this->getParam('programacao')) {
            if ($this->getParam('programacao_id')) {
                $programacoes_model = new Data_Model_Programacoes();
                $programcao = $programacoes_model->getRow('id=' . $this->getParam('programacao_id'));
                $rows = $programcao->getAnexos()->getAsArray();
            }
        } elseif ($this->getParam('report')) {
            $anexosModel = new Data_Model_Anexos;
            $projetoId = $this->getParam('projeto');
//            $where = ['? = ANY(projetos)'=>[$projetoId]];  
            $where = "id in (SELECT anexo_id FROM programacao_anexos 
                    WHERE programacao_id IN (SELECT id FROM programacoes WHERE $projetoId=ANY(projetos) ))";
            $rows = $anexosModel->listByProject($projetoId);
//            $rows =$programacoesTable->fetchAll($where)->toArray();
//            $rows = $anexosDBTable->fetchAll($where, 'id')->toArray();            
        } else {
            $rows = $anexosDBTable->fetchAll(null, 'id')->toArray();
        }
        $this->_helper->viewRenderer->setNoRender(true);
        $this->view->rows = $rows;
        $this->view->total = count($rows);
        $this->getResponse()->setHttpResponseCode(200);
    }

    public function getAction() {
        // action body
    }

    public function putAction() {
        
    }

    public function postAction() {
        $fromckeditor = $this->getParam('fromckeditor');
        $logger = Zend_Registry::get('logger');
        if ($this->getRequest()->isPost()) {
            try {
                $this->view->resposta = [];
                $anexosModel = new Data_Model_Anexos($this->getRequest()->getPost());
                $fromckeditor = $this->getParam('fromckeditor');
                if ($fromckeditor) {
                    $anexosModel->setCKEditorFile(true);
                }
                $destination = $fromckeditor ? 'files_ckeditor' : 'files';
                $uploaded = $anexosModel->upload($destination);
                if ($uploaded['success']) {
                    $anexo = $uploaded['anexo'];
                    if ($fromckeditor) {
                        $this->view->ckeditor = $this->getParam('CKEditor', false);
                        $this->view->CKEditorFuncNum = $this->getParam('CKEditorFuncNum');
                        $this->view->fileUrl = '/ckimages/' . $anexo->nome;
                        $this->view->resposta['uploaded'] = 1;
                        $this->view->resposta['url'] = '/ckimages/' . $anexo->nome;
                        ;
                    } else {

                        $this->view->resposta['rows'] = ['id'=>$anexo->id, 'nome' => $anexo->nome,
                            'sum_hash' => $anexo->hash_sum];
                    }
                    $this->view->resposta['success'] = true;
                    $this->getResponse()->setHttpResponseCode(200);
                } else {

                    $this->view->resposta['success'] = false;
                    $this->view->resposta['msg'] = $uploaded['msg'];
                    $this->getResponse()->setHttpResponseCode(500);
                }
            } catch (Zend_File_Transfer_Exception $e) {
                $logger->log('erro 1', Zend_Log::ALERT);
                $this->view->success = false;
                $this->view->method = $this->getRequest()->getMethod();
                $this->view->msg = 'Erro ao atualizar/inserir registro<br>' . $e->__toString();
                $this->getResponse()->setHttpResponseCode(500);
            } catch (Exception $e) {
                $logger->log('erro 12', Zend_Log::ALERT);
                $this->view->success = false;
                $this->view->method = $this->getRequest()->getMethod();
                $this->view->msg = 'Erro ao atualizar/inserir registro<br>';
                $this->getResponse()->setHttpResponseCode(500);
            }
        } else {
            $this->view->msg = 'Método ' . $this->getRequest()->getMethod();
            $this->getResponse()->setHttpResponseCode(501);
        }
    }

    public function deleteAction() {
        if ($this->getRequest()->isDelete()) {
            try {
                $anexos_table = new Data_Model_DbTable_Anexos();
                $id = $this->_getParam('id');
                $anexos_table->delete('id=' . $id);
                $this->view->success = true;
                $this->view->msg = 'Dados apagados com sucesso!';
                $this->getResponse()->setHttpResponseCode(204);
            } catch (Exception $e) {
                $this->view->success = false;
                $this->view->msg = 'Erro ao apagar o registro<br>' . $e->getTraceAsString();
                $this->getResponse()->setHttpResponseCode(500);
            }
        } else {
            $this->view->msg = 'Método delete';
            $this->view->parametros = $this->_getAllParams();
            $this->getResponse()->setHttpResponseCode(501);
        }
    }

}
