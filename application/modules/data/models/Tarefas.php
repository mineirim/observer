<?php
/**
 * Description of Tarefas
 *
 * @author marcone
 */
class Data_Model_Tarefas {
    /**
     * @var Data_Model_DbTable_Programacoes
     */
    private $_dbTableProgramacoes;
    public function __construct(){
        $this->_dbTableProgramacoes = new Data_Model_DbTable_Programacoes();
        $this->_auth = Zend_Auth::getInstance ();
    }
    /**
     * 
     * @param type $column coluna do filtro (reponsavel_id ou supervisor_id)
     * @param type $all
     * @return type
     */
    public function getBy($column,$order='ordem',$all=false){
        $identity = $this->_auth->getIdentity();
        $where = ' instrumento_id=6 and programacoes.situacao_id <>2';
        $where .= ' AND '. $column.'='.$identity->id;
        if(!$all){
            $where .= ' AND (andamento_id not in(6,7) OR andamento_id is null)';
        }
        
        $select = 'SELECT   programacoes.id, 
                            programacoes.menu, 
                            programacoes.responsavel_usuario_id,
                            programacoes.supervisor_usuario_id,
                            programacoes.ordem,
                            operativos.peso, 
                            operativos.data_inicio, 
                            operativos.data_prazo, 
                            operativos.data_encerramento, 
                            operativos.avaliacao_andamento, 
                            operativos.percentual_execucao, 
                            operativos.alteracao_data, 
                            operativos.andamento_id, 
                            andamentos.descricao andamento
                    FROM 
                      public.programacoes left outer join
                      public.operativos on programacoes.id = operativos.programacao_id
                      left outer join 
                      public.andamentos on andamentos.id = operativos.andamento_id
                    where  ' . $where .  
                    'ORDER BY
                      programacoes.ordem ASC;
                    ';
        $stmt = Zend_Registry::get('db')->query($select);
        $stmt->setFetchMode(Zend_Db::FETCH_OBJ);        
        $tarefas = [];
        while ($value = $stmt->fetch() ) {
            $tarefa = array(
                'id' => $value->id,
                'menu' => $value->menu,
                'peso' => $value->peso,
                'ordem' => $value->ordem,
                'data_inicio' => $value->data_inicio,
                'data_prazo' => $value->data_prazo,
                'data_encerramento' => $value->data_encerramento,
                'avaliacao_andamento' => $value->avaliacao_andamento,
                'percentual_execucao' => $value->percentual_execucao,
                'alteracao_data' => $value->alteracao_data,
                'andamento_id' => $value->andamento_id,
                'andamento' => $value->andamento,
                'responsavel_usuario_id' => $value->responsavel_usuario_id,
                'supervisor_usuario_id' => $value->supervisor_usuario_id
            );
            $tarefas[] = $tarefa;
        }
        return $tarefas;
    }
}
