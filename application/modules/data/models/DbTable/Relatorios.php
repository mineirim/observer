<?php
class Data_Model_DbTable_Relatorios extends Etc_Model_AssignModel {

	protected $_name            = 'relatorios';
	protected $_rowClass        = 'Data_Model_DbTable_Row_Relatorio';
	protected $_referenceMap = [
		'Usuarios' => ['columns' => 'responsavel_usuario_id',
			'refTableClass' => 'Data_Model_DbTable_Usuarios',
			'refColumns' => 'id']
	];

	/**
	 * @param $data
	 * @param $where
	 * @return mixed
	 */
	public function update(array $data, $where) {
		if(isset($data['configuracoes'])){
			$data['configuracoes']= json_encode($data['configuracoes']);

		}
		return parent::update($data, $where);
	}
	/**
	 * @param $data
	 * @return mixed
	 */
	public function insert(array $data) {
                if(isset($data['configuracoes'])){
			 $data['configuracoes']= json_encode($data['configuracoes']);
		}
		return parent::insert($data);
	}
}
