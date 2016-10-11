<?php
/**
 * Description of Tarefas
 *
 * @author marcone
 */
class Data_Model_Tarefas {
	/**
	 * @var Data_Model_DbTable_Programacoes
	 */
	private $_dbTableProgramacoes;
	public function __construct() {
		$this->_dbTableProgramacoes = new Data_Model_DbTable_Programacoes();
		$this->_auth                = Zend_Auth::getInstance();
	}
	/**
	 *
	 * @param type $column coluna do filtro (reponsavel_id ou supervisor_id)
	 * @param type $all
	 * @return type
	 */
	public function getBy($column, $pWhere = false, $all = false, $order = 'p.ordem ASC') {
		$identity = $this->_auth->getIdentity();
		$where    = ' instrumento_id=6 and p.situacao_id <>2';
		$where .= ' AND ' . $column . '=' . $identity->id;
		if (!$all) {
			$where .= ' AND (andamento_id not in(6,7) OR andamento_id is null)';
		}
		if ($pWhere) {
			$where .= $pWhere;
		}
		$select = 'SELECT   p.id, p.menu, p.responsavel_usuario_id,p.supervisor_usuario_id, p.ordem,p.projeto_id,
                            o.peso, o.data_inicio, o.data_prazo, o.data_encerramento, o.avaliacao_andamento, o.percentual_execucao,
                            o.alteracao_data,
                            o.andamento_id,
                            andamentos.descricao andamento,
                            o.id operativo_id
                    FROM
                      public.programacoes p left outer join
                      public.operativos o on p.id = o.programacao_id
                      left outer join
                      public.andamentos on andamentos.id = o.andamento_id
                    where  ' . $where .
			'ORDER BY ' . $order;
		$stmt = Zend_Registry::get('db')->query($select);
		$stmt->setFetchMode(Zend_Db::FETCH_OBJ);
		$tarefas = [];
		while ($value = $stmt->fetch()) {
			if (!Data_Model_DbTable_Row_Operativo::checkPermission($value->id)) {
				$value->avaliacao_andamento = 'Informação não disponível';
			}
			$tarefa = [
				'id' => $value->id,				
                'operativo_id' => $value->operativo_id,
				'menu' => $value->menu,
				'peso' => $value->peso,
				'ordem' => $value->ordem,
				'projeto_id' => $value->projeto_id,
				'data_inicio' => $value->data_inicio,
				'data_prazo' => $value->data_prazo,
				'data_encerramento' => $value->data_encerramento,
				'avaliacao_andamento' => $value->avaliacao_andamento,
				'percentual_execucao' =>(float) $value->percentual_execucao,
				'alteracao_data' => $value->alteracao_data,
				'andamento_id' => $value->andamento_id,
				'andamento' => $value->andamento,
				'responsavel_usuario_id' => $value->responsavel_usuario_id,
				'supervisor_usuario_id' => $value->supervisor_usuario_id,
				'ordem_alerta' => $this->getClassAndOrder($value),
			];
			$tarefas[] = $tarefa;
		}
		$alerta = $menu = [];
		foreach ($tarefas as $key => $row) {
			$alerta[$key] = $row['ordem_alerta'];
			$menu[$key]   = $row['menu'];
		}

		array_multisort($alerta, SORT_ASC, $menu, SORT_ASC, $tarefas);
		return $tarefas;
	}
	/**
	 * @param $value
	 */
	private function getClassAndOrder($value) {

		if (!$value->peso) {
			return 'alert-0 alert-border alert-no-weight';
		}
		$data_inicio = (new DateTime($value->data_inicio . ' 00:00'))->getTimestamp();
		$data_prazo  = (new DateTime($value->data_prazo . '23:59'))->getTimestamp();
		$agora       = (new DateTime())->getTimestamp();
		if ((int) $value->andamento_id < 6) {
			if ($data_inicio < $agora && $data_prazo > $agora) {
				$percentual = ($agora - $data_inicio) / ($data_prazo - $data_inicio);
				if ($percentual >= 0.8) {
					return 'alert-2 alert-border alert-yellow md-accent';
				} else {
					return 'alert-3 alert-border alert-green md-warn';
				}
			} else if ($data_prazo < $agora) {
				return 'alert-1 alert-border alert-red md-warn';
			} else if ($data_inicio > $agora) {
				return 'alert-8 alert-border alert-blank';
			}
		} else if ((int) $value->andamento_id === (int) 6) {
			if ($value->data_encerramento) {
				return 'alert-4 alert-border alert-no-date';
			}
			$data_encerramento = (new DateTime($value->data_encerramento))->getTimestamp();
			if ($data_encerramento > $data_prazo) {
				return 'alert-5 alert-border alert-dark-blue';
			} else {
				return 'alert-6 alert-border alert-blue';
			}
		}
		return '-';

	}
}
