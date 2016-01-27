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
		if ($acaoId) {
			$lastUpdate = $this->getParam('data_referencia', false);
			$rows       = $atividadesModel->listAtividades($projetoId, $acaoId, $lastUpdate);

			if (\Zend_Registry::isRegistered('sistema')) {
				$atividades = [];
				foreach ($rows as $key => $atividade) {
					$arrTotal         = ['valor_alocado' => $financeiroModel->getTotalPorSistema((int) $projetoId, (int) $atividade['id'])];
					$atividades[$key] = array_merge($atividade, $arrTotal);
				}
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

	}

	public function postAction() {

	}

	public function deleteAction() {

	}

	public function headAction() {
		$this->getResponse()->setHttpResponseCode(200);
	}

}
