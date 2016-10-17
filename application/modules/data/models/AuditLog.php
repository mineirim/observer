<?php
/**
 * SUBPROJETOS É UMA CLASSE QUE ABSTRAI AS PROGRAMAÇÕES E TRATA ATIVIDADES QUE CONTENHAM TAREFAS
 * ALIMENTADAS POR SISTEMAS EXTERNOS COMO "SUBPROJETO"
 */

class Data_Model_AuditLog {

	/**
	 * @var Data_Model_DbTable_Programacoes $_model
	 */
	private $_model;

	public function __construct() {
		$this->_model = new Data_Model_DbTable_AuditLog;
	}


	public function ultimosAcessos(){

		$sql =  'SELECT u.nome, access_date, http_method tipo, url uri FROM audit_log al inner join usuarios u on al.usuario_id=u.id ORDER BY access_date DESC limit 20';
		$stmt = Zend_Registry::get('db')->query($sql);
		$rows = $stmt->fetchAll();
		return $rows;
	}
	public function topAcessos(){
		$sql =  'SELECT u.nome, count(*) numero_acessos FROM audit_log al inner join usuarios u on al.usuario_id=u.id GROUP BY u.nome ORDER BY count(*) DESC';
		$stmt = Zend_Registry::get('db')->query($sql);
		$rows = $stmt->fetchAll();
		return $rows;
	}
}