<?php

class Acesso_AuthController extends Zend_Controller_Action {

    public function init() {
        $swContext = $this->_helper->contextSwitch();
        $swContext->setAutoJsonSerialization(true);
        if (!$swContext->hasContext('js'))
            $swContext->addContext('js', array('suffix' => 'js'));

        $swContext->addActionContext('Controller', array('js'))
                ->addActionContext('Form', array('js'))
                ->addActionContext('login', array('json'))
                ->addActionContext('logout', array('json'))
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

    public function loginAction() {
        if (!($this->_request->isPost())){
                $this->view->success = false;
                $this->view->msg = "Falha ao autenticar";
            }
        
        try {
 
            $db = Zend_Registry::get('db'); 
            $authadapter = new Zend_Auth_Adapter_DbTable($db);

            // Assign the authentication informations to the adapter
            $authadapter->setTableName('usuarios')
                    ->setIdentityColumn('usuario')
                    ->setCredentialColumn('senha')
                    ->setCredentialTreatment("MD5(  ? || salt)");
            //Zend_Registry::set('auth', $authadapter);
            $filter = new Zend_Filter ( );
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
                $auth->getStorage()->write($authadapter->getResultRowObject(null, array('senha', 'salt')));
                $this->view->success = true;
                $this->view->msg = "Login efetuado!";


            } else {
                // Not valid, show the loginform
                $this->view->msg = "Username or Password false.";
                $this->view->success=false;
            }
        } catch (Zend_Auth_Exception $e) {
            $this->view->success=false;
            $this->view->errorMessage = $e->getMessage();
        } catch (Zend_Db_Adapter_Exception $e) {
            $this->view->success=false;
            $this->view->errorMessage = $e->getMessage();
        } catch (Zend_Exception $e) {
            $this->view->success=false;
            $this->view->errorMessage = $e->getMessage();
        }
    }

    public function logoutAction() {
        Zend_Registry::_unsetInstance ();
        Zend_Auth::getInstance ()->clearIdentity ();
        Zend_Session::destroy();
        $this->view->success =true;
    }

}

