<?php
class My_Plugin_AclPlugin extends Zend_Controller_Plugin_Abstract {

	/**
	 * @var mixed
	 */
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
			} else {
				\Zend_Registry::set('sistema', $sistema);
			}
		}
	}
	/**
	 * @param $email
	 */
	private function authentication($email, $cpf = '') {
		$db          = Zend_Registry::get('db');
		$authadapter = new \Zend_Auth_Adapter_DbTable($db);
		// Assign the authentication informations to the adapter
		// try
		if ($cpf !== '') {
			$authadapter->setTableName('usuarios')
				->setIdentityColumn('cpf')
				->setCredentialColumn('cpf');
			$authadapter->setIdentity($cpf)->setCredential($cpf);
		} else {
			$authadapter->setTableName('usuarios')
				->setIdentityColumn('email')
				->setCredentialColumn('email');
			$authadapter->setIdentity($email)->setCredential($email);
		}
		$auth = \Zend_Auth::getInstance();
		$auth->clearIdentity();
		$auth->getStorage()->clear();
		$result = $authadapter->authenticate(); //  $auth->authenticate ($authadapter);
		if ($result->isValid()) {
			$auth->getStorage()->write($authadapter->getResultRowObject(null, ['senha', 'salt']));
			\Etc\Tools::autitLog(['url' => 'login', 'http_method' => 'POST']);
		} else {
			error_log('nao autorizado: ' . $email . ' - cpf: ' . $cpf);
			throw new \Exception($result->getMessages()[0]);
		}
	}
	/**
	 * @param Zend_Controller_Request_Http $request
	 * @return null
	 */
	public function preDispatch(Zend_Controller_Request_Abstract $request) {
		$auth_token  = $request->getHeader('authtoken');
		$shib_cpf    = getenv('Shib-brPerson-brPersonCPF');
		$shib_mail   = getenv('Shib-inetOrgPerson-mail');
		$this->_auth = \Zend_Auth::getInstance();
		try {
			if (!$this->_auth->hasIdentity()) {
				if ($shib_cpf) {
					error_log('autenticando com cpf');
					error_log($shib_cpf);
					$this->authentication(null,$shib_cpf);
				}
			}
		} catch (Exception $e) {

		}
		$module = $request->getModuleName();
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
				if ($shib_cpf) {
					$this->authentication(null,$shib_cpf);
					parent::preDispatch($request);
				} else {
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

}