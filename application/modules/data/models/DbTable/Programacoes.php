<?php

class Data_Model_DbTable_Programacoes extends Etc_Model_AssignModel
{

    protected $_name = 'programacoes';
    protected $_rowClass = 'Data_Model_DbTable_Row_Programacao';
    protected $_dependentTables = array('Data_Model_DbTable_Programacoes','Data_Model_DbTable_Operativos', 'Data_Model_DbTable_Financeiro', 'Data_Model_DbTable_ProgramacaoAnexos');
    
    protected $_referenceMap = array (
                'Usuarios' => array ( 'columns' => 'responsavel_usuario_id', 
                                'refTableClass' => 'Data_Model_DbTable_Usuarios', 
                                'refColumns' => 'id' ) ,
                'Setores' => array ( 'columns' => 'setor_id', 
                                'refTableClass' => 'Data_Model_DbTable_Setores', 
                                'refColumns' => 'id' ),
                'Instrumentos' => array ( 'columns' => 'instrumento_id', 
                                'refTableClass' => 'Data_Model_DbTable_Instrumentos', 
                                'refColumns' => 'id' ),
                'Parent' => array ( 'columns' => 'programacao_id', 
                                'refTableClass' => 'Data_Model_DbTable_Programacoes', 
                                'refColumns' => 'id' )         
                );


}

