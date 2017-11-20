<?php

class Data_Model_Relatorios {
	private $_db_table;

	/**
	 *
	 * @return Data_Model_DbTable_Projetos
	 */
	public function getDBTable() {
		if (!$this->_db_table) {
			$this->_db_table = new Data_Model_DbTable_Relatorios();
		}
		return $this->_db_table;
	}
	/**
	 * @param $formData
	 * @return mixed
	 */
	public function insert($formData) {
		unset($formData['id']);
		foreach ($formData as $key => $value) {
			if ($value == '') {
				unset($formData[$key]);
			}
		}
		$id = $this->getDBTable()->insert($formData);
		$row = $this->getDBTable()->fetchRow("id=$id");
		return $row;
	}
	/**
	 * @param $formData
	 * @return mixed
	 */
	public function update($formData) {
		$id = $formData['id'];
		$fields = ['nome', 'configuracoes','publico'];
		$params = [];
		foreach ($fields as $field) {
			if (isset($formData[$field])) {
				$params[$field] = $formData[$field];
			}
		}
		foreach ($params as &$value) {
			if ($value == '') {
				$value = null;
			}
		}
		unset($formData['id']);
		$this->getDBTable()->update($params, ["id=?"=>$id]);
		$row = $this->getDBTable()->fetchRow(["id=?"=>$id]);
		return $row;
	}
        public function delete($id){
            return $this->getDBTable()->delete(["id=?"=>$id]);
        }

        public function showReport($id){
            
        }
        public function getAll(){
            return $this->getDBTable()->fetchAll();
        }
        public function find($id){
            die($id);
            return $this->getDBTable()->find($id);
        }
}
