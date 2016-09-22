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
				AND p.id IN ( SELECT ps.programacao_id FROM programacao_sistemas ps WHERE ps.sistema_id = :sistemaId )';
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
	public function save($id, $dados) {
		$despesas_table   = new Data_Model_DbTable_Despesas();
		$operativos_table = new Data_Model_DbTable_Operativos();
		$sistemas_table   = new Data_Model_DbTable_ProgramacaoSistemas();
		$data             = ['descricao' => $dados['descricao']];
		$operativos_table->update($data, "id=$id");
		$operativoRow = $operativos_table->find($id);
		$financeiro   = $atividadeRow->current()->findParentRow('Programacoes');
		foreach ($dados['financeiro'] as $despesa) {
			$despesaData = [''];
			$operativos_table->update($formData, "id=$id");
		}
	}

}