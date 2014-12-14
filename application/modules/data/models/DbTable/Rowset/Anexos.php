<?php

/**
 * Description of Tags
 *
 * @author Marcone Costa
 */
class Data_Model_DbTable_Rowset_Anexos extends Zend_Db_Table_Rowset_Abstract
{
    /**
     * @return array the tags in an array
     */
    public function getAsArray()
    {
        $tags = array();
 
        while ($this->valid()) {
            $tag = $this->current();
            $tags[] = $tag->nome;  
            $this->next();
        }
 
        $this->rewind();
 
        return $tags;
    }
}
