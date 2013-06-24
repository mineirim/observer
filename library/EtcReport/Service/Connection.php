<?php
namespace EtcReport\Service;
/**
 * Description of Connection
 *
 * @author marcone
 */

use Zend\ServiceManager\ServiceLocatorAwareInterface;
use Zend\ServiceManager\ServiceLocatorInterface;

class Connection implements ServiceLocatorAwareInterface {

    protected $serviceLocator;

    public function setServiceLocator(ServiceLocatorInterface $serviceLocator) {
        $this->serviceLocator = $serviceLocator;
    }

    public function getServiceLocator() {
        return $this->serviceLocator;
    }
    public function __construct() {
        global $netprojectPath;
        include_once $netprojectPath . '/conf/conf_site.inc';
        include_once $netprojectPath . '/conf/conf_site_cliente.inc';
    }
    public function getUri(){
        return "jdbc:mysql://".DB_HOST_MYSQL . "/". DB_NAME_MYSQL;
    }
    public function getUsername(){
        return DB_USER_MYSQL;
    }
    public function getPassword(){
        return DB_PWD_MYSQL;
    }
    
}

