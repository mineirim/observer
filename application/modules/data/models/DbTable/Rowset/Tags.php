<?php

/**
 * Description of Tags
 *
 * @author Marcone Costa
 */
class Data_Model_DbTable_Rowset_Tags extends Zend_Db_Table_Rowset_Abstract
{
    /**
     * @return array the tags in an array
     */
    public function getAsArray()
    {
        $tags = [];
 
        while ($this->valid()) {
            $tag = $this->current();
            $tags[] = $tag->tag;  // the actual tag name
            $this->next();
        }
 
        $this->rewind();
 
        return $tags;
    }
}
