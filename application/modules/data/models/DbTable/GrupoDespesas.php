<?php

class Data_Model_DbTable_GrupoDespesas extends Zend_Db_Table_Abstract
{

    protected $_name = 'grupo_despesas';
    protected $_dependentTables = array('Data_Model_DbTable_Financeiro');
}

