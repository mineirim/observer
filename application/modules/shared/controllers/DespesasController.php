<?php

class Shared_DespesasController extends Zend_Controller_Action
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
                        ->initContext('js');
        $this->_helper->layout()->disableLayout();
    }

    public function storeAction()
    {
    }

    public function modelAction()
    {
    }


}

