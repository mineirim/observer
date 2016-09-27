<?php
/**
 * SUBPROJETOS É UMA CLASSE QUE ABSTRAI AS PROGRAMAÇÕES E TRATA ATIVIDADES QUE CONTENHAM TAREFAS
 * ALIMENTADAS POR SISTEMAS EXTERNOS COMO "SUBPROJETO"
 */

class Data_Model_Atividades {

	/**
	 * @var Data_Model_DbTable_Programacoes $_model
	 */
	private $_model;

	public function __construct() {
		$this->_model = new Data_Model_DbTable_Programacoes();
	}

	/**
	 * @param $projetoId
	 * @return mixed
	 */
	public function listAtividades($projetoId, $acaoId, $dataReferencia = false) {
		$where = 'situacao_id<>2 AND  id IN (SELECT p.programacao_id FROM programacoes p INNER JOIN programacao_sistemas ps on p.id=ps.programacao_id WHERE ps.sistema_id is not null and p.situacao_id<>2) ';
		$where .= ' AND programacao_id=' . $acaoId;
		$where .= ' AND ' . $projetoId . ' = ANY(projetos) ';

		if ($dataReferencia) {
			$where .= ' AND (inclusao_data > \'' . $dataReferencia . '\' OR alteracao_data > \'' . $dataReferencia . '\') ';
		}
		$rowset = $this->_model->fetchAll($where);
		return $rowset->toArray();
	}
	/**
	 * @param $params
	 */
	public function getAll($params) {
		$financeiroModel = new Data_Model_Financeiro();
		$operativosTable = new Data_Model_DbTable_Operativos();

		$projetoId  = isset($params['projeto']) ? $params['projeto'] : false;
		$acaoId     = isset($params['acao']) ? $params['acao'] : false;
		$lastUpdate = isset($params['data_referencia']) ? $params['data_referencia'] : false;
		$rows       = $this->listAtividades($projetoId, $acaoId, $lastUpdate);
		if (\Zend_Registry::isRegistered('sistema')) {
			$atividades = [];
			foreach ($rows as $key => $atividade) {
				$tarefa             = $this->getTarefaRH($atividade['id']);
				$financeiro         = $this->listaDespesas($projetoId, $atividade['id'], \Zend_Registry::get('sistema')->id);
				$arrTotal           = ['valor_alocado' => $financeiroModel->getTotalPorSistema((int) $projetoId, (int) $atividade['id'])];
				$atividades[$key]   = array_merge($atividade, $arrTotal);
				$operativo          = $operativosTable->fetchRow(['programacao_id=?' => $tarefa->id]);
				$execucao           = [];
				$execucao['fisico'] = ['data_inicio' => $operativo->data_inicio,
					'data_prazo' => $operativo->data_prazo,
					'data_encerramento' => $operativo->data_encerramento,
					'avaliacao_andamento' => $operativo->avaliacao_andamento];
				$execucao['financeiro']       = $financeiro;
				$atividades[$key]['execucao'] = $execucao;
			}
			// die;
			$rows = $atividades;
		} else {
			$rows = $rows->toArray();
		}
		return $rows;
	}
	/**
	 * @param $id
	 * @return mixed
	 */
	public function getAtividade($id) {
		$financeiroModel = new Data_Model_Financeiro();
		$operativosTable = new Data_Model_DbTable_Operativos();

		$atividade = $this->_model->fetchRow(['id=?' => $id]);

		if (\Zend_Registry::isRegistered('sistema')) {
			$key        = 0;
			$atividades = [];

			$tarefa           = $this->getTarefaRH($id);
			$financeiro       = $this->listaDespesas($tarefa->projeto_id, $id, \Zend_Registry::get('sistema')->id);
			$arrTotal         = ['valor_alocado' => $financeiroModel->getTotalPorSistema((int) $tarefa->projeto_id, (int) $id)];
			$atividades[$key] = array_merge($atividade->toArray(), $arrTotal);
			$operativo        = $operativosTable->fetchRow(['programacao_id=?' => $tarefa->id]);
			$execucao         = [];

			$execucao['fisico'] = ['data_inicio' => $operativo->data_inicio,
				'data_prazo' => $operativo->data_prazo,
				'data_encerramento' => $operativo->data_encerramento,
				'avaliacao_andamento' => $operativo->avaliacao_andamento];
			$execucao['financeiro']       = $financeiro;
			$atividades[$key]['execucao'] = $execucao;

			$rows = $atividades;
		} else {
			$rows = $atividade->toArray();
		}
		return $rows;
	}

	/**
	 * lista as tarefas alimentadas por um determinado sistema
	 * @param $atividadeId
	 * @param $sistemaId
	 * @return mixed
	 */
	public function listaDespesas($projetoId, $atividadeId, $sistemaId) {
		$db  = Zend_Registry::get('db');
		$sql = 'SELECT d.id, d.descricao, d.valor, p.menu
				FROM programacoes p INNER JOIN financeiro f ON p.id = f.programacao_id
				INNER JOIN despesas d ON f.id=d.financeiro_id
				WHERE p.programacao_id=:atividadeId AND projeto_id=:projetoId
				AND p.id IN ( SELECT ps.programacao_id FROM programacao_sistemas ps WHERE ps.sistema_id = :sistemaId )
				ORDER BY d.id';
		$stmt = $db->query($sql, [':sistemaId' => $sistemaId, ':projetoId' => $projetoId, ':atividadeId' => $atividadeId]);
		$stmt->setFetchMode(Zend_Db::FETCH_OBJ);
		$tarefas = $stmt->fetchAll();
		return $tarefas;
	}

	/**
	 * @param $atividadeId
	 * @return mixed
	 */
	public function getTarefaRH($atividadeId) {
		$programacoesTable = new Data_Model_DbTable_Programacoes();
		$tarefas           = $programacoesTable->fetchAll('programacao_id=' . $atividadeId . ' and id in( SELECT ps.programacao_id FROM programacao_sistemas ps WHERE ps.sistema_id = 1 )');
		return $tarefas->current();
	}
	/**
	 * @param $id
	 */
	public function getSubprojeto($id) {
		$row = $this->_model->find($id);
		return $row->current()->toArray();
	}

	/**
	 * @param $atividade
	 * @param $id
	 */
	public function save($params) {
		$despesas_table   = new Data_Model_DbTable_Despesas();
		$operativos_table = new Data_Model_DbTable_Operativos();
		$financeiroTable  = new Data_Model_DbTable_Financeiro();
		$sistemas_table   = new Data_Model_DbTable_ProgramacaoSistemas();
		$formData         = $params['data'];
		$dados            = json_decode($formData, true);
		if (json_last_error()) {
			throw new Exception('Formato incorreto dos dados(JSON)', 1);
		}
		$tarefaRH = $this->getTarefaRH($dados['id']);

		$data          = ['avaliacao_andamento' => $dados['execucao']['fisico']['avaliacao_andamento']];
		$updated       = $operativos_table->update($data, ['programacao_id=?' => $tarefaRH->id]);
		$operativoRow  = $operativos_table->fetchRow(['programacao_id=?' => $tarefaRH->id]);
		$financeiroRow = $financeiroTable->fetchRow(['programacao_id=?' => $tarefaRH->id]);
		$map           = [];
		foreach ($dados['execucao']['financeiro'] as $despesa) {
			$despesaData = ['descricao' => $despesa['descricao'], 'valor' => $despesa['valor']];
			if (isset($despesa['id'])) {
				$id = $despesa['id'];
				$despesas_table->update($despesaData, ['id=?' => $despesa['id']]);
			} else {
				$despesaData['financeiro_id'] = $financeiroRow->id;
				$id                           = $despesas_table->insert($despesaData);
			}
			$map[$id] = $despesa['id_vinculo'];

		}
		$retorno = $this->getAtividade($dados['id']);
		foreach ($retorno[0]['execucao']['financeiro'] as $key => $value) {
			$retorno[0]['execucao']['financeiro'][$key]->vinculo_id = $map[$value->id];
		}
		return $retorno;
	}

}