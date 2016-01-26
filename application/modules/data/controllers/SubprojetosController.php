<?php

/**
 * Classe gerada automaticamente
 *
 * Gerada automaticamente pelo script ExtCRUD.
 *
 * @version $Rev:$
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL 3.0
 * @author Marcone Costa <blog@barraetc.com.br>
 */
class Data_SubprojetosController extends Zend_Rest_Controller {

	public function init() {
		/**código gerado automaticamente pelo template init.tpl*/

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

	public function indexAction() {
		$this->_helper->viewRenderer->setNoRender(true);
		$this->view->errorMessage = 'Método não implementado. A consulta deve ser feita pelo projeto ou busca direta a um subprojeto:';
		$this->view->errorTips    = '/data/suprojetos/:idSubprojeto | /data/subprojetos/projeto/:IdProjeto';
		// $projetosModel            = new Data_Model_Projetos();
		// $lastUpdate               = $this->getParam('data_referencia', false);
		// $where                    = '1=1';
		// if ($lastUpdate) {
		// 	$where .= ' AND (inclusao_data > \'' . $lastUpdate . '\' OR alteracao_data > \'' . $lastUpdate . '\') ';
		// }
		// $rows              = $projetosModel->getProjetos($where);
		// $this->view->rows  = $rows->toArray();
		// $this->view->total = count($rows);
	}

	public function getAction() {
		$this->_helper->viewRenderer->setNoRender(true);
		$projetoId     = $this->getParam('projeto', false);
		$projetosModel = new Data_Model_Subprojetos();

		if ($projetoId) {
			$lastUpdate = $this->getParam('data_referencia', false);
			$rows       = $projetosModel->listSubprojetos($projetoId, $lastUpdate);
			if (\Zend_Registry::isRegistered('sistema')) {
				$projetos = [];
				foreach ($rows as $key => $projeto) {
					var_dump($projeto);die;
					$arrTotal       = ['valor_alocado' => $projetosModel->totalPorSistema($projeto['projeto_id'], $projeto['id'])];
					$projetos[$key] = array_merge($projeto->toArray(), $arrTotal);
				}
				$this->view->rows = $projetos;
			} else {
				$this->view->rows = $rows->toArray();
			}

		} else {
			$rows            = $projetosModel->getSubprojeto($this->getParam('id'));
			$this->view->row = $rows;
		}
	}

	public function putAction() {
		/**código gerado automaticamente pelo template put.tpl*/

		if (($this->getRequest()->isPut())) {
			try {
				$projetosTable = new Data_Model_Projetos();

				$formData = $this->getRequest()->getParams();
				$row      = $projetosTable->update($formData);
				if ($formData) {
					$this->view->msg = 'Dados atualizados com sucesso!';
				}
				$this->view->rows    = $row->toArray();
				$this->view->success = true;

			} catch (Exception $e) {
				$this->view->success = false;
				$this->view->method  = $this->getRequest()->getMethod();
				$this->view->msg     = 'Erro ao atualizar registro<br>' . $e->getMessage();
			}
		} else {
			$this->view->msg = 'Método ' . $this->getRequest()->getMethod() . '<br> Esperado PUT';
		}
	}

	public function postAction() {
		if ($this->getRequest()->isPost()) {
			try {
				$projetosTable       = new Data_Model_Projetos();
				$formData            = $this->getRequest()->getPost();
				$row                 = $projetosTable->insert($formData);
				$this->view->msg     = 'Dados inseridos com sucesso!';
				$this->view->rows    = $row->toArray();
				$this->view->success = true;
				$this->view->metodo  = $this->getRequest()->getMethod();

			} catch (Exception $e) {
				$this->view->success = false;
				$this->view->method  = $this->getRequest()->getMethod();
				$this->view->msg     = 'Erro ao atualizar/inserir registro<br>' . $e->getMessage();
			}
		} else {
			$this->view->msg = 'Método ' . $this->getRequest()->getMethod() . '<br>Esperado POST';
		}
	}

	public function deleteAction() {
		/**código gerado automaticamente pelo template delete.tpl*/

		if ($this->getRequest()->isDelete()) {
			try {
				$projetosTable = new Data_Model_DbTable_Projetos();
				$id            = $this->_getParam('id');
				$projetosTable->delete('id=' . $id);
				$this->view->success = true;
				$this->view->msg     = 'Dados apagados com sucesso!';
			} catch (Exception $e) {
				$this->view->success = false;
				$this->view->msg     = 'Erro ao apagar o registro<br>' . $e->getTraceAsString();
			}
		} else {
			$this->view->parametros = $this->_getAllParams();
		}
	}

	public function headAction() {
		$this->getResponse()->setHttpResponseCode(200);
	}

}
