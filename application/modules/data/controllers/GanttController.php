<?php

class Data_GanttController extends Zend_Rest_Controller {

    public function init() {
        $swContext = $this->_helper->contextSwitch();
        $swContext->setAutoJsonSerialization(true);
        $swContext->addActionContext('index', array('json', 'xml'))
                ->addActionContext('put', array('json', 'xml'))
                ->addActionContext('post', array('json', 'xml'))
                ->addActionContext('get', array('json', 'xml'))
                ->addActionContext('delete', array('json', 'xml'))
                ->initContext('xml');
        $this->_helper->layout()->disableLayout();
        
        $this->_helper->viewRenderer->setNoRender(true);
    }

    public function headAction()
    {
        $this->getResponse()->setHttpResponseCode(200);
    }
    public function indexAction() {
        $node_id= $this->_getParam('node_id');
        $this->getResponse()->setHeader('Content-type', 'text/xml');
        $this->_helper->layout()->disableLayout();
        echo "<project>" . $this->getRecursive($node_id, $node_id ) . "</project>";
    }
    
    public function getRecursive($id=null, $isRoot=false) {
        
        $model_programacoes = new Data_Model_DbTable_Programacoes();
        $model_operativos   = new Data_Model_DbTable_Operativos();
        $model_vinculos     = new Data_Model_DbTable_Vinculos();
        $where = $id ? "programacao_id=$id" : "programacao_id is null";
        $programacoes = $model_programacoes->fetchAll($where, 'ordem');
        $root = array();
        
        $parent_id = $id && !$isRoot ? (int) $id + 100000: '';
        $xmlString = '';
        $task = '';
        foreach ($programacoes as $programacao) {
            
            $vinculadas =array();// $model_vinculos->fetchAll('situacao_id=1 and programacao_id=' . $programacao->id);
            $str_vinculadas = array();
            foreach ($vinculadas as $vinculo) {
                $str_vinculadas[] = (int) $vinculo->depende_programacao_id + 100000;
            }
            $str_vinculadas = implode(',', $str_vinculadas);            
        
            $usuario = $programacao->findParentRow('Data_Model_DbTable_Usuarios');
            $nome_responsavel = $usuario ? $usuario->nome:'';
            $instrumento = $programacao->findParentRow('Data_Model_DbTable_Instrumentos');
            $parent = $programacao->findParentRow('Data_Model_DbTable_Programacoes');
            $operativo = $programacao->findDependentRowset('Data_Model_DbTable_Operativos');
            $data_inicio= $data_prazo=null;
            
            if(count($operativo)){
                $operativo = $operativo->current();
                $data_inicio    = $operativo->data_inicio;
                $data_prazo     = $operativo->data_prazo;
            }
                $opid = (int) $programacao->id + 100000;
                $task .= "<task>
                <pID>$opid</pID>
                <pName>$programacao->menu</pName>
                <pStart>$data_inicio</pStart>
                <pEnd>$data_prazo</pEnd>
                <pColor>0000ff</pColor>
                <pLink>/xx</pLink>
                <pMile>0</pMile>
                <pRes>$nome_responsavel</pRes>
                <pComp>70</pComp>
                <pParent>$parent_id</pParent>
                <pDepend>$str_vinculadas</pDepend>";

       
                
            $children = $this->getRecursive($programacao->id);
            if (strlen($children) > 0) {
                $task .= "
                <pOpen>1</pOpen>";
                $task .= "
                <pGroup>1</pGroup>";
            } else {
                $task .= "
                <pOpen>1</pOpen>";
                
                $task .= "
                <pGroup>0</pGroup>";
            }
            $task .= '
            </task>
            ';
            $task .= $children;
        }
         $xmlString .= $task ;
        return $xmlString;
    }

} 