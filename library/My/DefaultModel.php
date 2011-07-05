<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of DefaultModel
 *
 * @author ps00287
 */
class My_DefaultModel extends Zend_Db_Table_Abstract {

    //put your code here
    protected $_idUsuario;
    private $_data;

    public function init() {
        parent::init();
        $this->_idUsuario = Zend_Auth::getInstance()->getStorage()->read()->id;
    }

    public function insert(array $data) {
        $this->_data = $data;
        $this->_data['inclusao_usuario_id'] = $this->_idUsuario;
        return parent::insert($this->_data);
    }

    public function update(array $data, $where) {
        $this->_data = $data;
        $this->_data['alteracao_usuario_id'] = $this->_idUsuario;
        $this->_data['alteracao_data'] = @date('Y-m-d');
        return parent::update($this->_data, $where);
    }   

}

