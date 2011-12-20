<?php

class Plano_ProgramacoesController extends Zend_Controller_Action
{

    public function init()
    {
        $this->getResponse()
             ->setHeader('Content-type', 'text/javascript');
        $swContext = $this->_helper->contextSwitch();
        $swContext->setAutoJsonSerialization(true);
        $swContext->addContext('js', array('suffix' => 'js'))
                        ->addActionContext('Controller', array( 'js'))
                        ->addActionContext('List', array( 'js'))
                        ->addActionContext('Edit', array('js'))
                        ->addActionContext('Treegrid', array('js'))
                        ->addActionContext('TreePanel', array('js'))
                        ->addActionContext('Container', array('js'))
                        ->addActionContext('Anexos', array('js'))
                        ->addActionContext('Detalhes', array('js'))
                        ->addActionContext('Financeiro', array('js'))
                        ->addActionContext('GridFinanceiro', array('js'))
                        ->initContext('js');
        $this->_helper->layout()->disableLayout();
        
    }

    public function controllerAction(){}

    public function listAction(){}

    public function editAction(){}
    public function financeiroAction(){}
    public function treegridAction(){}
    public function containerAction(){}
    public function treepanelAction(){}
    public function gridfinanceiroAction(){}
    public function anexosAction(){}
    public function detalhesAction(){}


}









