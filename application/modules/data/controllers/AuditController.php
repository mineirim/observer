<?php

class Data_AuditController extends Zend_Rest_Controller
{

    public function init()
    {
        $swContext = $this->_helper->contextSwitch();
        $swContext->setAutoJsonSerialization(true);
        $swContext->addActionContext('index', array('json', 'xml'))
                        ->addActionContext('put', array( 'json', 'xml'))
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
        $auditTable = new Data_Model_AuditLog();
        $type = $this->getParam('type');
        $rows=array();
        switch ($type) {
            case 'last':
                $rows = $auditTable->ultimosAcessos();
                break;
            case 'top':
                $rows = $auditTable->topAcessos();
            default:
                # code...
                break;
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
        
        
    }

    public function deleteAction()
    {
       
    }


}

