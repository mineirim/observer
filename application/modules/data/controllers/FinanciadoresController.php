<?php

class Data_FinanciadoresController extends Zend_Rest_Controller
{

    public function init()
    {
        $swContext = $this->_helper->contextSwitch();
        $swContext->setAutoJsonSerialization(true);
        $swContext->addActionContext('index', array('json', 'xml'))
                        ->addActionContext('put', array( 'json', 'xml'))
                        ->addActionContext('post', array('json', 'xml'))
                        ->addActionContext('get', array('json', 'xml'))
                        ->addActionContext('delete', array( 'json', 'xml'))
                        ->initContext('json');
        $this->_helper->layout()->disableLayout();
    }

    public function headAction()
    {
        $this->getResponse()->setHttpResponseCode(200);
    }
    public function indexAction()
    {
        $projetosModel = new Data_Model_Projetos();
        $this->_helper->viewRenderer->setNoRender(true);
        $params =$this->getAllParams();
        if(!isset($params['projeto_id']) || $params['projeto_id'] ==''){
            $this->view->rows =[];
        }else{
            $rows = $projetosModel->getFinanciadores( $params['projeto_id'] );
            $data = [];
            while ($rows->valid()){
                $r = $rows->current();
                $data[] = array_merge($r->toArray(), ['projeto_id'=>(int)$params['projeto_id']]);
                $rows->next();
            }
            $this->view->rows = $data;
        }
    }

    public function getAction()
    {
        // action body
    }

    public function putAction()
    {
   
    }

    public function postAction()
    {
    }

    public function deleteAction()
    {
   
    }


}

