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
class Data_SistemasController extends Zend_Rest_Controller {

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
	public function headAction() {

	}
	public function indexAction() {
		/**código gerado automaticamente */
		$sistemasTable = new Data_Model_DbTable_Sistemas();
		$rows          = $sistemasTable->fetchAll(null, 'id');
		$this->_helper->viewRenderer->setNoRender(true);
		$this->view->rows  = $rows->toArray();
		$this->view->total = count($rows);
	}

	public function getAction() {
		// action body
	}

	public function putAction() {
		/**código gerado automaticamente pelo template put.tpl*/

		if (($this->getRequest()->isPut())) {
			try {
				$sistemasTable = new Data_Model_DbTable_Sistemas();
				$formData      = $this->getRequest()->getParam('rows');
				$formData      = json_decode($formData, true);
				$id            = $formData['id'];
				unset($formData['id']);
				$sistemasTable->update($formData, "id=$id");
				$this->view->msg     = 'Dados atualizados com sucesso!';
				$row                 = $sistemasTable->fetchRow("id=$id");
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
		/**código gerado automaticamente pelo template post.tpl*/

		if ($this->getRequest()->isPost()) {
			try {

				$sistemasTable = new Data_Model_DbTable_Sistemas();
				$formData      = $this->getRequest()->getPost('rows');
				$formData      = json_decode($formData, true);
				unset($formData['id']);
				foreach ($formData as $key => $value) {
					if ($value == '') {
						unset($formData[$key]);
					}

				}
				$id              = $sistemasTable->insert($formData);
				$this->view->msg = 'Dados inseridos com sucesso!';

				$row                 = $sistemasTable->fetchRow("id=$id");
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
				$sistemasTable = new Data_Model_DbTable_Sistemas();
				$id            = $this->_getParam('id');
				$sistemasTable->delete('id=' . $id);
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

}
