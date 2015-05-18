<?php

class Data_Model_DbTable_Projetos extends Etc_Model_AssignModel {

    protected $_name = 'projetos';    
    protected $_rowClass = 'Data_Model_DbTable_Row_Projeto';
    protected $_rowsetClass ='Data_Model_DbTable_Rowset_Projetos';
    protected $_dependentTables = ['Data_Model_DbTable_Programacoes','Data_Model_DbTable_ProjetosFinanciadores'];
    protected $_referenceMap = [
        'Supervisor' => [ 'columns' => 'supervisor_usuario_id',
            'refTableClass' => 'Data_Model_DbTable_Usuarios',
            'refColumns' => 'id']
    ];

}
