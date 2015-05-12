<?php

/**
 * Description of AnexoTags
 *
 * @author Marcone Costa
 */
class Data_Model_DbTable_AnexoTags extends Zend_Db_Table_Abstract{
    protected $_name = 'anexo_tags';
    protected $_dependentTables = ['Data_Model_DbTable_Anexos','Data_Model_DbTable_Tags'];
    
    protected $_referenceMap =  [
                'Anexo' =>  [ 'columns' => 'anexo_id', 
                                    'refTableClass' => 'Data_Model_DbTable_Anexos', 
                                    'refColumns' => 'id' ] ,
                'Tag' =>  [ 'columns' => 'tag_id', 
                                  'refTableClass' => 'Data_Model_DbTable_Tags', 
                                  'refColumns' => 'id' ]         
                ];


}
