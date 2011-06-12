<?php
class My_Plugin_AclPlugin extends Zend_Controller_Plugin_Abstract {

	private $_auth;
	public function preDispatch(Zend_Controller_Request_Http $request) {
            $module =$request->getModuleName();
            if($module=='acesso' || $module =='default'){
                parent::preDispatch($request);
                
            }else{
                $controller = $action="";
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