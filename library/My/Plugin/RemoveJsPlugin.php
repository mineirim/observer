<?php
class My_Plugin_RemoveJsPlugin extends Zend_Controller_Plugin_Abstract
{
  public function routeShutdown(Zend_Controller_Request_Abstract $request)
  {
    $action = $request->getActionName();
    $controller = $request->getControllerName();
    $module = $request->getModuleName();
    if(strtolower(substr($action, -3))=='.js'){

      $request->setActionName(substr($action, 0,count($action)-4));
      $request->setParam('format', 'js');

    }elseif(strtolower(substr($controller, -3))=='.js'){

      $request->setControllerName(substr($controller, 0,count($controller)-4));
      $request->setParam('format', 'js');

    }
    parent::routeShutdown($request);

  }
 public function dispatchLoopStartup(Zend_Controller_Request_Abstract $request)
    {
        $newActionName = $this->_camelize($request->getActionName(), '-');
        $newControllerName = $this->_camelize($request->getControllerName(), '-');
        $newModuleName = $this->_camelize($request->getModuleName(), '-');
        //$request->setActionName($newActionName);
        $request->setControllerName($newControllerName);
        //$request->setModuleName($newModuleName);
        $request->setDispatched(false);
        Zend_Controller_Front::getInstance()->setRequest($request);
    }
  private function _camelize($str, $separator = '-')
    {
        $str[0] = strtolower($str[0]);
        $func = create_function('$c', 'return "' . $separator . '" . strtolower($c[1]);');
        return preg_replace_callback('/([A-Z])/', $func, $str);
    }

}