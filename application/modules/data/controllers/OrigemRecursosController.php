<?php

class Data_OrigemRecursosController extends Zend_Rest_Controller {

	public function init() {
		$swContext = $this->_helper->contextSwitch();
		$swContext->setAutoJsonSerialization(true);
		$swContext->addActionContext('index', ['json', 'xml'])
		          ->addActionContext('put', ['json', 'xml'])
		          ->addActionContext('post', ['json', 'xml'])
		          ->addActionContext('get', ['json', 'xml'])
		          ->addActionContext('delete', ['json', 'xml'])
		          ->initContext('json');
		$this->_helper->layout()->disableLayout();
	}
	public function headAction() {
		$this->getResponse()->setHttpResponseCode(200);
	}

	/**
	 * @return null
	 */
	public function indexAction() {
		$orcamentoModel = new Data_Model_Orcamento();
		
                $this->view->rows = $orcamentoModel->getCompleteTree();


	}

	public function getAction() {
		$this->getResponse()->setHttpResponseCode(403);
	}

	public function putAction() {
		$this->getResponse()->setHttpResponseCode(403);
	}

	public function postAction() {
		$this->getResponse()->setHttpResponseCode(403);
	}

	public function deleteAction() {
		$this->getResponse()->setHttpResponseCode(403);
	}

}
