<?php

/**
 * Description of Tags
 *
 * @author Marcone Costa
 */
class Data_Model_DbTable_Rowset_Relatorios extends Zend_Db_Table_Rowset_Abstract
{
    /**
     * @return array the tags in an array
     */
    public function getAsArray()
    {
        
        $this->_auth = Zend_Auth::getInstance();
        $identity    = $this->_auth->getIdentity();
        $relatorios = [];
        while ($this->valid()) {
            /* @var $relatorio Data_Model_DbTable_Row_Relatorio */
            $relatorio = $this->current();
            $owner = $relatorio->findParentRow('Data_Model_DbTable_Usuarios');
            $arr_relatorio = $relatorio->toArray();
            $arr_relatorio['usuario'] = $owner->toArray();
            $arr_relatorio['canEdit'] = $identity->is_su || $identity->id==$owner->id;
            $relatorios[] = $arr_relatorio;  
            $this->next();
        }
        $this->rewind();
        return $relatorios;
    }
    
}
