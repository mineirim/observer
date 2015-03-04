<?php

require_once ('Zend/Db/Table/Row/Abstract.php');

/**
 * Description of Anexo
 *
 * @author marcone
 */
class Data_Model_DbTable_Row_Programacao  extends Zend_Db_Table_Row_Abstract {
    /**
     * @return Data_Model_DbTable_Rowset_Anexos
     */
    public function getAnexos()
    {
            $anexos = $this->findManyToManyRowset(
                'Data_Model_DbTable_Anexos',   // match table
                'Data_Model_DbTable_ProgramacaoAnexos');  // join table
        return $anexos;
    }
    
    /**
     * 
     * @return Data_Model_DbTable_Instrumentos
     */
    public function getInstrumento(){
        return $this->findParentRow('Data_Model_DbTable_Instrumentos');
    }
}
