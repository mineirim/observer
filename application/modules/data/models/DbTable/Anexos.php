<?php

class Data_Model_DbTable_Anexos extends Etc_Model_AssignModel
{
    protected $_dependentTables = ['Data_Model_DbTable_AnexoTags', 'Data_Model_DbTable_ProgramacaoAnexos' ];
    
    protected $_referenceMap =  [
                'Usuarios' =>  [ 'columns' => 'inclusao_usuario_id', 
                                'refTableClass' => 'Data_Model_DbTable_Usuarios', 
                                'refColumns' => 'id' ]         
                ];
    
    protected $_name = 'anexos';
    protected $_rowClass = 'Data_Model_DbTable_Row_Anexo';
    protected $_rowsetClass ='Data_Model_DbTable_Rowset_Anexos';
    
}

