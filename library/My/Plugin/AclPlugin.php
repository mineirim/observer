<?php
class My_Plugin_AclPlugin extends Zend_Controller_Plugin_Abstract {

	private $_auth;
        private function tokenValidate($token){
            $token=  base64_decode($token);
            if( strpos(substr($token, 0, strlen(base64_encode(date('Ymd')))), base64_encode(date('Ymd')))===0){
                $email = base64_decode(substr($token, strlen(base64_encode(date('Ymd')))));
                $this->authentication($email);
                
            }else{
                throw new Exception('Token inválido');
                
            }
        }
        private function authentication($email){
            $db = Zend_Registry::get('db'); 
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
                $auth->getStorage()->write($authadapter->getResultRowObject(null, array('senha', 'salt')));
            }else{
                throw new Exception($result->getMessages());
                
            }
        }
        public function preDispatch(Zend_Controller_Request_Http $request) {
            $auth_token = $request->getHeader('authtoken');            
            $module =$request->getModuleName();
            if($module=='acesso' || $module =='default'){
                parent::preDispatch($request);                
            }else{
                $controller = $action="";
                if($auth_token){
                    $this->tokenValidate($auth_token);
                    parent::preDispatch($request);
                    return;
                }
                $this->_auth = Zend_Auth::getInstance ();

                if (!$this->_auth->hasIdentity ()) {
                    $module ='acesso';
                    $controller = 'index';
                    $action = 'index';                        
                    $request->setModuleName ( $module );
                    $request->setControllerName ( $controller );
                    $request->setActionName ( $action );
                }
            }
            
            
	}

	
	
}