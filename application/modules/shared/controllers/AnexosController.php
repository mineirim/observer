<?php

class Shared_AnexosController extends Zend_Controller_Action
{

    public function init()
    {
        $swContext = $this->_helper->contextSwitch();
        $swContext->setAutoJsonSerialization(true);
        $swContext->addContext('js', array('suffix' => 'js'))
                        ->addActionContext('Store', array( 'js'))
                        ->addActionContext('Model', array('js'))
                        ->addActionContext('ProgramacaoAnexosStore', array( 'js'))
                        ->addActionContext('ProgramacaoAnexosModel', array('js'))
                        ->initContext('js');
        $this->_helper->layout()->disableLayout();
    }

    public function storeAction()
    {
    }

    public function modelAction()
    {
    }
    public function programacaoanexosstoreAction(){}
    public function programacaoanexosmodelAction(){}


}

