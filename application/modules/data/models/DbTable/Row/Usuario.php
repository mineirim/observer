<?php

require_once ('Zend/Acl/Role/Interface.php');
require_once ('Zend/Db/Table/Row/Abstract.php');

/** 
 * @author marcone
 * 
 * 
 */
class Data_Model_DbTable_Row_Usuario extends Zend_Db_Table_Row_Abstract implements Zend_Acl_Role_Interface {
    public function getRoleId() {
            return $this->usuario;
    }

    public function  toArray() {
        $data = parent::toArray();
        unset ($data['senha']);
        unset ($data['salt']);
        return $data;
    }
}

?>