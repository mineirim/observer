<?php
/**
* @author Marcone Costa <blog@marconecosta.com.br>
* @link www.barraetc.com.br/blogpress
*/
class Admin_UsersController extends Zend_Controller_Action
{
	
    public function init()
    {
        $this->getResponse()
             ->setHeader('Content-type', 'text/javascript');
	  $this->_helper->contextSwitch()
		->addContext('js', array('suffix' => 'js'))
		->addActionContext('List','js')
		->addActionContext('Edit','js')
		->addActionContext('Controller','js')
		->initContext('js');
	  $this->_helper->layout()->disableLayout(true);
	  
	}


    public function controllerAction()
    {
       
    }

    public function listAction()
    {	//exemplo de como passar vari�veis do php para o javascript
        $this->view->titulo = "Lista de Usuários";
    }

    public function editAction()
    {
        // action body
    }


}







