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
        $instrumentos_table = new Data_Model_DbTable_Instrumentos();
        $arr_node=explode('-', $this->_getParam('node'));
        if(in_array('instrumentoId', $arr_node)){
            $isInstrumento=true;
            $node=$arr_node[1];
        }else{
            $isInstrumento=false;
            $node=$arr_node[0];
        }
        
        if ( $node== 'root') {
            
            $instrumentos_root= $instrumentos_table->fetchAll('instrumento_id is null', 'id');
            $rows = array();
            foreach ($instrumentos_root as $value) {
                $root = array(
                    'id'=>  "instrumentoId-".$value->id,
                    'menu'=>$value->menu
                );
                
                $rows[]=$root;
            }
            $this->view->rows= $rows;
        } elseif($isInstrumento){
            $instrumento = $instrumentos_table->fetchRow('instrumento_id='.$node);
            $programacoes = $programacao_table->getNode(null,$instrumento->id);
            $this->view->rows = $programacoes;
        }else{
            $programacoes = $programacao_table->getNode($node);
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

