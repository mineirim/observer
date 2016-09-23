<?php

class Data_Model_DbTable_Operativos extends Etc_Model_AssignModel {

	/**
	 * @var string
	 */
	protected $_name = 'operativos';
	/**
	 * @var string
	 */
	protected $_rowClass = 'Data_Model_DbTable_Row_Operativo';
	/**
	 * @var array
	 */
	protected $_dependentTables = ['Data_Model_DbTable_OperativosHistorico'];
	/**
	 * @var array
	 */
	protected $_referenceMap = [
		'Programacoes' => ['columns' => 'programacao_id',
			'refTableClass' => 'Data_Model_DbTable_Programacoes',
			'refColumns' => 'id']];

	/**
	 * @param array $data
	 */
	public function insert(array $data) {
		$data['avaliacao_andamento'] = Data_Model_DatabaseStringFormat::removeStringFontFormat($data['avaliacao_andamento']);
		return parent::insert($data);
	}
	/**
	 * @param array $data
	 * @param $where
	 * @return mixed
	 */
	public function update(array $data, $where) {
		$historico_table = new Data_Model_DbTable_OperativosHistorico();
		$currents        = $this->fetchAll($where);

		$this->getAdapter()->beginTransaction();
		foreach ($currents as $operativo) {
			$current_array                 = $operativo->toArray();
			$current_array['operativo_id'] = $current_array['id'];
			unset($current_array['id']);
			$historico_table->insert($current_array);
		}
		$this->_data                         = $data;
		$this->_data['avaliacao_andamento']  = Data_Model_DatabaseStringFormat::removeStringFontFormat($this->_data['avaliacao_andamento']);
		$this->_data['alteracao_usuario_id'] = $this->_idUsuario;
		$this->_data['alteracao_data']       = @date('Y-m-d  H:i:s');
		$return                              = parent::update($this->_data, $where);
		$this->getAdapter()->commit();
		return $return;
	}
}
