<?php

class Data_Model_DbTable_Despesas extends Etc_Model_AssignModel
{

    protected $_name = 'despesas';

    protected $_referenceMap =  [
                'Financeiro' =>  [ 'columns' => 'financeiro_id', 
                                          'refTableClass' => 'Data_Model_DbTable_Financeiro', 
                                          'refColumns' => 'id' ]
        ];
}

