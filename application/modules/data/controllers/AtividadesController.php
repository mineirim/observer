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
class Data_AtividadesController extends Zend_Rest_Controller {

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
		$this->view->errorTips    = '/data/atividades/:idAtividade | /data/atividades/projeto/:idProjeto/acao/:idAcao';

	}

	public function getAction() {
		$this->_helper->viewRenderer->setNoRender(true);
		$projetoId       = $this->getParam('projeto', false);
		$acaoId          = $this->getParam('acao', false);
		$atividadesModel = new Data_Model_Atividades();
		$financeiroModel = new Data_Model_Financeiro();
		$operativosTable = new Data_Model_DbTable_Operativos();
		if ($acaoId) {
			$lastUpdate = $this->getParam('data_referencia', false);
			$rows       = $atividadesModel->listAtividades($projetoId, $acaoId, $lastUpdate);
			if (\Zend_Registry::isRegistered('sistema')) {
				$atividades = [];
				foreach ($rows as $key => $atividade) {
					$tarefa             = $atividadesModel->getTarefaRH($atividade['id']);
					$financeiro         = $atividadesModel->listaDespesas($projetoId, $atividade['id'], \Zend_Registry::get('sistema')->id);
					$arrTotal           = ['valor_alocado' => $financeiroModel->getTotalPorSistema((int) $projetoId, (int) $atividade['id'])];
					$atividades[$key]   = array_merge($atividade, $arrTotal);
					$operativo          = $operativosTable->fetchRow(['programacao_id=?' => $tarefa->id]);
					$execucao           = [];
					$execucao['fisico'] = ['data_inicio' => $operativo->data_inicio,
						'data_prazo' => $operativo->data_prazo,
						'data_encerramento' => $operativo->data_encerramento,
						'avaliacao_andamento' => $operativo->avaliacao_andamento];
					$execucao['financeiro']       = $financeiro;
					$atividades[$key]['execucao'] = $execucao;
				}
				// die;
				$this->view->rows = $atividades;
			} else {
				$this->view->rows = $rows->toArray();
			}

		} else {
			$rows            = $atividadesModel->getAtividade($this->getParam('id'));
			$this->view->row = $rows;
		}
	}

	public function putAction() {
		if (($this->getRequest()->isPut())) {
			try {
				$operativos_table = new Data_Model_DbTable_Operativos();
				$sistemas_table   = new Data_Model_DbTable_ProgramacaoSistemas();
				$formData         = $this->getRequest()->getParam('rows');
				$formData         = json_decode($formData, true);

				$atividadesModel = new Data_Model_Atividades();
				$atividadesModel->save($this->getParam('id'), $formData);
				$this->view->msg     = 'Dados atualizados com sucesso!';
				$obj                 = $operativos_table->fetchRow("id=$id");
				$this->view->rows    = $obj->toArray();
				$this->view->success = true;
				$this->getResponse()->setHttpResponseCode(201);
			} catch (Exception $e) {
				$this->view->success = false;
				$this->view->method  = $this->getRequest()->getMethod();
				$this->view->msg     = 'Erro ao atualizar registro<br>' . $e->getMessage() . '<br>' . $e->getTraceAsString();
				$this->getResponse()->setHttpResponseCode(500);
			}
		} else {
			$this->view->msg = 'Método ' . $this->getRequest()->getMethod();
			$this->getResponse()->setHttpResponseCode(501);
		}
	}

	public function postAction() {

	}

	public function deleteAction() {

	}

	public function headAction() {
		$this->getResponse()->setHttpResponseCode(200);
	}

}
