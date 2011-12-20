<?php

class Data_Model_DbTable_Financeiro extends My_DefaultModel
{

    protected $_name = 'financeiro';
    
    protected $_referenceMap = array (
                'Programacoes' => array ( 'columns' => 'programacao_id', 
                                          'refTableClass' => 'Data_Model_DbTable_Programacoes', 
                                          'refColumns' => 'id' ),
        
                'GrupoDespesas' => array ( 'columns' => 'grupo_despesa_id', 
                                          'refTableClass' => 'Data_Model_DbTable_GrupoDespesas', 
                                          'refColumns' => 'id' )
        );
}

