<?php
/**
 *
 * @version $Revision$
 * @author $Author$
 * @since $Date$
 */

class Etc_CORS extends Zend_Controller_Plugin_Abstract {
	/**
	 * @param Zend_Controller_Request_Abstract $request
	 */
	public function preDispatch(Zend_Controller_Request_Abstract $request) {
		$response = $this->getResponse();
		$response->setHeader('Access-Control-Allow-Origin', '*');
		// $response->setHeader('Access-Control-Allow-Headers', 'Content-Type, Content-Range, Content-Disposition, Content-Description');
		$response->setHeader('Access-Control-Allow-Headers', 'X-PINGOTHER');
		$response->setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT');
	}

}
