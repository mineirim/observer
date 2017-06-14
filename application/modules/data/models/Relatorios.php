<?php

class Data_Model_Relatorios {
	private $_db_table;
	/**
	 *
	 * @param int $projeto_id
	 * @return Data_Model_DbTable_Rowset_Organizacoes
	 */
	public function getFinanciadores($projeto_id) {
		$projetosTable = new Data_Model_DbTable_Projetos();
		/* @var $projeto Data_Model_DbTable_Row_Projeto */
		$projeto = $projetosTable->fetchRow('id=' . $projeto_id);
		return $projeto->getFinanciadores();
	}
	/**
	 *
	 * @return Data_Model_DbTable_Projetos
	 */
	public function getRelatoriosDBTable() {
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
		$id = $formData['id'];
		unset($formData['id']);
		$this->getDBTable()->update($params, "id=$id");
		$row = $this->getDBTable()->fetchRow("id=$id");
		return $row;
	}

        public function showReport($id){
            
        }
        public function getAll(){
            return $this->getRelatoriosDBTable()->fetchAll();
        }
        public function find($id){
            return $this->getRelatoriosDBTable()->find($id);
        }
}
