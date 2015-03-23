<?php

namespace Etc\Jasper;

/**
 * Description of Connection
 *
 * @author Marcone Costa <marcone@barraetc.com.br>
 */
class Connection {

    private $_conn;
    private $_driver;
    private $_dbconfigs;
    private $_jDriverName = [
                            'mysql' =>['driver'=>'com.mysql.jdbc.Driver', 'connection' =>'mysql'],
                            'pgsql' =>['driver'=>'org.postgresql.Driver', 'connection' =>'postgresql']
                        ];

    public function __construct() 
    {
        \Java( 'java.lang.Class' )->forName( $this->getDriverClass());
    }
    public function getJConnection()
    {
        $objClass = new \Java("java.lang.Class");
        $objClass->forName("org.postgresql.Driver");
        $objDbm =  \Java("java.sql.DriverManager");
//        die($this->getUrl());
        $this->_conn =  \Java( 'java.sql.DriverManager' )->getConnection($this->getUrl(),$this->getUsername(),  $this->getPassword());
        return $this->_conn ;        
    }

    public function getUrl() {
        $dbUrl = "jdbc:{$this->getDriver()}://{$this->getDbConfigs()->getHost()}/{$this->getDbConfigs()->getDatabase()}?zeroDateTimeBehavior=convertToNull";
// comp porta        $dbUrl = "jdbc:{$this->getDriver()}://{$this->getDbConfigs()->getHost()}:{$this->getDbConfigs()->getPort()}/{$this->getDbConfigs()->getDatabase()}?zeroDateTimeBehavior=convertToNull";
        return $dbUrl;
    }
    public function getUsername(){
        return $this->getDbConfigs()->getUsername();
    }
    public function getPassword(){
        return $this->getDbConfigs()->getPassword();
    }
    
    public function getDriver() {
        $pdo_driver = $this->getDbConfigs()->getDriver();
        
        if(\substr($pdo_driver, 0, 4)==='pdo_'){
            $this->_driver = $this->_jDriverName[\substr($pdo_driver, 4)]['connection'];
        }else{
            $this->_driver = $this->_jDriverName[$pdo_driver]['connection'];
        }
        return $this->_driver;
    }
    
    public function getDriverClass() {
        $pdo_driver = $this->getDbConfigs()->getDriver();
        
        if(\substr($pdo_driver, 0, 4)==='pdo_'){
            $this->_driver = $this->_jDriverName[\substr($pdo_driver, 4)]['driver'];
        }else{
            $this->_driver = $this->_jDriverName[$pdo_driver]['driver'];
        }
        return $this->_driver;
    }

    public function getDbConfigs() {        
        if(!$this->_dbconfigs){
            $this->_dbconfigs= new DbConfigs();
        }
        return $this->_dbconfigs;
    }



}

class DbConfigs{
    private $_username, $password, $driver,$host,$port,$database;
    public  function getUsername() {
        return $this->_username;
    }

    public function getPassword() {
        return $this->password;
    }

    public function getDriver() {
        return $this->driver;
    }

    public function getHost() {
        return $this->host;
    }

    public function getPort() {
        return $this->port;
    }

    public function getDatabase() {
        return $this->database;
    }

    public function setUsername($username) {
        $this->_username = $username;
        return $this;
    }

    public function setPassword($password) {
        $this->password = $password;
        return $this;
    }

    public function setDriver($driver) {
        $this->driver = $driver;
        return $this;
    }

    public function setHost($host) {
        $this->host = $host;
        return $this;
    }

    public function setPort($port) {
        $this->port = $port;
        return $this;
    }

    public function setDatabase($database) {
        $this->database = $database;
        return $this;
    }

    
    public function __construct() {
        $conf = \Zend_Registry::get('config');
        $dbConf = $conf->resources->db->params;
        $this->setHost($dbConf->host)
                ->setPort($dbConf->port)
                ->setDriver(strtolower($conf->resources->db->adapter))
                ->setDatabase($dbConf->dbname)
                ->setUsername($dbConf->username)
                ->setPassword($dbConf->password);
    }

}