<?php

/**
 * Description of Email
 *
 * @author marcone
 */
class Plano_EmailController extends Zend_Controller_Action
{

    public function init()
    {
        $swContext = $this->_helper->contextSwitch();
//        $swContext->setAutoJsonSerialization(true);
//        $swContext->addActionContext('index', array('json', 'xml'))
//                        ->addActionContext('put', array( 'json', 'xml'))
//                        ->addActionContext('post', array('json', 'xml'))
//                        ->addActionContext('get', array('json', 'xml'))
//                        ->addActionContext('delete', array( 'json', 'xml'))
//                        ->addActionContext('search', array( 'json', 'xml'))
//                        ->initContext('json');
        $this->_helper->layout()->disableLayout();
    }
    function toownerAction() {
        $return='';
        $id=$this->getParam('id');
        if($id){
                $modelEmail = new Data_Model_Email();
                $return = $modelEmail->sendToOwner($id, $this->getParam('message'));
        }
        $this->_helper->viewRenderer->setNoRender(true);
        $this->view->return= $return;
        $this->view->total = count($return);
        $this->getResponse()->setHttpResponseCode(200);        
    }
    public function fromownerAction() {

    }
}
