<?php

class Data_Model_DbTable_Setores extends Etc_Model_AssignModel
{

    protected $_name = 'setores';
    protected $_dependentTables = ['Data_Model_DbTable_Programacoes','Data_Model_DbTable_UsuariosSetores'];


}

