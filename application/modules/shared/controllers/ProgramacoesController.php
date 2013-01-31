<?php

class Shared_ProgramacoesController extends Zend_Controller_Action
{

    public function init()
    {
        $this->getResponse()
             ->setHeader('Content-type', 'text/javascript');
        $swContext = $this->_helper->contextSwitch();
        $swContext->setAutoJsonSerialization(true);
        $swContext->addContext('js', array('suffix' => 'js'))
                        ->addActionContext('Store', array( 'js'))
                        ->addActionContext('Model', array('js'))
                        ->addActionContext('TreeStore', array( 'js'))
                        ->addActionContext('Model4tree', array('js'))
                        ->addActionContext('OrcamentoStore', array( 'js'))
                        ->addActionContext('OrcamentoModel', array('js'))
                        ->initContext('js');
        $this->_helper->layout()->disableLayout();
    }

    public function storeAction()
    {
    }

    public function modelAction()
    {
    }

    public function model4treeAction()
    {
        // action body
    }

    public function treestoreAction()
    {
        // action body
    }    
    public function orcamentomodelAction()
    {
        // action body
    }

    public function orcamentostoreAction()
    {
        // action body
    }


}





