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

	/**
	 * @return null
	 */
	public function indexAction() {
		$orcamentoModel = new Data_Model_Orcamento();

		$node_id        = $this->_getParam('programacaoId');
		$instrumento_id = null;
		$projetoId      = null;
		$programacaoId  = $node_id;
		if ($node_id == 'root') {
			return;
		} elseif (!is_numeric($node_id)) {
			$arr_node = explode('-', $node_id);
			if ($arr_node[0] === 'projetoId') {
				$projetoId     = $arr_node[1];
				$programacaoId = null;
				$text          = 'Projeto selecionado';
			} elseif ($arr_node[0] === 'instrumentoId') {
				$model_instrumentos = new Data_Model_DbTable_Instrumentos();
				$instrumento        = $model_instrumentos->fetchRow('instrumento_id=' . $arr_node[count($arr_node) - 1]);
				$instrumento_id     = $instrumento->id;
				$programacaoId      = null;
				$text               = $instrumento->singular;
			} else {
				$programacaoId = $arr_node[count($arr_node) - 1];
				$projetoId     = $arr_node[0];
			}
		}

		switch ($this->getParam('data_to')) {
			case 'grupo':
				$this->view->rows = $orcamentoModel->getGrupoChart(833);
				break;
			case 'execucao':
				$this->view->rows = $orcamentoModel->getTotalPorNivel($programacaoId, $projetoId);
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
