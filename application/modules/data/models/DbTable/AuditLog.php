<?php

class Data_Model_DbTable_AuditLog extends Etc_Model_BaseModel {

    protected $_name = 'audit_log';    
    protected $_referenceMap = [
        'Usuario' => [ 'columns' => 'usuario_id',
            'refTableClass' => 'Data_Model_DbTable_Usuarios',
            'refColumns' => 'id']
    ];

}
