<?php

/**
 * trata as requisições de treelist
 *
 * @author marcone
 */
class My_Tree_Programacoes {
    public function __construct() {
        
    }
    public function getOrcamentoNodes(Zend_Db_Table_Row $programacao){
        $financeiro_table = $programacao->findDependentRowset('Data_Model_DbTable_Financeiro');
        
        $rows = array();
        foreach ($financeiro_table as  $financeiro ) {
            $grupoDespesa = $financeiro->findParentRow('Data_Model_DbTable_GrupoDespesas');
            $row = array('id' =>'financeiro-' . $financeiro->id, 'descricao' => $financeiro->descricao, 'menu'=> $grupoDespesa->descricao, 'leaf'=> true);
            $rows[] = $row;
        }   
        return $rows;
    }
}

?>
