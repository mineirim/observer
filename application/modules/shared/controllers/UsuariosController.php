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


}





