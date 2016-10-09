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
    /**
    *@param $data array('url'=>'uri','http_method'=>'HTTP_METHOD')
     **/
    public static function autitLog($data){
            $auth = \Zend_Auth::getInstance();
            $sistema=null;
            if (\Zend_Registry::isRegistered('sistema')) {
                $sistema = \Zend_Registry::get('sistema')->id;
            }
            $auditTable =  new \Data_Model_DbTable_AuditLog;
            $data = array_merge($data,[
                'usuario_id'=> $auth->getIdentity()->id,
                'sistema_id'=> $sistema
            ]);
            $auditTable->insert($data);
    }
}
