<?php

class Data_OrcamentoController extends Zend_Rest_Controller {

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

	public function indexAction() {
		$orcamentoModel = new Data_Model_Orcamento();
		switch ($this->getParam('data_to')) {
			case 'grupo':
				$this->view->rows = $orcamentoModel->getGrupoChart(833);
				break;
			case 'execucao':
				$this->view->rows = $orcamentoModel->getTotalPorNivel(430, 35);
				break;
			default:
				$this->view->rows = $orcamentoModel->getTotalPorNivel(430, 35);
				break;
		}
		$this->_helper->viewRenderer->setNoRender(true);

		$this->view->total = 3;
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
