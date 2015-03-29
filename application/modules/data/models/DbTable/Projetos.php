<?php

class Data_Model_DbTable_Projetos extends Zend_Db_Table_Abstract
{

    protected $_name = 'projetos';
    protected $_dependentTables = ['Data_Model_DbTable_Programacoes'];
    protected $_referenceMap =[
                'Supervisor' => [ 'columns' => 'supervisor_usuario_id', 
                                'refTableClass' => 'Data_Model_DbTable_Usuarios', 
                                'refColumns' => 'id' ]         
                ];
}

