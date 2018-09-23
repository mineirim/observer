<?php

class Data_Model_Estatisticas {
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
	 * @return mixed
	 */
	public function getResumoMacro() {
		$sql  = 'SELECT id,menu , 100+id as vlr_alocado, 50+id AS vlr_executado FROM programacoes WHERE instrumento_id=2 ';
		$stmt = Zend_Registry::get('db')->query($sql);
		return $stmt->fetchAll();
	}
	/**
	 * retorna execução orçamentária dos filhos da programação selecionada
	 * @param $programacaoId
	 */
	public function getTotalPorNivel($parentProgramacaoId, $projetoId = null) {
		$where  = '';
		$params = false;
		if (!$parentProgramacaoId) {
			$programacaoWhere = '  t.programacao_id IS NULL';
		} else {
			$params           = [':programacaoId' => $parentProgramacaoId];
			$programacaoWhere = ' t.programacao_id=:programacaoId ';
		}
		if ($projetoId) {
			$params[':projetoId'] = $projetoId;
			$where                = ' AND (projeto_id=:projetoId) ';
		}
		/* @var $db \Zend_Db */
		$db  = Zend_Registry::get('db');
		$sql = 'WITH RECURSIVE tarefas AS (
                        SELECT tarefa.id AS parent_id, tarefa.id, tarefa.programacao_id , instrumento_id
                        FROM programacoes tarefa
                        WHERE  situacao_id<>2 ' . $where . '
                        UNION ALL
                        SELECT p.id, av.id, p.programacao_id, p.instrumento_id
                        FROM programacoes p INNER JOIN tarefas av ON p.id=av.programacao_id
                    )
                    SELECT  t.parent_id as id, p.menu, sum(f.valor_alocado) valor_alocado, sum(f.valor_executado) as valor_executado FROM tarefas t
                        INNER JOIN (SELECT f.id, f.programacao_id, f.origem_recurso_id, f.valor as valor_alocado, SUM(d.valor) as valor_executado
                                    FROM financeiro f LEFT OUTER JOIN despesas d ON d.financeiro_id=f.id
                                    WHERE f.origem_recurso_id IS NOT NULL
                                    GROUP BY f.id, f.programacao_id, f.origem_recurso_id
                                    ORDER BY f.id) as f ON t.id=f.programacao_id
                        INNER JOIN programacoes p ON t.parent_id=p.id
                    WHERE ' . $programacaoWhere . '
                    GROUP BY t.parent_id, p.menu
                    ORDER BY t.parent_id
        ';
		if ($params) {
			$stmt = $db->query($sql, $params);
		} else {
			$stmt = $db->query($sql);
		}
		$stmt->setFetchMode(Zend_Db::FETCH_ASSOC);
		$rows = $stmt->fetchAll();
		return $rows;
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
        
        public function fisicoPorAndamento($projetoId){
            $sql = 'SELECT a.descricao, count(1)
                    FROM public.programacoes p INNER JOIN situacoes s ON p.situacao_id=s.id
                    INNER JOIN operativos o ON p.id=o.programacao_id
                    INNER JOIN andamentos a ON o.andamento_id=a.id
                    WHERE p.situacao_id<>2 AND  (projeto_id=:projetoId)
                    GROUP BY a.descricao;';

		if ($projetoId) {
			$params[':projetoId'] = $projetoId;
		}
		/* @var $db \Zend_Db */
		$db  = Zend_Registry::get('db');  
		if ($params) {
			$stmt = $db->query($sql, $params);
		} else {
			$stmt = $db->query($sql);
		}
		$stmt->setFetchMode(Zend_Db::FETCH_ASSOC);
		$rows = $stmt->fetchAll();
		return $rows;                
        }
}
