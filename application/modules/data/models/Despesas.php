<?php

class Data_Model_Despesas
{

    public function getArray($params , $where=null,  $relationships=false){
        $despesas_table = new Data_Model_DbTable_Despesas();
        
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

