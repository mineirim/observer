<?php

class Data_Model_DbTable_Financeiro extends Etc_Model_AssignModel
{

    protected $_name = 'financeiro';
    
    protected $_dependentTables = ['Data_Model_DbTable_Despesas'];
    
    protected $_referenceMap =  [
                'Programacoes' =>  [ 'columns' => 'programacao_id', 
                                          'refTableClass' => 'Data_Model_DbTable_Programacoes', 
                                          'refColumns' => 'id' ],
        
                'Orcamento' =>  [ 'columns' => 'origem_recurso_id', 
                                          'refTableClass' => 'Data_Model_DbTable_Programacoes', 
                                          'refColumns' => 'id' ],
                'GrupoDespesas' =>  [ 'columns' => 'grupo_despesa_id', 
                                          'refTableClass' => 'Data_Model_DbTable_GrupoDespesas', 
                                          'refColumns' => 'id' ]
        ];
}

