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
class Data_AcoesController extends Zend_Rest_Controller {

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
                $projetoId       = $this->getParam('projeto', false);
                if($projetoId){
                    $projetoProgramacoes = new Data_Model_ProjetoProgramacoes;
                    $this->view->rows = $projetoProgramacoes->listAll($projetoId, 4);
                }else{
                    $this->view->errorMessage = 'Método não implementado. A consulta deve ser feita pelo projeto:';
                    $this->view->errorTips    = '/data/acoes/:idAcao | /data/acoes/projeto/:idProjeto/acao/:idAcao';
                }

	}

	public function getAction() {
		$this->_helper->viewRenderer->setNoRender(true);
		$projetoId       = $this->getParam('projeto', false);
		$acaoId          = $this->getParam('acao', false);
		$atividadesModel = new Data_Model_Atividades();
		if ($acaoId) {
			$rows             = $atividadesModel->getAll($this->_getAllParams());
			$this->view->rows = $rows;
		} else {
			$rows             = $atividadesModel->getAtividade($this->getParam('id'));
			$this->view->rows = $rows;
		}
	}

	public function putAction() {
		if (($this->getRequest()->isPut())) {
			try {
				$operativos_table = new Data_Model_DbTable_Operativos();
				$sistemas_table   = new Data_Model_DbTable_ProgramacaoSistemas();

				$atividadesModel     = new Data_Model_Atividades();
				$rows                = $atividadesModel->save($this->getRequest()->getParams());
				$this->view->msg     = 'Dados atualizados com sucesso!';
				$this->view->rows    = $rows;
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
