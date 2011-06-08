<?php
class My_Plugin_RemoveJsPlugin extends Zend_Controller_Plugin_Abstract
{
  public function  routeShutdown(Zend_Controller_Request_Abstract $request)
  {
    $action = $request->getActionName();
    $controller = $request->getControllerName();

    if(strtolower(substr($action, -3))=='.js'){

      $request->setActionName(substr($action, 0,count($action)-4));
      $request->setParam('format', 'js');

    }elseif(strtolower(substr($controller, -3))=='.js'){

      $request->setControllerName(substr($controller, 0,count($controller)-4));
      $request->setParam('format', 'js');

    }
    parent::routeShutdown($request);

  }

}