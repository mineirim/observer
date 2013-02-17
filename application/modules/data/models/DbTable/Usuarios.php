<?php

class Data_Model_DbTable_Usuarios extends Etc_Model_AssignModel
{

    protected $_name = 'usuarios';
    
    protected $_rowClass = "Data_Model_DbTable_Row_Usuario";
    protected $_dependentTables = array('Data_Model_DbTable_Programacoes');
	


}

