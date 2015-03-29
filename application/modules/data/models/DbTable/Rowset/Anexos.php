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
        $anexos = array();
        $i=0;
        while ($this->valid()) {
            $anexo = $this->current();
            $arr_anexo = $anexo->toArray();
            $arr_anexo['usuario'] =$anexo->findParentRow('Data_Model_DbTable_Usuarios')->nome;
            $tags =[];
            foreach ($anexo->getTags() as $tag){
                $tags[] =$tag->tag;
            }
            $arr_anexo['tags'] = '(' . implode(', ', $tags) . ')';
            
            $anexos[] = $arr_anexo;  
            $this->next();
        }
        $this->rewind();
        return $anexos;
    }
    
}
