<?php
/**
 *
 * @version $Revision$
 * @author $Author$
 * @since $Date$
 */

class Etc_CORS extends Zend_Controller_Plugin_Abstract {
	public function preDispatch(){
		$response = $this->getResponse();
        $response->setHeader('Access-Control-Allow-Origin', '*');
        // $response->setHeader('Access-Control-Allow-Headers', 'Content-Type, Content-Range, Content-Disposition, Content-Description');
        $response->setHeader('Access-Control-Allow-Headers', 'X-PINGOTHER');
        $response->setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT');
	}

}
