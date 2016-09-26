<?php

class Data_EstatisticasController extends Zend_Rest_Controller {

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
		$this->getResponse()->setHeader('Access-Control-Allow-Headers', '*');
		$estatisticasModel = new Data_Model_Estatisticas();

		switch ($this->getParam('data_to')) {
		case 'grupo':
			$this->view->rows = $estatisticasModel->getGrupoChart(833);
			break;
		case 'execucao':
			$this->view->rows = $estatisticasModel->getTotalPorNivel($programacaoId, $projetoId);
			break;
		default:
			$this->view->rows = $estatisticasModel->getUseByDay();
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
