<?php

class Data_Model_DbTable_Usuarios extends My_DefaultModel
{

    protected $_name = 'usuarios';
    
    protected $_rowClass = "Data_Model_DbTable_Row_Usuario";
    protected $_dependentTables = array('Data_Model_DbTable_Programacoes');
	


}

