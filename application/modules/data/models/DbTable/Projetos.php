<?php

class Data_Model_DbTable_Projetos extends Etc_Model_AssignModel {

    protected $_name = 'projetos';    
    protected $_rowClass = 'Data_Model_DbTable_Row_Projeto';
    protected $_rowsetClass ='Data_Model_DbTable_Rowset_Projetos';
    protected $_dependentTables = ['Data_Model_DbTable_Programacoes','Data_Model_DbTable_ProjetosFinanciadores'];
    protected $_referenceMap = [
        'Supervisor' => [ 'columns' => 'supervisor_usuario_id',
            'refTableClass' => 'Data_Model_DbTable_Usuarios',
            'refColumns' => 'id']
    ];

	/**
	 * @param $data
	 * @param $where
	 * @return mixed
	 */
	public function update(array $data, $where) {
		if(isset($data['propriedades'])){
			$data['propriedades']= json_encode($data['propriedades']);

		}
		return parent::update($data, $where);
	}
	/**
	 * @param $data
	 * @return mixed
	 */
	public function insert(array $data) {
		if(isset($data['propriedades'])){
			$data['propriedades']= json_encode($data['propriedades']);

		}            
		return parent::insert($data);
	}
}
