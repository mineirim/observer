<?php

class Data_Model_DbTable_Operativos extends Etc_Model_AssignModel
{

    protected $_name = 'operativos';

    protected $_referenceMap = array (
                'Programacoes' => array ( 'columns' => 'programacao_id', 
                                                          'refTableClass' => 'Data_Model_DbTable_Programacoes', 
                                                          'refColumns' => 'id' ) );
}

