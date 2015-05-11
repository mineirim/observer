<?php

class Data_Model_DbTable_Programacoes extends Etc_Model_AssignModel
{

    protected $_name = 'programacoes';
    protected $_rowClass = 'Data_Model_DbTable_Row_Programacao';
    protected $_dependentTables = ['Data_Model_DbTable_Programacoes','Data_Model_DbTable_Operativos', 'Data_Model_DbTable_Financeiro', 'Data_Model_DbTable_ProgramacaoAnexos'];
    
    protected $_referenceMap =  [
                'Usuarios' =>  [ 'columns' => 'responsavel_usuario_id', 
                                'refTableClass' => 'Data_Model_DbTable_Usuarios', 
                                'refColumns' => 'id' ] ,
                'Setores' =>  [ 'columns' => 'setor_id', 
                                'refTableClass' => 'Data_Model_DbTable_Setores', 
                                'refColumns' => 'id' ],
                'Projetos' =>  [ 'columns' => 'projeto_id', 
                                'refTableClass' => 'Data_Model_DbTable_Projetos', 
                                'refColumns' => 'id' ],
                'Instrumentos' =>  [ 'columns' => 'instrumento_id', 
                                'refTableClass' => 'Data_Model_DbTable_Instrumentos', 
                                'refColumns' => 'id' ],
                'Parent' =>  [ 'columns' => 'programacao_id', 
                                'refTableClass' => 'Data_Model_DbTable_Programacoes', 
                                'refColumns' => 'id' ]         
                ];

    public function update(array $data, $where) {
        $ret = parent::update($data, $where);
        if(isset($data['projeto_id']) && $data['projeto_id']!==''){
            $programacao = $this->fetchRow($where);
            $this->updateTreeOfProjects($data['projeto_id'],$programacao->id);
        }
        return $ret;
    }
    public function insert(array $data) {
        $id =parent::insert($data);
        if(isset($data['projeto_id']) && $data['projeto_id']!==''){
            $this->updateTreeOfProjects($data['projeto_id'],$id);
        }
        return $id;
    }
    public function updateTreeOfProjects($projetoId=false,$programacaoId=false){
        /* @var $logger Zend_Log */
        $logger = \Zend_Registry::get('logger');
        $projetosDbTable = new Data_Model_DbTable_Projetos();
        $where=null;
        if($projetoId){
            $where = ' id='.$projetoId;
        }        
        $projetos = $projetosDbTable->fetchAll($where);        
        $programacaoWhere = '';
        if($programacaoId){
            $programacaoWhere = ' AND id='.$programacaoId;
        }
        /* @var $db \Zend_Db */
        $db= Zend_Registry::get('db');
        
        foreach ($projetos as $projeto) {
            $sql = 'WITH RECURSIVE 
                        prog AS 
                        ( 
                        SELECT  1 as nivel,array[programacoes.id] AS path,  programacoes.id, programacao_id
                        FROM    programacoes 
                        WHERE   projeto_id=' . $projeto->id . $programacaoWhere .' 
                        UNION ALL
                        SELECT  prog.nivel+1,  prog.path || p.id,  p.id, p.programacao_id
                        FROM    programacoes p 
                        JOIN    prog  
                        ON      p.id = prog.programacao_id
                        ) 
                update programacoes set projetos=array_append_distinct(projetos,' . $projeto->id . ') where programacoes.id in (select id from prog)';
            $query = $db->query($sql);
            $query->execute();
            $logger->log($sql, Zend_Log::INFO);
        }
    }
}

