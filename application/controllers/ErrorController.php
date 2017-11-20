<?php

class ErrorController extends Zend_Controller_Action {
	public function init() {

		$swContext = $this->_helper->contextSwitch();
		$swContext->setAutoJsonSerialization(true);
		$swContext->addActionContext('error', ['json', 'xml'])
		          ->initContext();
	}
	/**
	 * @return null
	 */
	public function errorAction() {
		$errors = $this->_getParam('error_handler');
		if (!$errors || !$errors instanceof ArrayObject) {
			$this->view->message = 'You have reached the error page';
			return;
		}
		switch ($errors->type) {
			case Zend_Controller_Plugin_ErrorHandler::EXCEPTION_NO_ROUTE:
			case Zend_Controller_Plugin_ErrorHandler::EXCEPTION_NO_CONTROLLER:
			case Zend_Controller_Plugin_ErrorHandler::EXCEPTION_NO_ACTION:
				// 404 error -- controller or action not found
				$this->getResponse()->setHttpResponseCode(404);
				$priority            = Zend_Log::NOTICE;
				$this->view->message = 'Page not found';
				break;
			default:
				// application error
				$this->getResponse()->setHttpResponseCode(500);
				$priority            = Zend_Log::CRIT;
				$this->view->message = 'Application error';
				break;
		}

		// Log exception, if logger available
		if ($log = $this->getLog()) {
			$log->log($this->view->message, $priority, $errors->exception);
			$log->log('Request Parameters', $priority, $errors->request->getParams());
		}

		// conditionally display exceptions
		if ($this->getInvokeArg('displayExceptions') == true) {
                        $this->view->message = $errors->exception->getMessage();
			$this->view->exception = $errors->exception->getTraceAsString();
                        $this->view->code =  $errors->exception->getCode();
		}

		$this->view->request = $errors->request;
	}

	/**
	 * @return mixed
	 */
	public function getLog() {
		$bootstrap = $this->getInvokeArg('bootstrap');
		if (!$bootstrap->hasResource('Log')) {
			return false;
		}
		$log = $bootstrap->getResource('Log');
		return $log;
	}

}
