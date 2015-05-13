<?php

/**
 * Description of AnexoTags
 *
 * @author Marcone Costa
 */
class Data_Model_DbTable_ProgramacaoAnexos  extends Zend_Db_Table_Abstract{
    protected $_name = 'programacao_anexos';
    protected $_dependentTables = ['Data_Model_DbTable_Anexos','Data_Model_DbTable_Programacoes'];
    
    protected $_referenceMap =  [
                'Anexo' =>  [ 'columns' => 'anexo_id', 
                                    'refTableClass' => 'Data_Model_DbTable_Anexos', 
                                    'refColumns' => 'id' ] ,
                'Programacao' =>  [ 'columns' => 'programacao_id', 
                                  'refTableClass' => 'Data_Model_DbTable_Programacoes', 
                                  'refColumns' => 'id' ]         
                ];


}
