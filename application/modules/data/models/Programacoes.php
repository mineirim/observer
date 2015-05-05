<?php

class Data_Model_Programacoes {
    private $_model ='';
    public function __construct(){
        $this->_model = new Data_Model_DbTable_Programacoes();
    }
    /**
     * 
     * @param type $where
     * @param type $order
     * @param type $offset
     * @return Data_Model_DbTable_Row_Programacao
     */
    public function getRow($where=null, $order=null, $offset=null){
        return $this->_model->fetchRow($where, $order, $offset);
    }
    public function getRecursive($id=null, $instrumento_id=null, $projeto_id=null) {
        $where = " situacao_id <>2 ";
        if($instrumento_id){
            $where .= " and instrumento_id=$instrumento_id ";
        }
        $projectWhere = ' ';
        $filterProjetoId = "''";
        $projectSubWhere = ' ';
        if($projeto_id){
            $projectWhere .= ' AND '. $projeto_id.' = ANY(projetos) ';
            $projectSubWhere .= ' AND '. $projeto_id.' = ANY(p.projetos) ';
            $filterProjetoId =$projeto_id;
        }
        $where .= $id ? ' and programacao_id=' . $id : " and programacao_id is null";
        $select = "WITH RECURSIVE 
                    prog AS 
                    ( 
                    SELECT  1 as nivel, coalesce(cast(programacoes.supervisor_usuario_id as varchar),'0')  as supervisores,*, $filterProjetoId as filter_projeto_id
                    FROM    programacoes 
                    WHERE   $where    $projectWhere          
                    UNION ALL 
                    SELECT  prog.nivel+1,prog.supervisores  || ',' || coalesce(cast(p.supervisor_usuario_id as varchar),'0'),p.*, $filterProjetoId as filter_projeto_id
                    FROM    programacoes p 
                    JOIN    prog  
                    ON      p.programacao_id = prog.id 
                    WHERE p.situacao_id <>2 $projectSubWhere
                    
                    ) 
            SELECT * FROM prog ORDER BY nivel,programacao_id,ordem
            ";
        
        $stmt = Zend_Registry::get('db')->query($select);
        $stmt->setFetchMode(Zend_Db::FETCH_OBJ);
        $arr_tree = array();
        while ($r = $stmt->fetch() ) {           
            $arr_tree[$r->nivel][$r->programacao_id][$r->id]['dados'] = $r;
        }
        $this->usuarios     = new Data_Model_DbTable_Usuarios();
        $this->setores      = new Data_Model_DbTable_Setores();
        $this->instrumentos = new Data_Model_DbTable_Instrumentos();
        $this->operativos   = new Data_Model_DbTable_Operativos();
        $this->financeiros  = new Data_Model_DbTable_Financeiro();
        $parent = null;
        if($id){
            $model_programacoes = new Data_Model_DbTable_Programacoes();
            $parent = $model_programacoes->fetchRow('id='.$id);
        }
        return $this->getRecursiveArray($arr_tree, 1, $parent);
    }
    
    public function getRecursiveArray($arr_tree,$nivel=1, $parent=null) {     
        $projetosTable = new Data_Model_DbTable_Projetos;
        $root = array();
        if(!$parent){
            $parent= null;
            $ix = "";
        }else{
            $ix = $parent->id;
        }
        if(isset($arr_tree[$nivel][$ix])){
            foreach ($arr_tree[$nivel][$ix] as $v) {
                $value = $v['dados'];
                if($value->responsavel_usuario_id)
                    $usuario = $this->usuarios->fetchRow('id='.$value->responsavel_usuario_id);
                $usuario = isset($usuario) && is_object($usuario) ? $usuario->toArray() : array();
                if($value->supervisor_usuario_id)
                    $supervisor = $this->usuarios->fetchRow('id='.$value->supervisor_usuario_id);
                $supervisor = isset($supervisor) && is_object($supervisor) ? $supervisor->toArray() : array();
                if($value->projeto_id)
                    $projetoRow = $projetosTable->fetchRow('id='.$value->projeto_id);
                $projeto = isset($projetoRow) && is_object($projetoRow) ? $projetoRow->toArray() : [];
                
                $setorObj = $value->setor_id ? $this->setores->fetchRow('id='.$value->setor_id):array();
                $setor = is_object($setorObj) ? $setorObj->toArray() : array();

                $instrumento = $this->instrumentos->fetchRow('id='. $value->instrumento_id)->toArray();
                $parent = $parent ? (array) $parent : array();
                $operativos = $this->operativos->fetchAll('programacao_id='.$value->id,'ordem');
                $operativo = count($operativos) > 0 ? $operativos->toArray() : array();                
                $financeiros = $this->financeiros->fetchAll('programacao_id='.$value->id,'id');
                $financeiro = count($financeiros) > 0 ? $financeiros->toArray() : array('teste'=>'xpto');
                $child = array(
                    'id' => $value->id,
                    'menu' => $value->menu,
                    'descricao' => $value->descricao,
                    'ordem' => $value->ordem,
                    'instrumento_id' => $value->instrumento_id,
                    'programacao_id' => $value->programacao_id,
                    'setor_id' => $value->setor_id,
                    'responsavel_usuario_id' => $value->responsavel_usuario_id,
                    'supervisor_usuario_id' => $value->supervisor_usuario_id,
                    'projeto_id' => $value->projeto_id,
                    'projeto' => $projeto,
                    'responsavel' => $usuario,
                    'supervisor' => $supervisor,
                    'setor' => $setor,
                    'instrumento' => $instrumento,
                    'parent' => $parent,
                    'operativo' => $operativo,
                    'financeiro' => $financeiro,
                    'iconCls' => 'x-tree-noicon',
                    'supervisores' => $value->supervisores,
                    'situacao_id' => $value->situacao_id,
                    'filter_projeto_id' => $value->filter_projeto_id
                );
                $children=array();
                if(isset($arr_tree[$nivel+1][$value->id]))
                    $children = $this->getRecursiveArray($arr_tree,$nivel+1,$value);
                if (count($children) > 0) {
                    $child['expanded'] = false;
                    $child['rows'] = $children;
                    $child['leaf'] = false;
                } else {
                    $child['leaf'] = true;
                }
                array_push($root, $child);
            }
        }else{
            //echo "<br>$nivel - $ix -> ";
        }                    
        return $root;
    }

    public function getAll($where=null, $order='ordem', $limit=null,$offset=null) {
        $_auth = Zend_Auth::getInstance ();
        $identitity = $_auth->getIdentity();        
        $programacoes_table = new Data_Model_DbTable_Programacoes();
        $where = $where ? $where.' and situacao_id <>2' : 'situacao_id <>2';
        $programacoes = $programacoes_table->fetchAll($where, $order, $limit,$offset);
        $objs = array();
        foreach ($programacoes as $value) {
            $usuarioObj = $value->findParentRow('Data_Model_DbTable_Usuarios');
            $usuario = $usuarioObj ? $usuarioObj->toArray() : array();
            $projetoRow = $value->findParentRow('Data_Model_DbTable_Projetos');
            $projeto = $projetoRow ? $projetoRow->toArray() : [];
            $setorObj = $value->findParentRow('Data_Model_DbTable_Setores');
            $setor = $setorObj ? $setorObj->toArray() : array();
            $instrumento = $value->findParentRow('Data_Model_DbTable_Instrumentos')->toArray();
            $parentObj = $value->findParentRow('Data_Model_DbTable_Programacoes');
            $parent = $parentObj ? $parentObj->toArray() : array();
            $operativoObj = $value->findDependentRowset('Data_Model_DbTable_Operativos');
            $operativo = count($operativoObj) > 0 ? $operativoObj->toArray() : array();
            $financeirosObj = $value->findDependentRowset('Data_Model_DbTable_Financeiro');
            $financeiro = count($financeirosObj) > 0 ? $financeirosObj->toArray(1,2) : array();
            $child = array(
                'id'            => $value->id,
                'menu'          => $value->menu,
                'descricao'     => $value->descricao,
                'ordem'         => $value->ordem,
                'instrumento_id'=> $value->instrumento_id,
                'programacao_id'=> $value->programacao_id,
                'setor_id'      => $value->setor_id,
                'responsavel_usuario_id' => $value->responsavel_usuario_id,
                'supervisor_usuario_id' => $value->supervisor_usuario_id,
                'projeto_id' => $value->projeto_id,
                'projeto'       => $projeto,
                'responsavel'   => $usuario,
                'setor'         => $setor,
                'instrumento'   => $instrumento,
                'parent'        => $parent,
                'operativo'     => $operativo,
                'financeiro'    => $financeiro,
                'locked'        => !$identitity->is_su,
                'situacao_id'   => $value->situacao_id
            );
            $objs[] = $child;
        }
        return $objs;
    }
    
    
    public function getFilter($where=null, $order='ordem') {
        $programacoes_table = new Data_Model_DbTable_Programacoes();

        $programacoes = $programacoes_table->fetchAll($where. 'and situacao_id <>2', $order);
        $objs = array();
        foreach ($programacoes as $value) {
            $child = array(
                'id' => $value->id,
                'menu' => $value->menu,
                'descricao' => $value->descricao,
                'ordem' => $value->ordem,
                'instrumento_id' => $value->instrumento_id,
                'programacao_id' => $value->programacao_id,
                'projeto_id' => $value->projeto_id,
                'setor_id' => $value->setor_id,
                'responsavel_usuario_id' => $value->responsavel_usuario_id,
                'supervisor_usuario_id' => $value->supervisor_usuario_id
            );
            $objs[] = $child;
        }
        return $objs;
    }
    /**
     *
     * @param type $id
     * @param type $withAssociations
     * @return type array
     */
    public function getProgramacao($id, $withAssociations=false) {
        $programacoes = new Data_Model_DbTable_Programacoes();
        $where = "id=$id and situacao_id <>2";
        $programacao = $programacoes->fetchRow($where,'ordem');
        $row = $programacao->toArray();
        $operativo = $programacao->findDependentRowset('Data_Model_DbTable_Operativos');
        if (count($operativo) > 0) {
            $row['operativo'] = $operativo->toArray();
        }

        if ($withAssociations) {
            $usuarioRow = $programacao->findParentRow('Data_Model_DbTable_Usuarios');
            $usuario = $usuarioRow ? $usuarioRow->toArray() : [];
            $setorRow = $programacao->findParentRow('Data_Model_DbTable_Setores');
            $setor = $setorRow ? $setorRow->toArray() : [];
            $projetoTable = $programacao->findParentRow('Data_Model_DbTable_Projetos');
            $projeto = $projetoTable ? $projetoTable->toArray() : [];
            $row['responsavel'] = $usuario;
            $row['setor'] = $setor;
            $row['projeto'] = $projeto;
            $row['instrumento'] = $programacao->findParentRow('Data_Model_DbTable_Instrumentos')->toArray();
            $parent = $programacao->findParentRow('Data_Model_DbTable_Programacoes');
            $row['parent'] = $parent ? $parent->toArray() : '';
        }
        return $row;
    }

    /**
     *
     * @param type $menu
     * @return type array
     */
    public function searchProgramacao($menu,$params=null) {
        $dbProgramacoes = new Data_Model_DbTable_Programacoes();
        
//        $programacoes = $dbProgramacoes->getAdapter()->fetchAll(
//                        $dbProgramacoes->select()->setIntegrityCheck(false)
//                                ->from(array('p' => 'programacoes'), 'p.*')
//                                ->join(array('i' => 'instrumentos'), 'p.instrumento_id = i.id', array())
//                                ->where('i.has_operativo = ?', true)
//                                ->where('p.situacao_id <>?', 2)
//                                ->where("p.menu like '%$menu%'"));
        $where = "situacao_id<>2 AND menu like '%$menu%'";
        $rows = $dbProgramacoes->getOnePageOfOrderEntries($params, $where);
        
        return $rows;
    }

    /**
     *
     * @param type $programacaoId
     * @return type array
     */
    public function getNode($programacaoId=null, $instrumentoId=null, $projetoId=null) {
        
        $rows = array();
        $where = $programacaoId ? "programacao_id=$programacaoId" : "instrumento_id=$instrumentoId";
        $project_where = $projetoId!==null ? ' AND '. $projetoId.' = ANY(projetos) ' : ' ';
        $select = " SELECT *, (select count(*) from programacoes pr where programacao_id=p.id and pr.situacao_id <>2) as leaf,programacao_id as parent FROM programacoes p WHERE $where $project_where AND p.situacao_id <>2 ORDER BY ordem";
        $stmt = Zend_Registry::get('db')->query($select);
        $stmt->setFetchMode(Zend_Db::FETCH_OBJ);
        while ($r = $stmt->fetch() ) {
            $row = (array) $r;
            $row['leaf']= !$row['leaf']>0;
            $row['projeto_id'] =$projetoId;
            $rows[] = $row;
        }   
        return $rows;
    }
    public function getPendentes($projetoId=null) {
        $this->_auth = Zend_Auth::getInstance ();
        $identity = $this->_auth->getIdentity();
        $project_where = $projetoId!==null ? ' AND '. $projetoId.' = ANY(projetos) ' : ' ';
        $where = ' supervisor_usuario_id='.$identity->id;
        $select = "WITH RECURSIVE 
                    prog AS 
                    ( 
                    SELECT  1 as nivel,array[programacoes.id] AS path, coalesce(cast(programacoes.supervisor_usuario_id as varchar),'0')  as supervisores,*
                    FROM    programacoes 
                    WHERE   $where $project_where
                    UNION ALL 
                    SELECT  prog.nivel+1,prog.path || p.id AS path, prog.supervisores  || ',' || coalesce(cast(p.supervisor_usuario_id as varchar),'0'), p.*
                    FROM    programacoes p 
                    JOIN    prog  
                    ON      p.programacao_id = prog.id 
                    ) 
            SELECT prog.*, i.singular as instrumento FROM prog 
            INNER JOIN instrumentos i on prog.instrumento_id=i.id
            WHERE prog.situacao_id=3 $project_where
            ORDER BY path
            ";
        $stmt = Zend_Registry::get('db')->query($select);
        $stmt->setFetchMode(Zend_Db::FETCH_OBJ);
        
        return $stmt->fetchAll();
    }
    public function delete($id){                
        $table_programacoes = new \Data_Model_DbTable_Programacoes();
        $table_programacoes->update(array('situacao_id'=>2), "id=$id");
    }
    /**
     * TODO implementar deleção lógica em cascata
     * @param type $where
     * @return type
     */
    private function cascadeDelete($where)
    {
        $depTables = $this->getDependentTables();
        if (!empty($depTables)) {
            $resultSet = $this->fetchAll($where);
            if (count($resultSet) > 0 ) {
                foreach ($resultSet as $row) {
                    /**
                     * Execute cascading deletes against dependent tables
                     */
                    foreach ($depTables as $tableClass) {
                        $t = self::getTableFromString($tableClass, $this);
                        $t->_cascadeDelete($tableClass, $row->getPrimaryKey());
                    }
                }
            }
        }

        $tableSpec = ($this->_schema ? $this->_schema . '.' : '') . $this->_name;
        return $this->_db->delete($tableSpec, $where);
    }
}