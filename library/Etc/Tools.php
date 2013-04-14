<?php

namespace Etc;

/**
 * Description of Tools
 *
 * @author marcone - blog@barraetc.com.br - http://www.barraetc.com.br
 * 
 */
class Tools {


    static function getFullUrl()
    {
        $front = \Zend_Controller_Front::getInstance();
        $request = $front->getRequest();
        return self::getHostUrl() . $request->getRequestUri();
    }

    static function getBaseUrl()
    {
        $front = \Zend_Controller_Front::getInstance();
        $request = $front->getRequest();
        return self::getHostUrl() . $request->getBaseUrl();
    }

    static function getHostUrl()
    {
        $front = \Zend_Controller_Front::getInstance();
        $request = $front->getRequest();
        return $request->getScheme() . '://' . $request->getHttpHost();
    }

    static function getBasePath()
    {
        return dirname(APPLICATION_PATH);
    }

}
