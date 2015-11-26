<?php

class Data_Model_Orcamento
{
    public function getGrupoChart($projetoId){
        $sql = 'SELECT upper(grupo_despesas) grupo_despesas , sum(vlr_programado) vlr_programado, sum(vlr_alocado) vlr_alocado, sum(executado) vlr_executado
            FROM
            vw_orcamento vo LEFT OUTER JOIN vw_execucao as ve ON vo.financeiro_id=ve.financeiro_id
            WHERE vo.orcamento_id=?
            GROUP BY upper(grupo_despesas)
            ORDER BY grupo_despesas';
            $stmt = Zend_Registry::get('db')->query($sql,[$projetoId]);
            return $stmt->fetchAll();
    }
    public function getResumoMacro(){
        $sql =  "SELECT id,menu , 100+id as vlr_alocado, 50+id AS vlr_executado FROM programacoes WHERE instrumento_id=2 ";
        $stmt = Zend_Registry::get('db')->query($sql);
        return $stmt->fetchAll();
    }
    public function getArray($params , $where=null,  $relationships=false){
        $despesas_table = new Data_Model_DbTable_Despesas();
        $params['limit']='';
        $despesas = $despesas_table->getOnePageOfOrderEntries($params , $where);
        if(!$relationships)
            return $despesas;
        $rows = array();
        $tableFinanceiro = new Data_Model_DbTable_Financeiro();
        foreach ($despesas['rows'] as $despesa) {

            $rowFinanceiro = $tableFinanceiro->fetchRow('id='.$despesa['financeiro_id']) ;
            $financeiro = $rowFinanceiro  ? $rowFinanceiro->toArray() : array();
            $row = array(
                'id'                => $despesa['id'],
                'descricao'         => $despesa['descricao'],
                'financeiro_id'    => $despesa['financeiro_id'],
                'valor'             => $despesa['valor'],
                'financeiro'      => $financeiro
            );

            $rows[] = $row;
        }
        $despesas['rows']=$rows;
        return $despesas;
    }
}

