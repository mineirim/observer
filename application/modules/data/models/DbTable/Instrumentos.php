<?php

class Data_Model_DbTable_Instrumentos extends Zend_Db_Table_Abstract
{

    protected $_name = 'instrumentos';
    protected $_dependentTables = array('Data_Model_DbTable_Programacoes', 'Data_Model_DbTable_Instrumentos');
        protected $_referenceMap = array ( 'Instrumentos' => array ( 'columns' => 'instrumento_id', 
                                                          'refTableClass' => 'Data_Model_DbTable_Instrumentos', 
                                                          'refColumns' => 'id' )         
                                        );



}

