<?php

class Data_ProgramacoesController extends Zend_Rest_Controller {

	public function init() {
		$swContext = $this->_helper->contextSwitch();
		$swContext->setAutoJsonSerialization(true);
		$swContext->addActionContext('index', ['json', 'xml'])
		          ->addActionContext('put', ['json', 'xml'])
		          ->addActionContext('post', ['json', 'xml'])
		          ->addActionContext('get', ['json', 'xml'])
		          ->addActionContext('delete', ['json', 'xml'])
		          ->addActionContext('search', ['json', 'xml'])
		          ->initContext('json');
		$this->_helper->layout()->disableLayout();
	}
	public function headAction() {
		$this->getResponse()->setHttpResponseCode(200);
	}

	public function indexAction() {
		$this->_auth = Zend_Auth::getInstance();
		$identity    = $this->_auth->getIdentity();
		$text        = '';
		try {
			$programacoes_table = new Data_Model_Programacoes();
			$this->_helper->viewRenderer->setNoRender(true);
			if ($this->_getParam('getRecurso')) {
				$where = ' situacao_id <>2 ';
				if ($this->_hasParam('filter')) {
					$filtro = json_decode($this->_getParam('filter'), true);
					$where .= ' AND ' . $filtro[0]['property'] . '=' . $filtro[0]['value'];
				}
				if ($this->_getParam('get_all_itens')) {
					$where .= ' AND instrumento_id in (select id from instrumentos where has_vlr_programado=true and has_vlr_executado=false)';
				} elseif ($this->_getParam('query')) {
					$where .= $this->_getParam('query');

				}
				$this->view->rows = $programacoes_table->getFilter($where);
			} elseif ($this->_getParam('getOrcamento')) {

				$where = 'instrumento_id in (select id from instrumentos where has_vlr_programado=true)';
				$where .= " AND menu ILIKE '%" . $this->_getParam('getOrcamento') . "%'";
				$this->view->rows = $programacoes_table->getFilter($where);
			} elseif ($this->_getParam('toTree')) {
				$node_id        = $this->_getParam('node');
				$instrumento_id = null;
				if ($node_id == 'root') {

				} elseif (!is_numeric($node_id)) {
					$arr_node = explode('-', $node_id);
					if ($arr_node[0] === 'projetoId') {
						$projetoId = $arr_node[1];
						$node_id   = null;
						$text      = 'Projeto selecionado';
					} elseif ($arr_node[0] === 'instrumentoId') {
						$model_instrumentos = new Data_Model_DbTable_Instrumentos();
						$instrumento        = $model_instrumentos->fetchRow('instrumento_id=' . $arr_node[count($arr_node) - 1]);
						$instrumento_id     = $instrumento->id;
						$node_id            = null;
						$text               = $instrumento->singular;
					} else {
						$node_id = $arr_node[count($arr_node) - 1];
					}
				}
				if (!isset($projetoId)) {
					$projetoId = $projetoId = $this->getParam('projeto_id');
				}
				$this->view->rows = $programacoes_table->getRecursive($node_id, $instrumento_id, $projetoId);
			} elseif ($this->_hasParam('get_my')) // filtro por supervisor e responsável
			{
				$where  = ' situacao_id <>2 and instrumento_id=6 ';
				$column = $this->getParam('owntype') . '_usuario_id';
				$where .= ' AND ' . $column . '=' . $identity->id;
				$this->view->rows = $programacoes_table->getFilter($where);
			} else if ($this->_hasParam('query')) {
				$page              = $programacoes_table->searchProgramacao($this->_getParam('query'), $this->getAllParams());
				$this->view->rows  = $page['rows'];
				$this->view->total = $page['total'];
			} elseif ($this->_hasParam('pendentes')) {
				$projetoId        = $this->getParam('projeto_id', null);
				$this->view->rows = $programacoes_table->getPendentes($projetoId);
			} else {
				$where = ' 1=1 ';
				if ($this->_hasParam('filter')) {
					$filtro = json_decode($this->_getParam('filter'), true);
					foreach ($filtro as $f) {
						$where .= ' AND ' . $f['property'] . '=' . $f['value'];
					}
				}
				$this->view->rows = $programacoes_table->getAll($where);
			}
			$this->view->success     = true;
			$this->view->text        = $text . ' | ';
			$this->view->id          = 'root';
			$this->view->expanded    = true;
			$this->view->menu        = 'root';
			$this->view->root        = ['text' => $text, 'menu' => $text . '__'];
			$this->view->instrumento = 'root';
			$this->getResponse()->setHttpResponseCode(200);
		} catch (Exception $e) {
			echo $e->getMessage();die;
			$this->getResponse()->setHttpResponseCode(502);
			$this->view->success = false;
			$this->view->msg     = $e->getMessage();
		}
	}

	/**
	 * @return mixed
	 */
	public function getAction() {
		if ($this->_hasParam('node')) {
			return $this->_forward('index');
		}

		$programacoes_table = new Data_Model_Programacoes();
		$rows               = $programacoes_table->getProgramacao($this->_getParam('id'), true);
		$this->_helper->viewRenderer->setNoRender(true);
		$this->view->success = true;
		$this->view->rows    = $rows;
		$this->getResponse()->setHttpResponseCode(200);
	}
	public function putAction() {
		//TODO retirar os campos que não são da tabela
		//gerado automaticamente
		if (($this->getRequest()->isPut())) {
			try {
				$programacoes_table = new Data_Model_DbTable_Programacoes();
				$formDataJson       = $this->getRequest()->getParam('rows');
				$formData           = json_decode($formDataJson, true);
				$id                 = $formData['id'];
				unset($formData['id']);
				if ($formData['programacao_id'] == '') {
					unset($formData['programacao_id']);
				}
				foreach ($formData as $key => $value) {
					if ($value === '') {
						unset($formData[$key]);
					}
				}
				$programacoes_table->update($formData, "id=$id");

				$this->view->msg     = 'Dados atualizados com sucesso!';
				$obj                 = $programacoes_table->fetchRow("id=$id");
				$this->view->rows    = $obj->toArray();
				$this->view->success = true;
				$this->getResponse()->setHttpResponseCode(200);

			} catch (Exception $e) {
				$this->getResponse()->setHttpResponseCode(500);
				$this->view->dados   = $formData;
				$this->view->success = false;
				$this->view->method  = $this->getRequest()->getMethod();
				$this->view->msg     = 'Erro ao atualizar registro<br>' . $e->getMessage() . '<br>' . $e->getTraceAsString();
			}
		} else {
			$this->view->msg = 'Método ' . $this->getRequest()->getMethod();
			$this->getResponse()->setHttpResponseCode(501);
		}
	}

	public function postAction() {
		//gerado automaticamente
		if ($this->getRequest()->isPost()) {
			try {

				$programacoes_table = new Data_Model_DbTable_Programacoes();
				$formData           = $this->getRequest()->getPost('rows');
				$formData           = json_decode($formData, true);
				unset($formData['id']);
				foreach ($formData as $key => $value) {
					if ($value == '') {
						unset($formData[$key]);
					}
				}
				$id              = $programacoes_table->insert($formData);
				$this->view->msg = 'Dados inseridos com sucesso!';

				$obj                 = $programacoes_table->fetchRow("id=$id");
				$this->view->rows    = $obj->toArray();
				$this->view->success = true;
				$this->view->metodo  = $this->getRequest()->getMethod();
				$this->getResponse()->setHttpResponseCode(200);

			} catch (Exception $e) {
				$this->getResponse()->setHttpResponseCode(500);
				$this->view->success = false;
				$this->view->method  = $this->getRequest()->getMethod();
				$this->view->msg     = 'Erro ao atualizar/inserir registro<br>' . $e->getMessage() . '<br>' . $e->getTraceAsString();
			}
		} else {
			$this->view->msg = 'Método ' . $this->getRequest()->getMethod();
			$this->getResponse()->setHttpResponseCode(501);
		}
	}

	public function deleteAction() {
		if ($this->getRequest()->isDelete()) {
			try {
				$programacoes_table = new Data_Model_Programacoes();
				$id                 = $this->_getParam('id');
				$programacoes_table->delete((int) $id);
				$this->view->success = true;
				$this->view->msg     = 'Dados apagados com sucesso!';
				$this->getResponse()->setHttpResponseCode(204);
			} catch (Exception $e) {
				$this->getResponse()->setHttpResponseCode(500);
				$this->view->success = false;
				$this->view->msg     = 'Erro ao apagar o registro<br>' . $e->getTraceAsString();
			}
		} else {
			$this->view->msg        = 'Método delete';
			$this->view->parametros = $this->_getAllParams();
			$this->getResponse()->setHttpResponseCode(501);
		}
	}

}
