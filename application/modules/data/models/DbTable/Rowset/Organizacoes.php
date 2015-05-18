<?php

/**
 * Description of Tags
 *
 * @author Marcone Costa
 */
class Data_Model_DbTable_Rowset_Organizacoes extends Zend_Db_Table_Rowset_Abstract
{
    /**
     * @return array the tags in an array
     */
    public function getAsArray()
    {
        $organizacoes = [];
 
        while ($this->valid()) {
            $organizacao = $this->current();
            $organizacoes[] = $organizacao->nome . ' - ' . $organizacao->sigla;  // the actual tag name
            $this->next();
        }
 
        $this->rewind();
 
        return $organizacoes;
    }
}
