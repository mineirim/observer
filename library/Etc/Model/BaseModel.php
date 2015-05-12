<?php

/**
 * Description of DefaultModel
 *
 * @author Marcone Costa
 */
class Etc_Model_BaseModel extends Zend_Db_Table_Abstract {

    //put your code here
    protected $_idUsuario;
    protected $_data;

    public function init() {
        parent::init();
        if (Zend_Auth::getInstance()->hasIdentity()){
            $this->_idUsuario = Zend_Auth::getInstance()->getStorage()->read()->id;
        }
    }

    /**
     * Return one page of order entries
     *
     * @param int $page page number
     * @return Zend_Paginator Zend_Paginator
     */
    public function getOnePageOfOrderEntries($params, $where=null) {

        $pageNumber = $params['page'];
        if (empty($pageNumber)) { $pageNumber = 1; }

        $limit = $params['limit'];
        if (empty($limit)) { $limit = null; }

        if (!isset($params['sort'])) { 
            $sort = 'id'; }
        else{  
            $sort = $params['sort'].' '.$params['dir'];
        }              
        
        $query = $this->select();
        if($where){
            $query->where($where);
        }
        $query->order($sort);
        $paginator = new Zend_Paginator(
                new Zend_Paginator_Adapter_DbTableSelect($query)
        );
        $paginator->setItemCountPerPage($limit);
        $paginator->setCurrentPageNumber($pageNumber);
        
        $rows = array();
        foreach ($paginator as $record){
            $rows[]= $record->toArray();
        }
        $page = array('rows' => $rows, 
                      'total'=> $paginator->getTotalItemCount());
        return $page;
    }
}

