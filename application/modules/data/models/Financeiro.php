<?php

class Data_Model_Financeiro {
	private $_db_table;
	/**
	 * @return mixed
	 */
	public function getFinanceiroDBTable() {
		if (!$this->_db_table) {
			$this->_db_table = new Data_Model_DbTable_Financeiro();
		}

		return $this->_db_table;
	}

	/**
	 * @param $where
	 * @param null $order
	 * @param null $relationships
	 * @return mixed
	 */
	public function getArray($where = null, $order = null, $relationships = false) {
		$financeiro_table = new Data_Model_DbTable_Financeiro();

		$financeiros = $financeiro_table->fetchAll($where, $order);
		if (!$relationships) {
			return $financeiros ? $financeiros->toArray() : [];
		}
		$instrumentos_model = new Data_Model_Instrumentos();
		$programacao_model  = new Data_Model_Programacoes();

		$rows = [];
		foreach ($financeiros as $financeiro) {
			if ($financeiro->origem_recurso_id != null) {
				$origem              = $programacao_model->getRow('id=' . $financeiro->origem_recurso_id);
				$origem_instrumentos = $instrumentos_model->getRecursiveParents($origem->instrumento_id);
			}
			$parents = [];
			if (isset($origem_instrumentos)) {
				foreach ($origem_instrumentos as $instrumento) {
					$parents[$instrumento->ix]['singular'] = $instrumento->singular;
					$parents[$instrumento->ix]['menu']     = $origem->menu;
					$origem                                = $origem->findParentRow('Data_Model_DbTable_Programacoes');
				}
			}
			$tabledespesas = new Data_Model_DbTable_Despesas();
                        if(Data_Model_DbTable_Row_Operativo::checkPermission($financeiro->programacao_id)){
                            $despesas = $financeiro->findDependentRowset('Data_Model_DbTable_Despesas')->toArray();
                        }
			$select        = $tabledespesas->select();
			$select->from('despesas', 'SUM(valor) AS valor');
			$despesasSum          = $financeiro->findDependentRowset('Data_Model_DbTable_Despesas', null, $select);
			$tableGrupoDespesa = $financeiro->findParentRow('Data_Model_DbTable_GrupoDespesas');
			$grupoDespesa      = count($tableGrupoDespesa) > 0 ? $tableGrupoDespesa->toArray() : [];
			$row               = [
				'id' => $financeiro->id,
				'descricao' => $financeiro->descricao,
				'grupo_despesa_id' => $financeiro->grupo_despesa_id,
				'programacao_id' => $financeiro->programacao_id,
				'tipo_registro_id' => $financeiro->tipo_registro_id,
				'financeiro_id' => $financeiro->financeiro_id,
				'valor' => $financeiro->valor,
				'origem_recurso_id' => $financeiro->origem_recurso_id,
				'grupoDespesa' => $grupoDespesa,
				'valor_executado' => $despesasSum->current()->valor,
                                'despesas'=>$despesas,
				'parent_rows' => $parents,
			];

			$rows[] = $row;
		}
		return $rows;
	}
	/**
	 * @param $programacao_id
	 * @return mixed
	 */
	public function getExecucaoOrcamentaria($programacao_id) {
		$financeiro_table = new Data_Model_DbTable_Financeiro();

		$financeiro = $financeiro_table->fetchRow('programacao_id=' . $programacao_id);
		if (!$financeiro) {
			$return['programado'] = 0;
			$return['executado']  = 0;
			$return['saldo']      = 0;
			return $return;
		}
		$tabledespesas = new Data_Model_DbTable_Despesas();
		$select        = $tabledespesas->select();
		$select->from('despesas', 'SUM(valor) AS valor');
		$despesas = $financeiro->findDependentRowset('Data_Model_DbTable_Despesas', null, $select);
		$return   = [];

		$return['programado'] = $financeiro->valor ? $financeiro->valor : 0;
		$return['executado']  = $despesas->current()->valor ? $despesas->current()->valor : 0;
		$return['saldo']      = (doubleval($financeiro->valor) - doubleval($despesas->current()->valor));

		return $return;
	}

	/**
	 * @param int $projetoId
	 * @param int $programacaoId
	 */
	public function getTotalPorSistema($projetoId, $programacaoId) {
		/* @var $db \Zend_Db */
		$db      = Zend_Registry::get('db');
		$sistema = \Zend_Registry::get('sistema');
		$sql     = 'WITH RECURSIVE tarefas AS (
						SELECT tarefa.id AS parent_id, tarefa.id, tarefa.programacao_id , instrumento_id
						FROM programacoes tarefa
						WHERE tarefa.id IN (SELECT programacao_id FROM programacao_sistemas ps WHERE  ps.sistema_id=:sistemaId)
							AND projeto_id=:projetoId
						UNION ALL
						SELECT p.id, av.id, p.programacao_id, p.instrumento_id
						FROM programacoes p INNER JOIN tarefas av ON p.id=av.programacao_id
					)
					SELECT t.parent_id, sum(f.valor) valor_alocado FROM tarefas t  INNER JOIN financeiro f ON t.id=f.programacao_id
					WHERE t.parent_id=:programacaoId
					GROUP BY t.parent_id
					ORDER BY t.parent_id
					';
		$stmt = $db->query($sql, [':sistemaId' => $sistema->id, ':projetoId' => $projetoId, ':programacaoId' => $programacaoId]);
		$stmt->setFetchMode(Zend_Db::FETCH_OBJ);
		$row = $stmt->fetch();
		return $row->valor_alocado;
	}


}
