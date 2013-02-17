<?php

class Data_Model_DbTable_Financeiro extends Etc_Model_AssignModel
{

    protected $_name = 'financeiro';
    
    protected $_referenceMap = array (
                'Programacoes' => array ( 'columns' => 'programacao_id', 
                                          'refTableClass' => 'Data_Model_DbTable_Programacoes', 
                                          'refColumns' => 'id' ),
        
                'Orcamento' => array ( 'columns' => 'origem_recurso_id', 
                                          'refTableClass' => 'Data_Model_DbTable_Programacoes', 
                                          'refColumns' => 'id' ),
                'GrupoDespesas' => array ( 'columns' => 'grupo_despesa_id', 
                                          'refTableClass' => 'Data_Model_DbTable_GrupoDespesas', 
                                          'refColumns' => 'id' )
        );
}

