<?php

class Data_Model_Projetos {
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
	public function getProjetosDBTable() {
		if (!$this->_db_table) {
			$this->_db_table = new Data_Model_DbTable_Projetos();
		}
		return $this->_db_table;
	}
	/**
	 * @param $formData
	 * @return mixed
	 */
	public function insert($formData) {
		unset($formData['id']);
		if (isset($formData['financiadores_ids'])) {
			$financiadores_ids = split(',', $formData['financiadores_ids']);
			unset($formData['financiadores_ids']);
		} else {
			$financiadores_ids = [];
		}
		$formData['data_inicio'] = $this->formatDate($formData['data_inicio']);
		$formData['data_fim']    = $this->formatDate($dataFim);

		foreach ($formData as $key => $value) {
			if ($value == '') {
				unset($formData[$key]);
			}
		}
		$id = $this->getProjetosDBTable()->insert($formData);
		$this->updateFinanciadores($id, $financiadores_ids);
		$row = $this->getProjetosDBTable()->fetchRow("id=$id");
		return $row;
	}
	/**
	 * verifica o formato de entrada da data e devolve no formato para salvar no banco
	 */
	private function formatDate($date) {
		if ($date === '' || !$date) {
			return;
		}

		if (DateTime::createFromFormat('Y-m-d', $date)) {
			$formatedDate = $date;
		} else {
			$tmpDt        = DateTime::createFromFormat('d/m/Y', $date);
			$formatedDate = $tmpDt->format('Y-m-d');
		}
		return $formatedDate;
	}
	/**
	 * @param $formData
	 * @return mixed
	 */
	public function update($formData) {
		$fields = ['nome', 'data_inicio', 'data_fim', 'coordenador_usuario_id', 'apresentacao', 'metas', 'objetivos', 'codigo'];
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
		if (isset($formData['financiadores_ids'])) {
			$financiadores_ids = split(',', $formData['financiadores_ids']);
			unset($formData['financiadores_ids']);
		} else {
			$financiadores_ids = [];
		}
		$this->getProjetosDBTable()->update($params, "id=$id");
		$row = $this->getProjetosDBTable()->fetchRow("id=$id");
		$this->updateFinanciadores($id, $financiadores_ids);
		return $row;
	}
	/**
	 * @param $projeto_id
	 * @param $organizacoes_ids
	 */
	public function updateFinanciadores($projeto_id, $organizacoes_ids) {
		$financiadoresTable = new Data_Model_DbTable_ProjetosFinanciadores;
		if (count($organizacoes_ids) == 0) {
			$financiadoresTable->delete('projeto_id=' . $projeto_id);
		} else {
			$financiadoresTable->delete('projeto_id=' . $projeto_id . ' AND organizacao_id NOT IN (' . implode(',', $organizacoes_ids) . ')');
		}
		foreach ($organizacoes_ids as $organizacao_id) {
			if (!$financiadoresTable->fetchRow('projeto_id=' . $projeto_id . ' AND organizacao_id =' . $organizacao_id)) {
				$financiadoresTable->insert(['projeto_id' => $projeto_id, 'organizacao_id' => $organizacao_id]);
			}
		}
	}
	/**
	 * @param $where
	 */
	public function getProjetos($where = null) {
		$projetosTable = new Data_Model_DbTable_Projetos();
		$rows          = $projetosTable->fetchAll($where, 'nome');
		return $rows;
	}

	/**
	 * @param $projeto
	 * @return mixed
	 */
	public function totalPorSistema($projetoId) {
		$total             = 0.0;
		$sistema           = \Zend_Registry::get('sistema');
		$financeiroDbTable = new Data_Model_DbTable_Financeiro();
		$where             = ' programacao_id IN (SELECT p.id
                          FROM programacoes p INNER JOIN programacao_sistemas ps on p.id=ps.programacao_id
                          WHERE ps.sistema_id=' . $sistema->id . ' AND projeto_id=' . $projetoId . ') ';

		$rowset = $financeiroDbTable->fetchAll($where);
		foreach ($rowset as $key => $financeiro) {
			$total = $total + $financeiro->valor;
		}
		return $total;
	}

	/**
	 * @param $id
	 * @return array
	 */
	public function getProjeto($id) {
		$projetosTable = new Data_Model_DbTable_Projetos();
		$projetoRow    = $projetosTable->find($id);
		return $projetoRow->current()->toArray();
	}
}
