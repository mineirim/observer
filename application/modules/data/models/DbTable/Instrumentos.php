<?php

class Data_Model_DbTable_Instrumentos extends Zend_Db_Table_Abstract
{

    protected $_name = 'instrumentos';
    protected $_dependentTables = array('Data_Model_DbTable_Programacoes');


}

