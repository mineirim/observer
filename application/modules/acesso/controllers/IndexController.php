<?php

class Acesso_IndexController extends Zend_Controller_Action {

	public function init() {
		$swContext = $this->_helper->contextSwitch();
		$swContext->setAutoJsonSerialization(true);
		if (!$swContext->hasContext('js')) {
			$swContext->addContext('js', ['suffix' => 'js']);
		}

		$swContext->addActionContext('app', ['js'])
		          ->initContext('js');

	}

	public function indexAction() {
		$this->_helper->layout()->setLayout('acesso');
	}

	public function appAction() {
		$this->_helper->layout()->disableLayout();
		$this->_helper->layout()->disableLayout();
	}

}
