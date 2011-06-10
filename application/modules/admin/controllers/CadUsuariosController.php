<?php
/**
* @author Marcone Costa <blog@marconecosta.com.br>
* @link www.barraetc.com.br/blogpress
*/
class Admin_CadUsuariosController extends Zend_Controller_Action
{
	
	public function init()
	{
	  $this->_helper->contextSwitch()
		->addContext('js', array('suffix' => 'js'))
		->addActionContext('Lista','js')
		->addActionContext('Edicao','js')
		->addActionContext('Controller','js')
		->initContext('js');
	  $this->_helper->layout()->disableLayout(true);
	  
	}


    public function controllerAction()
    {
       
    }

    public function listaAction()
    {	//exemplo de como passar vari�veis do php para o javascript
        $this->view->titulo = "Lista de Usuários";
    }

    public function edicaoAction()
    {
        // action body
    }


}







