<?php

/**
 * Description of DefaultModel
 *
 * @author Marcone Costa
 */
class Etc_Model_AssignModel extends Etc_Model_BaseModel {

    //put your code here
    protected $_idUsuario;
    protected $_data;
    
    public function init() {
        parent::init();
        if (Zend_Auth::getInstance()->hasIdentity()) {
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
        parent::update($this->_data, $where);
        $this->_data['alteracao_usuario_id'] = $this->_idUsuario;
        $this->_data['alteracao_data'] = date('Y-m-d  H:i:s');
        return parent::update($this->_data, $where);
    }   

}

