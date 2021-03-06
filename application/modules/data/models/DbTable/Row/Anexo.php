<?php

require_once ('Zend/Db/Table/Row/Abstract.php');

/**
 * Description of Anexo
 *
 * @author marcone
 */
class Data_Model_DbTable_Row_Anexo  extends Zend_Db_Table_Row_Abstract {
    private $_tags;
    /**
     * @return Data_Model_DbTable_Rowset_Tags
     */
    public function getTags()
    {
        if (!$this->_tags) {
            $this->_tags = $this->findManyToManyRowset(
                'Data_Model_DbTable_Tags',   // match table
                'Data_Model_DbTable_AnexoTags');  // join table
        }
 
        return $this->_tags;
    }
}
