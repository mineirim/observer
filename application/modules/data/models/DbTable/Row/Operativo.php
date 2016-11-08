<?php
require_once 'Zend/Db/Table/Row/Abstract.php';

/**
 * Description of Anexo
 *
 * @author marcone
 */
class Data_Model_DbTable_Row_Operativo extends Zend_Db_Table_Row_Abstract {

	/**
	 * @param $columnName
	 * @return mixed
	 */
	public function __get($columnName) {
		if ($columnName == 'avaliacao_andamento') {
			if (!$this->checkPermission($this->programacao_id)) {
				$ret = 'Informação não disponível para este usuário.';
			} else {
				$ret = parent::__get($columnName);
			}
			return $ret;
		} else {
			return parent::__get($columnName);
		}
	}

	/**
	 * @return mixed
	 */
	public function toArray() {
		$data = parent::toArray();
		if (!$this->checkPermission($data['programacao_id'])) {
			$data['avaliacao_andamento'] = 'Informação não disponível para este usuário.';
		}
		$data['percentual_execucao'] = (float)$data['percentual_execucao'];
		return $data;
	}

	/**
	 * @param $id
	 */
	public static function checkPermission($programacaoId) {
		$programacoesTable = new Data_Model_DbTable_Programacoes();
		$usuariosSetoresTable = new Data_Model_DbTable_UsuariosSetores();
		$programacaoRow    = $programacoesTable->fetchRow('id=' . $programacaoId);
		$identity          = Zend_Auth::getInstance()->getIdentity();
		if ($identity->is_su || $programacaoRow->responsavel_usuario_id == $identity->id) {
			return true;
		}
		if($programacaoRow->setor_id){
			$setor = $usuariosSetoresTable->fetchAll(['usuario_id=?'=>$identity->id,'setor_id=?'=>$programacaoRow->setor_id]);
			if(count($setor)>0){
				return true;
			}
		}
		return false;
	}
}