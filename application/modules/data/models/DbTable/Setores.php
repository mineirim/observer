<?php

class Data_Model_DbTable_Setores extends Zend_Db_Table_Abstract
{

    protected $_name = 'setores';
    protected $_dependentTables = array('Data_Model_DbTable_Programacoes');


}

