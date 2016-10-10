<?php
class Acesso_AuthController extends Zend_Controller_Action {

	public function init() {
		$this->getResponse()
			->setHeader('Content-type', 'text/javascript');
		$swContext = $this->_helper->contextSwitch();
		$swContext->setAutoJsonSerialization(true);
		if (!$swContext->hasContext('js')) {
			$swContext->addContext('js', ['suffix' => 'js']);
		}

		$swContext->addActionContext('Controller', ['js'])
			->addActionContext('Form', ['js'])
			->addActionContext('checklogin', ['json'])
			->addActionContext('get-token', ['json'])
			->addActionContext('login', ['json'])
			->addActionContext('logout', ['json'])
			->addActionContext('Controle', ['js'])
			->addActionContext('Changepassword', ['js'])
			->initContext();
		$this->_helper->layout()->disableLayout();
	}

	public function indexAction() {
		// action body
	}

	public function controllerAction() {

	}

	public function formAction() {
		// action body
	}
	/**
	 * @return null
	 */
	public function getTokenAction() {
		$swContext = $this->_helper->contextSwitch();
		$swContext->initContext('json');
		$email         = $this->_request->getPost('email', '_');
		$app           = $this->_request->getPost('app');
		$tableUsuarios = new Data_Model_DbTable_Usuarios();
		if ($tableUsuarios->fetchRow(['email=?' => $email])) {
			$this->view->token = base64_encode(base64_encode(date('Ymd')) . base64_encode($email));
		} else {
			$this->view->error = 'usuário não encontrado';
		}
	}
	public function loginAction() {
		$logger = Zend_Registry::get('logger');
		if (!($this->_request->isPost())) {
			$this->view->success = false;
			$this->view->msg     = 'Falha ao autenticar';
		}

		try {

			$db          = Zend_Registry::get('db');
			$authadapter = new Zend_Auth_Adapter_DbTable($db);

			// Assign the authentication informations to the adapter
			$authadapter->setTableName('usuarios')
				->setIdentityColumn('usuario')
				->setCredentialColumn('senha')
				->setCredentialTreatment('MD5(  ? || salt) AND situacao_id=1');
			//Zend_Registry::set('auth', $authadapter);
			$filter = new Zend_Filter();
			$filter->addFilter(new Zend_Filter_StringTrim())->addFilter(new Zend_Filter_StripTags())->addFilter(new Zend_Filter_Alnum());

			// Give the adapter the username and the password
			$username = $filter->filter($this->_request->getPost('usuario'));
			$password = $filter->filter($this->_request->getPost('senha'));
			$authadapter->setIdentity($username)->setCredential($password);

			$auth = Zend_Auth::getInstance();
			$auth->clearIdentity();
			$auth->getStorage()->clear();
			$result = $authadapter->authenticate(); //  $auth->authenticate ($authadapter);

			$zf_auth = Zend_Auth::getInstance();

			if ($result->isValid()) {

				$zf_auth = Zend_Auth::getInstance();
				$auth->getStorage()->write($authadapter->getResultRowObject(null, ['senha', 'salt']));
				if ($auth->getIdentity()->alterar_senha) {
					$this->view->forceChange = true;
					$this->view->usuario     = $auth->getIdentity()->usuario;
					$sess                    = new Zend_Session_Namespace('changePassword');
					$sess->forceChange       = true;
				}

				$this->view->success = true;
				$this->view->msg     = 'Login efetuado!';

			} else {
				// Not valid, show the loginform
				$this->view->msg     = 'Username or Password false.';
				$this->view->success = false;
			}
		} catch (Zend_Auth_Exception $e) {
			$this->view->success      = false;
			$this->view->errorMessage = $e->getMessage();
		} catch (Zend_Db_Adapter_Exception $e) {
			$this->view->success      = false;
			$this->view->errorMessage = $e->getMessage();
		} catch (Zend_Exception $e) {
			$this->view->success      = false;
			$this->view->errorMessage = $e->getMessage();
		}
	}
	public function checkloginAction() {
		$this->view->success = true;
		$this->view->msg     = 'Login efetuado!';
	}
	public function logoutAction() {
		Zend_Registry::_unsetInstance();
		Zend_Auth::getInstance()->clearIdentity();
		Zend_Session::destroy();
		$this->view->success = true;
	}

	public function changepasswordAction() {
		// action body
	}

	public function controleAction() {
		// action body
	}

}
