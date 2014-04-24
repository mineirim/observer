<?php

class Data_Model_Financeiro
{
    private $_db_table;
    public function getFinanceiroDBTable(){
        if(!$this->_db_table)
            $this->_db_table = new Data_Model_DbTable_Financeiro();
        return $this->_db_table;
    }
    
    public function getArray($where=null, $order=null, $relationships=false){
        $financeiro_table = new Data_Model_DbTable_Financeiro();
        
        $financeiros = $financeiro_table->fetchAll($where, $order);       
        if(!$relationships){
            return $financeiros ? $financeiros->toArray():array();
        }       
        $instrumentos_model = new Data_Model_Instrumentos();
        $programacao_model = new Data_Model_Programacoes();
        
        $rows = array();
        foreach ($financeiros as $financeiro) {
            if($financeiro->origem_recurso_id!=null){
                $origem = $programacao_model->getRow("id=".$financeiro->origem_recurso_id);
                $origem_instrumentos = $instrumentos_model->getRecursiveParents($origem->instrumento_id);
            }
            $parents = array();
            if(isset($origem_instrumentos)){
                foreach ($origem_instrumentos as $instrumento){                
                    $parents[$instrumento->ix]['singular'] = $instrumento->singular;
                    $parents[$instrumento->ix]['menu'] = $origem->menu;
                    $origem = $origem->findParentRow('Data_Model_DbTable_Programacoes');                
                }
            }
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
                'valor_executado'   => $despesas->current()->valor,
                'parent_rows'       => $parents
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

