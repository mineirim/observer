<?php

class Data_Model_DbTable_Organizacoes extends Etc_Model_BaseModel
{
    
    protected $_rowsetClass ='Data_Model_DbTable_Rowset_Organizacoes';
    protected $_dependentTables = ['Data_Model_DbTable_ProjetosFinanciadores'];
    
    protected $_name = 'organizacoes';


}

