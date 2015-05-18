<?php

require_once ('Zend/Db/Table/Row/Abstract.php');

/**
 * Description of Anexo
 *
 * @author marcone
 */
class Data_Model_DbTable_Row_Projeto  extends Zend_Db_Table_Row_Abstract {
    private $_financiadores;
    /**
     * @return Data_Model_DbTable_Rowset_Organizacoes
     */
    public function getFinanciadores()
    {
        if (!$this->_financiadores) {
            $this->_financiadores = $this->findManyToManyRowset(
                'Data_Model_DbTable_Organizacoes',   // match table
                'Data_Model_DbTable_ProjetosFinanciadores');  // join table
        }
 
        return $this->_financiadores;
    }
}
