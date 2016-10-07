<?php
class My_Plugin_AuditPlugin extends Zend_Controller_Plugin_Abstract {

	/**
	 * @param Zend_Controller_Request_Abstract $request
	 */
	public function postDispatch(Zend_Controller_Request_Abstract $request) {
		$method =$request->getMethod();
		if( strtoupper($method) !=='GET' ){
			$auth = Zend_Auth::getInstance();
			$sistema=null;
			if (\Zend_Registry::isRegistered('sistema')) {
				$sistema = \Zend_Registry::get('sistema')->id;
			}
			$auditTable =  new Data_Model_DbTable_AuditLog;
			$data = [
				'usuario_id'=> $auth->getIdentity()->id,
				'sistema_id'=> $sistema,
				'url'=>  $request->getRequestUri(),
				'http_method'=> $method
			];
			$auditTable->insert($data);

		}

	}

}