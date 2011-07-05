<?php

class Data_Model_DbTable_Anexos extends Zend_Db_Table_Abstract
{

    protected $_name = 'anexos';
    private $_idUsuario = null;
    private $_data = null;
    
   public function init() {
        parent::init();
        $this->_idUsuario = Zend_Auth::getInstance()->getStorage()->read()->id;
    }


    public function update(array $data, $where) {
        $this->_data = $data;
        $this->_data['alteracao_usuario_id'] = $this->_idUsuario;
        $this->_data['alteracao_data'] = @date('Y-m-d');
        return parent::update($this->_data, $where);
    }   
    
    

}

