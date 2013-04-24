
<?php
/**
* @author Marcone Costa <blog@marconecosta.com.br>
* @link www.barraetc.com.br/blogpress
*/
class Bootstrap extends Zend_Application_Bootstrap_Bootstrap
{
     protected function _initCache() {
          $frontendOptions = array(
              'lifetime' => 7200, // cache lifetime of 2 hours
              'automatic_serialization' => true
          );

          $backendOptions = array(
              'cache_dir' => APPLICATION_PATH . '/../tmp/' // Directory where
          );

          // getting a Zend_Cache_Core object
          $this->cache = Zend_Cache::factory('Core', 'File',
            $frontendOptions, $backendOptions);

          Zend_Registry::set('cache', $this->cache);

          Zend_Date::setOptions(array(
              'cache' => $this->cache
          ));
    }

    protected function _initConfigs()
    {
        $tag = `git describe --tags`;
        $version = substr($tag,0,strrpos($tag,'-'));
        $date = `git log --pretty=format:'%ad' --abbrev-commit --date=short -1`;
        $date = new Zend_Date($date,"yyyy-mm-dd");
        Zend_Registry::set('tag_version',"Rev.: " . $version . " de ". $date->toString("dd/mm/yyyy"));
        $this->config = new Zend_Config_Ini(APPLICATION_PATH . '/configs/application.ini', APPLICATION_ENV);
        Zend_Registry::set('config', $this->config);
    }
    protected function _initAutoload()
    {
         $loader = new Zend_Application_Module_Autoloader(array(
            'namespace' => 'Data',
            'basePath'  => APPLICATION_PATH . '/modules/data',
        ));
         
         
	$resourceLoader = new Zend_Loader_Autoloader_Resource(array(
		'basePath'  => APPLICATION_PATH . '/../library/Etc',
		'namespace' => 'Etc_'
	));    
        return $resourceLoader;

        
       $resourceLoader->addResourceTypes(
                array(
                    'models' => array(
                                    'namespace' => 'Model_',
                                    'path' => 'Model'
                                )
                ));        
        
    }
    
    protected function _initRoutes(){
        $this->bootstrap('FrontController');
        $this->_frontController = $this->getResource('FrontController');

	$this->_frontController->registerPlugin(new Etc_Cache(), 502);

        $router = $this->_frontController->getRouter();
        $config = new Zend_Config_Ini(APPLICATION_PATH . '/configs/routes.ini', 'routes');

        $router->addConfig($config, 'routes');
        $restRoute = new Zend_Rest_Route($this->_frontController, array(), array('data'));
        $router->addRoute('rest', $restRoute);
    }
    
    
    function _initSession() {
        Zend_Session::start ();
    }    
    
    
    public function _initDbAdapter() {
        $this->bootstrap('db');
        $dbAdapter = $this->getResource('db');

        Zend_Registry::set('db', $dbAdapter);
    }
    public function _initLog(){
        $writer = new Zend_Log_Writer_Firebug();
        $logger = new Zend_Log($writer);
        Zend_Registry::set('logger',$logger);
    }
}

