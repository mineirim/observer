<?php

class Data_RelatoriosController extends Zend_Rest_Controller {

    public function init() {
        $swContext = $this->_helper->contextSwitch();
        $swContext->setAutoJsonSerialization(true);
        $swContext->addActionContext('index', array('json', 'xml'))
                ->addActionContext('put', array('json', 'xml'))
                ->addActionContext('post', array('json', 'xml'))
                ->addActionContext('get', array('json', 'xml'))
                ->addActionContext('delete', array('json', 'xml'))
                ->initContext('json');
        $this->_helper->layout()->disableLayout();
    }

    public function headAction() {
        $this->getResponse()->setHttpResponseCode(204);
    }

    public function indexAction() {
        $this->_helper->viewRenderer->setNoRender(true);

        $relatoriosModel = new Data_Model_Relatorios();
        
        $rows = $relatoriosModel->getAll();
        $this->view->rows = $rows->getAsArray();
        $this->view->total = count($rows);
        $this->getResponse()->setHttpResponseCode(200);
    }

    public function getAction() {
        $this->_helper->viewRenderer->setNoRender(true);

        $relatoriosModel = new Data_Model_Relatorios();
        $rows = $relatoriosModel->find($this->getParam('id'));
        $this->view->rows = $rows->toArray();
        $this->view->total = count($rows);
        $this->getResponse()->setHttpResponseCode(200);
    }

    public function putAction() {
        //gerado automaticamente
        if (($this->getRequest()->isPut())) {
            try {
                $relatoriosTable = new Data_Model_Relatorios();
                if ($this->getRequest()->getParam('rows')) {
                    $formDataJson = $this->getRequest()->getParam('rows');
                    $formData = json_decode($formDataJson, true);
                } else {
                    $formDataJson = $this->getRequest()->getRawBody();
                    $formData = json_decode($formDataJson, true);
                }              
                $row = $relatoriosTable->update($formData);
                $this->view->msg = "Dados atualizados com sucesso!";
                $this->view->rows = $row->toArray();
                $this->view->success = true;
                $this->getResponse()->setHttpResponseCode(201);
            } catch (Exception $e) {
                $this->view->success = false;
                $this->view->method = $this->getRequest()->getMethod();
                $this->view->msg = "Erro ao atualizar registro<br>" . $e->getMessage() . "<br>" . $e->getTraceAsString();
                $this->getResponse()->setHttpResponseCode(500);
            }
        } else {
            $this->view->msg = "Método " . $this->getRequest()->getMethod();
            $this->getResponse()->setHttpResponseCode(501);
        }
    }

    public function postAction() {

        if ($this->getRequest()->isPost()) {
            try {
                $relatoriosTable = new Data_Model_Relatorios();
                if ($this->getRequest()->getParam('rows')) {
                    $formDataJson = $this->getRequest()->getParam('rows');
                    $formData = json_decode($formDataJson, true);
                } else {
                    $formDataJson = $this->getRequest()->getRawBody();
                    $formData = json_decode($formDataJson, true);
                }
//				$formData            = $this->getRequest()->getPost();
                $row = $relatoriosTable->insert($formData);
                $this->view->msg = 'Dados inseridos com sucesso!';
                $this->view->rows = $row->toArray();
                $this->view->success = true;
                $this->view->metodo = $this->getRequest()->getMethod();
                $this->getResponse()->setHttpResponseCode(201);
            } catch (Exception $e) {
                $this->view->success = false;
                $this->view->method = $this->getRequest()->getMethod();
                $this->view->msg = 'Erro ao atualizar/inserir registro<br>' . $e->getMessage();
                $this->getResponse()->setHttpResponseCode(500);
            }
        } else {
            $this->view->msg = 'Método ' . $this->getRequest()->getMethod() . '<br>Esperado POST';
            $this->getResponse()->setHttpResponseCode(501);
        }
    }

    public function deleteAction() {
        if ($this->getRequest()->isDelete()) {
            try {
                $relatoriosTable = new Data_Model_Relatorios();
                $id = $this->_getParam('id');
                $relatoriosTable->delete($id);
                $this->view->success = true;
                $this->view->msg = "Dados apagados com sucesso!";
                $this->getResponse()->setHttpResponseCode(204);
            } catch (Exception $e) {
                $this->view->success = false;
                $this->view->msg = "Erro ao apagar o registro<br>" . $e->getTraceAsString();
                $this->getResponse()->setHttpResponseCode(500);
            }
        } else {
            $this->view->msg = "Método delete";
            $this->view->parametros = $this->_getAllParams();
            $this->getResponse()->setHttpResponseCode(501);
        }
    }

}
