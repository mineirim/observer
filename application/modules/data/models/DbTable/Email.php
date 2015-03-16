<?php

/**

 * @author marcone
 */

class Data_Model_DbTable_Email extends Zend_Db_Table_Abstract
{    
    protected $_referenceMap = array (
                'Usuarios' => array ( 'columns' => 'inclusao_usuario_id', 
                                'refTableClass' => 'Data_Model_DbTable_Usuarios', 
                                'refColumns' => 'id' )         
                );
    
    protected $_name = 'email';

    
    public function init() {
        parent::init();
        if (Zend_Auth::getInstance()->hasIdentity()){
            $this->_idUsuario = Zend_Auth::getInstance()->getStorage()->read()->id;
        }
    }
    public function insert(array $data) {
        $this->_data = $data;
        $this->_data['inclusao_usuario_id'] = $this->_idUsuario;
        return parent::insert($this->_data);
    }

    public function update(array $data, $where) {
        $this->_data = $data;
        $this->_data['alteracao_data'] = date('Y-m-d  H:i:s');
        return parent::update($this->_data, $where);
    }       
}

