<?php

class Data_Model_DbTable_Anexos extends Etc_Model_BaseModel
{
    protected $_dependentTables = array('Data_Model_DbTable_AnexoTags');
    
    protected $_referenceMap = array (
                'Usuarios' => array ( 'columns' => 'inclusao_usuario_id', 
                                'refTableClass' => 'Data_Model_DbTable_Usuarios', 
                                'refColumns' => 'id' )         
                );
    
    protected $_name = 'anexos';
    protected $_rowClass = 'Data_Model_DbTable_Row_Anexo';
    protected $_rowsetClass ='Data_Model_DbTable_Rowset_Anexos';
    
}

