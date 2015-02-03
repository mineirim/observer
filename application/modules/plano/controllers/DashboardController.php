<?php

class Plano_DashboardController extends Zend_Controller_Action
{
/**
 * AS VIEWS DESTE CONTROLLER FORAM MOVIDAS PARA public/view/dashboard
 * caso necessário, criar novamente a pasta de views e os respectivos arquivos js e phtml
 */
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







