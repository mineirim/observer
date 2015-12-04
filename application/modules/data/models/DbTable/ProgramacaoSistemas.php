<?php

/**
 * Description of AnexoTags
 *
 * @author Marcone Costa
 */
class Data_Model_DbTable_ProgramacaoSistemas extends Zend_Db_Table_Abstract {
	protected $_name            = 'programacao_sistemas';
	protected $_dependentTables = ['Data_Model_DbTable_Sistemas', 'Data_Model_DbTable_Programacoes'];

	protected $_referenceMap = [
		'Anexo' => ['columns' => 'sistema_id',
			'refTableClass' => 'Data_Model_DbTable_Sistemas',
			'onDelete' => self::CASCADE,
			'refColumns' => 'id'],
		'Programacao' => ['columns' => 'programacao_id',
			'refTableClass' => 'Data_Model_DbTable_Programacoes',
			'onDelete' => self::CASCADE,
			'refColumns' => 'id'],
	];

}
