<?php

class Data_Model_Programacoes {

    public function getRecursive($id=null) {
        $where = $id ? 'programacao_id=' . $id : "programacao_id is null";
        $select = "WITH RECURSIVE 
                    prog AS 
                    ( 
                    SELECT  1 as nivel, * 
                    FROM    programacoes 
                    WHERE   $where

                    UNION ALL 
                    SELECT  prog.nivel+1,p.*
                    FROM    programacoes p 
                    JOIN    prog  
                    ON      p.programacao_id = prog.id 
                    ) 
            SELECT * from prog order by nivel,programacao_id,ordem
            ";
        $stmt = Zend_Registry::get('db')->query($select);
        $stmt->setFetchMode(Zend_Db::FETCH_OBJ);
        $arr_tree = array();
        while ($r = $stmt->fetch() ) {
           
            $arr_tree[$r->nivel][$r->programacao_id][$r->id]['dados'] = $r;
        }
        $this->usuarios = new Data_Model_DbTable_Usuarios();
        $this->setores =new Data_Model_DbTable_Setores();
        $this->instrumentos =  new Data_Model_DbTable_Instrumentos();
        $this->operativos = new Data_Model_DbTable_Operativos();
        $parent = null;
        if($id){
            $model_programacoes = new Data_Model_DbTable_Programacoes();
            $parent = $model_programacoes->fetchRow('id='.$id);
        }
        return $this->getRecursiveArray($arr_tree, 1, $parent);
    }
    
    public function getRecursiveArray($arr_tree,$nivel=1, $parent=null) {
     
        $root = array();
        if(!$parent){
            $parent= null;
            $ix = "";
        }else{
            $ix = $parent->id;
        }

        if(isset($arr_tree[$nivel][$ix])){
            foreach ($arr_tree[$nivel][$ix] as $key => $v) {

                $value = $v['dados'];
                $usuario=array();
                if($value->responsavel_usuario_id)
                    $usuario = $this->usuarios->fetchRow('id='.$value->responsavel_usuario_id);
                $usuario = $usuario ? $usuario->toArray() : array();

                $setor = $value->setor_id ? $this->setores->fetchRow('id='.$value->setor_id):array();
                $setor = $setor ? $setor->toArray() : array();

                $instrumento = $this->instrumentos->fetchRow('id='. $value->instrumento_id)->toArray();
                $parent = $parent ? (array) $parent : array();
                $operativos = $this->operativos->fetchAll('programacao_id='.$value->id,'ordem');

                $operativo = count($operativos) > 0 ? $operativos->toArray() : array();

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
                    'responsavel' => $usuario,
                    'setor' => $setor,
                    'instrumento' => $instrumento,
                    'parent' => $parent,
                    'operativo' => $operativo,
                    'iconCls' => 'x-tree-noicon'
                );
                $children=array();
                if(isset($arr_tree[$nivel+1][$value->id]))
                    $children = $this->getRecursiveArray($arr_tree,$nivel+1,$value);
                if (count($children) > 0) {
                    $child['expanded'] = true;
                    $child['rows'] = $children;
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

    public function getRecursive_antigo($id=null) {
        $programacoes_table = new Data_Model_DbTable_Programacoes();
        $where = $id ? 'programacao_id=' . $id : "programacao_id is null";
        $programacoes = $programacoes_table->fetchAll($where, 'ordem');
        $root = array();
        foreach ($programacoes as $value) {
            $usuario = $value->findParentRow('Data_Model_DbTable_Usuarios');
            $usuario = $usuario ? $usuario->toArray() : array();
            $setor = $value->findParentRow('Data_Model_DbTable_Setores');
            $setor = $setor ? $setor->toArray() : array();
            $instrumento = $value->findParentRow('Data_Model_DbTable_Instrumentos')->toArray();
            $parent = $value->findParentRow('Data_Model_DbTable_Programacoes');
            $parent = $parent ? $parent->toArray() : array();
            $operativo = $value->findDependentRowset('Data_Model_DbTable_Operativos');

            $operativo = count($operativo) > 0 ? $operativo->toArray() : array();
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
                'responsavel' => $usuario,
                'setor' => $setor,
                'instrumento' => $instrumento,
                'parent' => $parent,
                'operativo' => $operativo,
                'iconCls' => 'x-tree-noicon'
            );
            $children = $this->getRecursive($value->id);
            if (count($children) > 0) {
                $child['expanded'] = true;
                $child['rows'] = $children;
            } else {
                $child['leaf'] = true;
            }
            array_push($root, $child);
        }
        return $root;
    }

    public function getAll($where=null, $order='ordem') {
        $programacoes_table = new Data_Model_DbTable_Programacoes();

        $programacoes = $programacoes_table->fetchAll($where, $order);
        $objs = array();
        foreach ($programacoes as $value) {
            $usuario = $value->findParentRow('Data_Model_DbTable_Usuarios');
            $usuario = $usuario ? $usuario->toArray() : array();
            $setor = $value->findParentRow('Data_Model_DbTable_Setores');
            $setor = $setor ? $setor->toArray() : array();
            $instrumento = $value->findParentRow('Data_Model_DbTable_Instrumentos')->toArray();
            $parent = $value->findParentRow('Data_Model_DbTable_Programacoes');
            $parent = $parent ? $parent->toArray() : array();
            $operativo = $value->findDependentRowset('Data_Model_DbTable_Operativos');

            $operativo = count($operativo) > 0 ? $operativo->toArray() : array();
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
                'responsavel' => $usuario,
                'setor' => $setor,
                'instrumento' => $instrumento,
                'parent' => $parent,
                'operativo' => $operativo
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
        $where = "id=$id";
        $programacao = $programacoes->fetchRow($where);
        $row = $programacao->toArray();
        $operativo = $programacao->findDependentRowset('Data_Model_DbTable_Operativos');
        if (count($operativo) > 0) {
            $row['operativo'] = $operativo->toArray();
        }

        if ($withAssociations) {
            $usuario = $programacao->findParentRow('Data_Model_DbTable_Usuarios');
            $usuario = $usuario ? $usuario->toArray() : array();
            $setor = $programacao->findParentRow('Data_Model_DbTable_Setores');
            $setor = $setor ? $setor->toArray() : array();
            $row['responsavel'] = $usuario;
            $row['setor'] = $setor;
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
    public function searchProgramacao($menu) {
        $dbProgramacoes = new Data_Model_DbTable_Programacoes();
        $programacoes = $dbProgramacoes->getAdapter()->fetchAll(
                        $dbProgramacoes->select()->setIntegrityCheck(false)
                                ->from(array('p' => 'programacoes'), 'p.*')
                                ->join(array('i' => 'instrumentos'), 'p.instrumento_id = i.id', array())
                                ->where('i.has_operativo = ?', true)
                                ->where("p.menu like '%$menu%'"));
        $rows = $programacoes;
        return $rows;
    }

    /**
     *
     * @param type $programacao_id
     * @return type array
     */
    public function getNode($programacao_id=null, $instrumento_id=null) {
        $programacoes_table = new Data_Model_DbTable_Programacoes();

        $where = $programacao_id ? "programacao_id=$programacao_id" : "instrumento_id=$instrumento_id";
        $programacoes = $programacoes_table->fetchAll($where);
        $rows = array();
        foreach ($programacoes as $programacao) {
            $row = $programacao->toArray();
            $row['leaf'] = count($programacao->findDependentRowset('Data_Model_DbTable_Programacoes')) == 0;
            $row['parent'] = $programacao->id;
            $rows[] = $row;
        }
        return $rows;
    }

}