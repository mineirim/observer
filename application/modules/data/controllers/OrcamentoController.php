<?php

class Data_OrcamentoController extends Zend_Rest_Controller
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
        $orcamentoModel = new Data_Model_Orcamento();
        switch ($this->getParam('data_to')) {
            case 'grupo':
                $this->view->rows =$orcamentoModel->getGrupoChart(833);
                break;

            default:
                $this->view->rows =$orcamentoModel->getResumoMacro();
                break;
        }
        $this->_helper->viewRenderer->setNoRender(true);

        $this->view->total = 3;
    }

    public function getAction()
    {
        $this->getResponse()->setHttpResponseCode(403);
    }

    public function putAction()
    {
        $this->getResponse()->setHttpResponseCode(403);
    }

    public function postAction()
    {
       $this->getResponse()->setHttpResponseCode(403);
    }

    public function deleteAction()
    {
        $this->getResponse()->setHttpResponseCode(403);
    }


}

