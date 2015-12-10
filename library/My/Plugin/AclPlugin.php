<?php
class My_Plugin_AclPlugin extends Zend_Controller_Plugin_Abstract {

	private $_auth;
	/**
	 * @param $token
	 */
	private function tokenValidate($request, $token) {
		$this->validateSystem($request);
		$token = base64_decode($token);
		if (strpos(substr($token, 0, strlen(base64_encode(date('Ymd')))), base64_encode(date('Ymd'))) === 0) {
			$email = base64_decode(substr($token, strlen(base64_encode(date('Ymd')))));
			$this->authentication($email);

		} else {
			throw new Exception('Token inválido');

		}
	}
	/**
	 * @param $request
	 * @return null
	 */
	private function validateSystem($request) {
		$request->setParam('format', 'json');
		$sistemasModel = new Data_Model_DbTable_Sistemas();
		$systoken      = $request->getHeader('systoken');
		if (!$systoken) {
			throw new Zend_Exception('O sistema não está cadastrado/autorizado no SISPLAN', 1);

		} else {
			$sistema = $sistemasModel->fetchRow(['chave=?' => $systoken]);
			if (count($sistema) === 0) {
				throw new Zend_Exception('O sistema não está cadastrado/autorizado no SISPLAN', 1);
			}
		}
	}
	/**
	 * @param $email
	 */
	private function authentication($email) {
		$db          = Zend_Registry::get('db');
		$authadapter = new Zend_Auth_Adapter_DbTable($db);
		// Assign the authentication informations to the adapter
		$authadapter->setTableName('usuarios')
		            ->setIdentityColumn('email')
		            ->setCredentialColumn('email');

		$authadapter->setIdentity($email)->setCredential($email);

		$auth = Zend_Auth::getInstance();
		$auth->clearIdentity();
		$auth->getStorage()->clear();
		$result = $authadapter->authenticate(); //  $auth->authenticate ($authadapter);
		if ($result->isValid()) {
			$auth->getStorage()->write($authadapter->getResultRowObject(null, ['senha', 'salt']));
		} else {
			throw new Exception($result->getMessages());

		}
	}
	/**
	 * @param Zend_Controller_Request_Http $request
	 * @return null
	 */
	public function preDispatch(Zend_Controller_Request_Http $request) {
		$auth_token = $request->getHeader('authtoken');
		$module     = $request->getModuleName();
		if ($module == 'acesso' || $module == 'default') {
			$action = $request->getActionName();
			if ($action == 'get-token') {
				$this->validateSystem($request);
			}
			parent::preDispatch($request);
		} else {
			$controller = $action = '';
			if ($auth_token) {
				$this->tokenValidate($request, $auth_token);
				parent::preDispatch($request);
				return;
			}
			$this->_auth = Zend_Auth::getInstance();

			if (!$this->_auth->hasIdentity()) {
				$module     = 'acesso';
				$controller = 'index';
				$action     = 'index';
				$request->setModuleName($module);
				$request->setControllerName($controller);
				$request->setActionName($action);
			}
		}
	}

}