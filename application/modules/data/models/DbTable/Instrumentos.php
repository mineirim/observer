<?php

class Data_Model_DbTable_Instrumentos extends Etc_Model_AssignModel
{

    protected $_name = 'instrumentos';
    protected $_dependentTables = ['Data_Model_DbTable_Programacoes', 'Data_Model_DbTable_Instrumentos'];
        protected $_referenceMap =  [ 'Instrumentos' =>  [ 'columns' => 'instrumento_id', 
                                                          'refTableClass' => 'Data_Model_DbTable_Instrumentos', 
                                                          'refColumns' => 'id' ]         
                                        ];



}

