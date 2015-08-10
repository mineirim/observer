<?php

require_once ('Zend/Acl/Role/Interface.php');
require_once ('Zend/Db/Table/Row/Abstract.php');

/**
 * @author marcone
 * 
 * 
 */
class Data_Model_DbTable_Row_Usuario extends Zend_Db_Table_Row_Abstract implements Zend_Acl_Role_Interface {

    private $_setores = null;

    public function getRoleId() {
        return $this->usuario;
    }

    public function toArray() {
        $data = parent::toArray();
        unset($data['senha']);
        unset($data['salt']);
        $data['setores'] = $this->getSetores();
        return $data;
    }

    /**
     * @return Data_Model_DbTable_Rowset_Setores
     */
    public function getSetores() {
        if (!$this->_setores) {
            $this->_setores = $this->findManyToManyRowset(
                    'Data_Model_DbTable_Setores', // match table
                    'Data_Model_DbTable_UsuariosSetores');  // join table
        }
        $setores = [];
 
        while ($this->_setores->valid()) {
            $setor = $this->_setores->current();
            $setores[] = $setor->id;  
            $this->_setores->next();
        }
 
        $this->_setores->rewind();
 
        return $setores;
    }

}
