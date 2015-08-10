<?php

/**
 *
 * @author Marcone Costa
 */
class Data_Model_DbTable_Rowset_Setores extends Zend_Db_Table_Rowset_Abstract
{
    /**
     * @return array the tags in an array
     */
    public function getAsArray()
    {
        $setores = [];
 
        while ($this->valid()) {
            $setor = $this->current();
            $setores[] = $setor->id;  
            $this->next();
        }
 
        $this->rewind();
 
        return $setores;
    }
}
