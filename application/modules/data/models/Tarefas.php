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
    public function getBy($column,$pWhere=false,$all=false,$order='p.ordem ASC'){
        $identity = $this->_auth->getIdentity();
        $where = ' instrumento_id=6 and p.situacao_id <>2';
        $where .= ' AND '. $column.'='.$identity->id;
        if(!$all){
            $where .= ' AND (andamento_id not in(6,7) OR andamento_id is null)';
        }
        if($pWhere){
            $where .= $pWhere;
        }        
        $select = 'SELECT   p.id, p.menu, p.responsavel_usuario_id,p.supervisor_usuario_id, p.ordem,p.projeto_id,
                            o.peso, o.data_inicio, o.data_prazo, o.data_encerramento, o.avaliacao_andamento, o.percentual_execucao, 
                            o.alteracao_data, 
                            o.andamento_id, 
                            andamentos.descricao andamento
                    FROM 
                      public.programacoes p left outer join
                      public.operativos o on p.id = o .programacao_id
                      left outer join 
                      public.andamentos on andamentos.id = o.andamento_id
                    where  ' . $where .  
                    'ORDER BY '. $order;
        $stmt = Zend_Registry::get('db')->query($select);
        $stmt->setFetchMode(Zend_Db::FETCH_OBJ);        
        $tarefas = [];
        while ($value = $stmt->fetch() ) {
            $tarefa = [
                'id' => $value->id,
                'menu' => $value->menu,
                'peso' => $value->peso,
                'ordem' => $value->ordem,
                'projeto_id' => $value->projeto_id,
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
            ];
            $tarefas[] = $tarefa;
        }
        return $tarefas;
    }
}
