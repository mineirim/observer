<?php

class Data_ProjetosNavigationController extends Zend_Rest_Controller
{

    public function init()
    {
        $swContext = $this->_helper->contextSwitch();
        $swContext->setAutoJsonSerialization(true);
        $swContext->addActionContext('index', ['json', 'xml'])
                        ->addActionContext('put', [ 'json', 'xml'])
                        ->addActionContext('post', ['json', 'xml'])
                        ->addActionContext('get', ['json', 'xml'])
                        ->addActionContext('delete', [ 'json', 'xml'])
                        ->initContext('json');
        $this->_helper->layout()->disableLayout();
    }

    public function indexAction()
    {
        $this->_helper->viewRenderer->setNoRender(true);
        $programacoes_model = new Data_Model_Programacoes();
        $instrumentos_table = new Data_Model_DbTable_Instrumentos();
        $projetosTable = new \Data_Model_DbTable_Projetos();
        $arrNodeCode=explode('-', $this->_getParam('node')); 
        
        if(in_array('projetoId', $arrNodeCode) ){
            $isProjetoRoot=true;
            $node=$arrNodeCode[1];
        }else{
            $isProjetoRoot=false;
            $node=$arrNodeCode[count($arrNodeCode)-1];
        }
        
        if ( $node== 'root') {
            $projetosRoot= $projetosTable->fetchAll();
            $rows = [];
            foreach ($projetosRoot as $value) {
                $root = [
                    'id'=>  "projetoId-".$value->id,
                    'menu'=>$value->nome
                ];
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