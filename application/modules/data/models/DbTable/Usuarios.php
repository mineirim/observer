<?php

class Data_Model_DbTable_Usuarios extends My_DefaultModel
{

    protected $_name = 'usuarios';
    
    protected $_rowClass = "Data_Model_DbTable_Row_Usuario";
    protected $_dependentTables = array('Data_Model_DbTable_Programacoes');
	

    /**
     * Return one page of order entries
     *
     * @param int $page page number
     * @return Zend_Paginator Zend_Paginator
     */
    public function getOnePageOfOrderEntries($page=1, $itensPerPage=25, $where=null) {

        $query = $this->select();
        $query->where($where);
        $query->order('id');
        $paginator = new Zend_Paginator(
                new Zend_Paginator_Adapter_DbTableSelect($query)
        );
        $paginator->setItemCountPerPage($itensPerPage);
        $paginator->setCurrentPageNumber($page);
        
        return $paginator;
    }

}

