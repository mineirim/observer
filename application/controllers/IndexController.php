<?php

class IndexController extends Zend_Controller_Action
{

    public function init()
    {
        /* Initialize action controller here */
    }

    public function indexAction()
    {
        
            $this->_auth = Zend_Auth::getInstance ();
            
            if ($this->_auth->hasIdentity ()) {
                
                $ident = $this->_auth->getIdentity();
                $this->view->usuario = $ident->usuario;
            }else{
                $this->_helper->layout()->setLayout('acesso');
            }
    }


}

