<?php

class Plano_DashboardController extends Zend_Controller_Action
{

    public function init()
    {
        $this->getResponse()
             ->setHeader('Content-type', 'text/javascript');
        $swContext = $this->_helper->contextSwitch();
        $swContext->setAutoJsonSerialization(true);
        $swContext->addContext('js', array('suffix' => 'js'))
                        ->addActionContext('Controller', array( 'js'))
                        ->addActionContext('Checklist', array( 'js'))
                        ->addActionContext('Painel', array( 'js'))
                        ->initContext('js');
        $this->_helper->layout()->disableLayout();
    }

    public function indexAction()
    {
        // action body
    }

    public function controllerAction()
    {
        // action body
    }

    public function checklistAction()
    {
        // action body
    }

    public function painelAction()
    {
        // action body
    }


}







