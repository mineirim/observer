<?php
/**
* @author Marcone Costa <blog@marconecosta.com.br>
* @link www.barraetc.com.br/blogpress
*/
class Shared_UsuariosController extends Zend_Controller_Action
{

    public function init()
    {
		$this->_helper->contextSwitch()
			 ->addContext('js', array('suffix' => 'js'))
			 ->addActionContext('Store','js')
			 ->addActionContext('Model','js')
			 ->addActionContext('Store4pass','js')
			 ->addActionContext('Model4pass','js')
			 ->initContext('js');
		$this->_helper->layout()->disableLayout();
    }

    public function storeAction()
    {
        // action body
    }

    public function modelAction()
    {
        // action body
    }

    public function store4passAction()
    {
        // action body
    }

    public function model4passAction()
    {
        // action body
    }
}





