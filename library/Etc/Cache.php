<?php
/**
 *
 * @version $Revision$
 * @author $Author$
 * @since $Date$
 */

class Etc_Cache extends Zend_Controller_Plugin_Abstract {
	private $_doCache = false;
	private $_fileToBeCached = false;
	private $_format = 'html';

	public function __construct() {
		$cachePath = APPLICATION_PATH . '/../public/cache';
		if (!realpath($cachePath)) {
			mkdir($cachePath, 0777, true);
		}
		clearstatcache();
		if (realpath($cachePath)) {
			define('CACHE_PATH', realpath($cachePath));
		}
	}

	public function dispatchLoopShutdown() {
		if ($this->_doCache) {
			$body = $this->getResponse()->getBody();
			if (file_put_contents($this->_fileToBeCached, $body)) {
				$lastModifiedTime = filemtime($this->_fileToBeCached);
				$etag = md5_file($this->_fileToBeCached);
				$response = $this->getResponse();
				$response->setHeader("Last-Modified", gmdate("D, d M Y H:i:s", $lastModifiedTime)." GMT", true); 

				$strtotime = (APPLICATION_ENV == 'development') ? strtotime('+1 day') : strtotime('+30 DAY');

				$response->setHeader("Expires", gmdate("D, d M Y H:i:s", $strtotime)." GMT", true); 
				$response->setHeader("Expires", gmdate("D, d M Y H:i:s", $strtotime)." GMT", true); 
				$response->setHeader("Etag", $etag, true);
			}
		}
	}

	public function routeShutdown(Zend_Controller_Request_Abstract $request) {
		$this->_format = $request->getParam('format', 'html');
		$parseCache = false;
		$cache = 3600;
		switch($this->_format) {
			case 'js' : 
				$parseCache = true; 
				$contentType = 'text/javascript';
			break;
			case 'select' :
				$parseCache = true;
				$contentType = 'text/html';
			break;
		}

		if ($parseCache) {
			$response = $this->getResponse();
			$pathcached = CACHE_PATH . '/' . $request->getModuleName() . '/' . $request->getControllerName();
			if (!is_dir($pathcached)) {
				mkdir($pathcached, 0777, true);
			}

			$params = $this->getRequest()->getParams();
			$paramsNotParsed = array('format', 'controller', 'action', 'module');
			foreach($params as $param => $value) {
				if (in_array($param, $paramsNotParsed)) {
					unset($params[$param]);
				}
			}
			if (count($params)) {
				$params = implode('_', $params);
			} else {
				$params = null;
			}

			$this->_fileToBeCached = $pathcached . '/' . $request->getActionName() . $params . '.' . $this->_format;

			$return304 = is_file($this->_fileToBeCached);
			if ($return304) {
				$lastModifiedTime = filemtime($this->_fileToBeCached);
				$etag = md5_file($this->_fileToBeCached);
				$ifModifiedSince = isset($_SERVER['HTTP_IF_MODIFIED_SINCE']) ?
								@strtotime($_SERVER['HTTP_IF_MODIFIED_SINCE']) :
								false;

				$ifNoneMatch = isset($_SERVER['HTTP_IF_NONE_MATCH']) ?
									trim($_SERVER['HTTP_IF_NONE_MATCH']) : false;
				$return304 = ($return304 && $lastModifiedTime && $etag) && 
					($ifModifiedSince == $lastModifiedTime || $ifNoneMatch == $etag);
				if ($return304) {
					$response->setHttpResponseCode(304);
					$response->sendHeaders();
					exit; 
				} else {
					$this->_doCache = true;
					$response->setHeader("Last-Modified", gmdate("D, d M Y H:i:s", $lastModifiedTime)." GMT", true); 

					$strtotime = (APPLICATION_ENV == 'development') ? strtotime('+1 day') : strtotime('+30 DAY');
					$cache = (APPLICATION_ENV == 'development') ? 60*60*24*1 : 60*60*24*30;

					$response->setHeader("Expires", gmdate("D, d M Y H:i:s", $strtotime)." GMT", true); 
					$response->setHeader("Cache-Control", 'max-age='.$cache.', private, must-revalidate', true); 
					$response->setHeader("Etag", $etag, true); 
				}
			} else {
				$this->_doCache = true;
			}

			$response->setHeader('Pragma', 'cache', true);
			$response->setHeader('Cache-Control', 'store, cache', true);
			$response->setHeader("Cache-Control", 'max-age='.$cache.', store, cache, must-revalidate', true); 
			$response->setHeader('Content-Type', $contentType.'; charset=utf-8', true); 
		}
	}

}
