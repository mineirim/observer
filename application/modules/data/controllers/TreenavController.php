<?php

class Data_TreenavController extends Zend_Rest_Controller
{

    public function init()
    {
        $swContext = $this->_helper->contextSwitch();
        $swContext->setAutoJsonSerialization(true);
        $swContext->addActionContext('index', array('json', 'xml'))
                        ->addActionContext('get', array('json', 'xml'))
                        ->initContext('json');
        $this->_helper->layout()->disableLayout();
    }

    public function indexAction()
    {
        $this->_helper->viewRenderer->setNoRender(true);
        $programacao_table = new Data_Model_Programacoes();
        if ($this->_getParam('node') == 'root') {
            $instrumentos_table = new Data_Model_DbTable_Instrumentos();
            $instrumentos_root= $instrumentos_table->fetchAll('instrumento_id is null', 'id');
            $rows = array();
            foreach ($instrumentos_root as $value) {
                $root = array(
                    'id'=>$value->id,
                    'menu'=>$value->menu
                );
                $programacoes = $programacao_table->getNode(null,$value->findDependentRowset('Data_Model_DbTable_Instrumentos')->current()->id);
                $root['rows'] = $programacoes;
                $rows[]=$root;
            }
            
            $this->_helper->viewRenderer->setNoRender(true);
            $this->view->rows= $rows;
        } else {
                $programacoes = $programacao_table->getNode($this->_getParam('node'));
   
               $this->view->rows = $programacoes;
            
        }
        
    }

    public function getAction()
   {    
        $instrumentos_table = new Data_Model_DbTable_Instrumentos();
        $instrumento = $instrumentos_table->fetchRow('id = ' . $this->_getParam('id')) ;
        $this->view->rows = $instrumento->toArray();
        //$this->view->total = count($usuario);
        $this->view->success = true;
    }
    public function postAction(){}
    public function deleteAction(){}
    public function putAction(){}

}

