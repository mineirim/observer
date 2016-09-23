<?php

class Data_Model_Despesas {

	/**
	 * @param $params
	 * @param $where
	 * @param null $relationships
	 * @return mixed
	 */
	public function getArray($params, $where = null, $relationships = false) {
		$despesas_table  = new Data_Model_DbTable_Despesas();
		$tableFinanceiro = new Data_Model_DbTable_Financeiro();
		$params['limit'] = '';
		$despesas        = $despesas_table->getOnePageOfOrderEntries($params, $where);
		$row             = $despesas['rows'][0];
		$financeiroRow   = $tableFinanceiro->fetchRow('id=' . $row['financeiro_id']);
		$programacaoRow  = $financeiroRow->findParentRow('Data_Model_DbTable_Programacoes');
		$identity        = Zend_Auth::getInstance()->getIdentity();
		if (!$identity->is_su && $programacaoRow->responsavel_usuario_id !== $identity->id) {
			return;
		}
		if (!$relationships) {
			return $despesas;
		}

		$rows = [];
		foreach ($despesas['rows'] as $despesa) {

			$rowFinanceiro = $tableFinanceiro->fetchRow('id=' . $despesa['financeiro_id']);
			$financeiro    = $rowFinanceiro ? $rowFinanceiro->toArray() : [];
			$row           = [
				'id' => $despesa['id'],
				'descricao' => $despesa['descricao'],
				'financeiro_id' => $despesa['financeiro_id'],
				'valor' => $despesa['valor'],
				'financeiro' => $financeiro,
			];

			$rows[] = $row;
		}
		$despesas['rows'] = $rows;
		return $despesas;
	}
}
