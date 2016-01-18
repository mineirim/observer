<?php
/**
 * SUBPROJETOS É UMA CLASSE QUE ABSTRAI AS PROGRAMAÇÕES E TRATA ATIVIDADES QUE CONTENHAM TAREFAS
 * ALIMENTADAS POR SISTEMAS EXTERNOS COMO "SUBPROJETO"
 */

class Data_Model_Subprojetos {

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
	public function listSubprojetos($projetoId = false, $dataReferencia = false) {
		$where = 'id in (select p0.programacao_id from programacoes p0 WHERE p0.id IN (SELECT p.programacao_id FROM programacoes p INNER JOIN programacao_sistemas ps on p.id=ps.programacao_id WHERE ps.sistema_id is not null) )';

		if ($projetoId) {
			$where .= ' AND ' . $projetoId . ' = ANY(projetos) ';
		}
		if ($dataReferencia) {
			$where .= ' AND (inclusao_data > \'' . $dataReferencia . '\' OR alteracao_data > \'' . $dataReferencia . '\') ';
		}
		$rowset = $this->_model->fetchAll($where);
		return $rowset->toArray();
	}
	/**
	 * @param $id
	 */
	public function getSubprojeto($id) {
		$row = $this->_model->find($id);
		return $row->current()->toArray();
	}

}