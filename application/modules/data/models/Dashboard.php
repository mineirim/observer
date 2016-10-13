<?php

class Data_Model_Dashboard {
	/**
	 * @param $projetoId
	 * @return mixed
	 */
	public function getUseByDay($startDate = null, $endDate = null) {
		if (!$startDate) {
			$startDate = date('Y-m-d', strtotime('-250 days'));
		}
		if (!$endDate) {
			$endDate = date('Y-m-d');
		}
		$sql = "SELECT
				to_char(alteracao_data,'DD/MM/YYYY') AS data_alteracao, to_date(to_char(alteracao_data,'YYYY-MM-DD'),'YYYY-MM-DD') as orderdate,
				 count(DISTINCT programacao_id) total
			FROM
				operativos_historico
			WHERE alteracao_data between :startDate and :endDate
			GROUP BY data_alteracao,orderdate
			ORDER BY orderdate";
		$stmt = Zend_Registry::get('db')->query($sql, ['startDate' => $startDate, 'endDate' => $endDate]);
		return $stmt->fetchAll();
	}

	/**
	 * retorna execução orçamentária dos filhos da programação selecionada
	 * @param $programacaoId
	 */
	public function somaGrupoDespesas($projetoId=false) {
		$where  = '';
		$params = [];
		if ($projetoId) {
			$params[':projetoId'] = $projetoId;
			$where                = ' AND (projeto_id=:projetoId) ';
		}
		/* @var $db \Zend_Db */
		$db  = Zend_Registry::get('db');
		$sql = 'WITH RECURSIVE tarefas AS (
                        SELECT tarefa.id AS parent_id, tarefa.id, tarefa.programacao_id , instrumento_id
                        FROM programacoes tarefa
                        WHERE  situacao_id<>2  ' . $where . '
                        UNION ALL
                        SELECT p.id, av.id, p.programacao_id, p.instrumento_id
                        FROM programacoes p INNER JOIN tarefas av ON p.id=av.programacao_id
                    )
                    SELECT f.prog_id, f.origem_recurso, sum(f.valor_alocado) valor_alocado, sum(f.valor_executado) as valor_executado FROM tarefas t
                        INNER JOIN (SELECT f.id, f.descricao,o.id prog_id, o.menu origem_recurso,f.programacao_id, f.origem_recurso_id, f.valor as valor_alocado, SUM(d.valor) as valor_executado
                                    FROM financeiro f LEFT OUTER JOIN despesas d ON d.financeiro_id=f.id
                                    INNER JOIN programacoes o ON f.origem_recurso_id=o.id
                                    WHERE f.origem_recurso_id IS NOT NULL
                                    GROUP BY f.id,f.descricao,o.id, o.menu, f.programacao_id, f.origem_recurso_id,f.valor
                                    ORDER BY f.id) as f ON t.id=f.programacao_id
                        INNER JOIN programacoes p ON t.parent_id=p.id
                    WHERE t.programacao_id IS NULL
                    GROUP BY f.prog_id, f.origem_recurso
                    ORDER BY f.origem_recurso;
        ';
		if ($params) {
			$stmt = $db->query($sql, $params);
		} else {
			$stmt = $db->query($sql);
		}
		$stmt->setFetchMode(Zend_Db::FETCH_ASSOC);
		$rows    = $stmt->fetchAll();
		$retorno = [
			// 'programado' => ['key' => 'Valor Programado', 'values' => []],
			// 'executado' => ['key' => 'Valor Executado', 'values' => []],
		];
		foreach ($rows as $row) {
			$retorno[]= ['id'=>  $row['prog_id'], 'label' => $row['origem_recurso'], 'valor_alocado' =>(float) $row['valor_alocado'], 'valor_executado'=>(float) $row['valor_executado']];
			// $retorno['executado']['values'][]  = ['id'=>  $row['prog_id'],'label' => $row['origem_recurso'], 'valor' =>(float) $row['valor_executado']];
		}
		return $retorno;
	}
	/**
	 * @param $params
	 * @param $where
	 * @param null $relationships
	 * @return mixed
	 */
	public function getArray($params, $where = null, $relationships = false) {
		$despesas_table  = new Data_Model_DbTable_Despesas();
		$params['limit'] = '';
		$despesas        = $despesas_table->getOnePageOfOrderEntries($params, $where);
		if (!$relationships) {
			return $despesas;
		}

		$rows            = [];
		$tableFinanceiro = new Data_Model_DbTable_Financeiro();
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
