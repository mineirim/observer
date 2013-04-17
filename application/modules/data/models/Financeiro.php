<?php

class Data_Model_Financeiro
{

    public function getArray($where=null, $order=null, $relationships=false){
        $financeiro_table = new Data_Model_DbTable_Financeiro();
        
        $financeiros = $financeiro_table->fetchAll($where, $order);       
        if(!$relationships)
            return $financeiros ? $financeiros->toArray():array();
        $rows = array();
        foreach ($financeiros as $financeiro) {
            $tabledespesas = new Data_Model_DbTable_Despesas();
            $select = $tabledespesas->select();
            $select->from('despesas','SUM(valor) AS valor');
            $despesas = $financeiro->findDependentRowset('Data_Model_DbTable_Despesas',null,$select);
            $tableGrupoDespesa = $financeiro->findParentRow('Data_Model_DbTable_GrupoDespesas');
            $grupoDespesa = count($tableGrupoDespesa) > 0 ? $tableGrupoDespesa->toArray() : array();
            $row = array(
                'id'                => $financeiro->id,
                'descricao'         => $financeiro->descricao,
                'grupo_despesa_id'  => $financeiro->grupo_despesa_id,
                'programacao_id'    => $financeiro->programacao_id,
                'tipo_registro_id'  => $financeiro->tipo_registro_id,
                'financeiro_id'      => $financeiro->financeiro_id,
                'valor'             => $financeiro->valor,
                'origem_recurso_id' => $financeiro->origem_recurso_id,
                'grupoDespesa'      => $grupoDespesa,
                'valor_executado'   => $despesas->current()->valor
            );

            $rows[] = $row;
        }
        return $rows;
    }
    public function getExecucaoOrcamentaria($programacao_id){
        $financeiro_table = new Data_Model_DbTable_Financeiro();
        
        $financeiro = $financeiro_table->fetchRow('programacao_id='.$programacao_id);       
        if(!$financeiro){
            $return['programado']=0;
            $return['executado'] = 0;
            $return['saldo'] =0;
            return $return;        
        }
        $tabledespesas = new Data_Model_DbTable_Despesas();
        $select = $tabledespesas->select();
        $select->from('despesas','SUM(valor) AS valor');
        $despesas = $financeiro->findDependentRowset('Data_Model_DbTable_Despesas',null,$select);        
        $return = array();
        
        $return['programado']=$financeiro->valor  ? $financeiro->valor:0;
        $return['executado'] = $despesas->current()->valor ? $despesas->current()->valor :0;
        $return['saldo'] = (doubleval($financeiro->valor) - doubleval($despesas->current()->valor));
        
        return $return;
    }
}

