<?php

class Data_ProjetosNavigationController extends Zend_Rest_Controller
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

    public function indexAction()
    {
        $this->_helper->viewRenderer->setNoRender(true);
        $programacoes_model = new Data_Model_Programacoes();
        $instrumentos_table = new Data_Model_DbTable_Instrumentos();
        $projetosTable = new \Data_Model_DbTable_Projetos();
        $arr_node=explode('-', $this->_getParam('node')); 
        
        if(in_array('projetoId', $arr_node) ){
            $isProjetoRoot=true;
            $node=$arr_node[1];
        }else{
            $isProjetoRoot=false;
            $node=$arr_node[0];
        }
        
        if ( $node== 'root') {
            $projetosRoot= $projetosTable->fetchAll();
            $rows = array();
            foreach ($projetosRoot as $value) {
                $root = array(
                    'id'=>  "projetoId-".$value->id,
                    'menu'=>$value->nome
                );
                $rows[]=$root;
            }
            $this->view->rows= $rows;
        } elseif($isProjetoRoot){            
            $instrumentoId = 2; //@TODO Implementar  filtro por tipo de instumento. 2=Macro objetivos
            $programacoes = $programacoes_model->getNode(null,$instrumentoId,$node);
            $this->view->rows = $programacoes;
        }else{
            $projetoId = $this->getParam('projetoId');
            $programacoesDbTable = new Data_Model_DbTable_Programacoes();
            $prog = $programacoesDbTable->find($node)->current();
            if ($prog) {
                $instrumento = $prog->findParentRow('Data_Model_DbTable_Instrumentos');
            }
            if($instrumento && $instrumento->has_vlr_programado){
                $myTreeProgramacoes = new My_Tree_Programacoes();
                $this->view->rows = $myTreeProgramacoes->getOrcamentoNodes($prog);            
            }else{
                $programacoes = $programacoes_model->getNode($node,null,$projetoId);
                $this->view->rows = $programacoes;
            }

        }
    }
    public function headAction()
    {
        $this->getResponse()->setHttpResponseCode(200);
    }

    public function deleteAction() {
        $this->view->error='Transações não são permitidas neste controller';
        $this->getResponse()->setHttpResponseCode(501);        
    }

    public function getAction() {
        $this->view->error='Transações não são permitidas neste controller';
        $this->getResponse()->setHttpResponseCode(501);        
    }

    public function postAction() {
        $tarefasModel = new Data_Model_ProjetosNavigation();
        $tarefasModel->updateAllProjects();
        $this->view->error='Transações não são permitidas neste controller';
        $this->getResponse()->setHttpResponseCode(501);        
    }

    public function putAction() {
        $this->view->error='Transações não são permitidas neste controller';
        $this->getResponse()->setHttpResponseCode(501);
    }

}