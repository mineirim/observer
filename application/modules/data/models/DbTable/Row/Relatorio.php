<?php

require_once ('Zend/Db/Table/Row/Abstract.php');

/**
 * Description of Anexo
 *
 * @author marcone
 */
class Data_Model_DbTable_Row_Relatorio  extends Zend_Db_Table_Row_Abstract {

    public function toArray() {
        $data = parent::toArray();
        $data['configuracoes']= json_decode($data['configuracoes']);
        return $data;
    } 
}
