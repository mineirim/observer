<?php

class Data_Model_DbTable_OperativosHistorico extends Zend_Db_Table_Abstract {

	/**
	 * @var string
	 */
	protected $_name = 'operativos_historico';
	/**
	 * @var string
	 */
	protected $_rowClass = 'Data_Model_DbTable_Row_Operativo';
	/**
	 * @var array
	 */
	protected $_referenceMap = [
		'Programacoes' => ['columns' => 'programacao_id',
			'refTableClass' => 'Data_Model_DbTable_Programacoes',
			'refColumns' => 'id'],
		'Operativos' => ['columns' => 'operativo_id',
			'refTableClass' => 'Data_Model_DbTable_Operativos',
			'refColumns' => 'id']];

	/**
	 * Return one page of order entries
	 *
	 * @param int $page page number
	 * @return Zend_Paginator Zend_Paginator
	 */
	public function getOnePageOfOrderEntries($params, $where = null) {

		$pageNumber = isset($params['page']) ? $params['page'] : 1;
		if (empty($pageNumber)) {$pageNumber = 1;}

		$limit = isset($params['limit']) ? $params['limit'] : null;
		if (empty($limit)) {$limit = null;}

		if (!isset($params['sort'])) {
			$sort = 'id';
		} else {
			$sort = $params['sort'] . ' ' . $params['dir'];
		}

		$query = $this->select();
		if ($where) {
			$query->where($where);
		}
		$query->order($sort);
		$paginator = new Zend_Paginator(
			new Zend_Paginator_Adapter_DbTableSelect($query)
		);
		$paginator->setItemCountPerPage($limit);
		$paginator->setCurrentPageNumber($pageNumber);

		$rows = [];
		foreach ($paginator as $record) {
			$rows[] = $record->toArray();
		}
		$page = ['rows' => $rows,
			'total' => $paginator->getTotalItemCount()];
		return $page;
	}

}
