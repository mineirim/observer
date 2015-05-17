<?php
/**
 * Description of AnexoTags
 *
 * @author Marcone Costa
 */
class Data_Model_DbTable_ProjetosFinanciadores extends Zend_Db_Table_Abstract{
	protected $_name = 'anexo_tags';
	protected $_dependentTables = ['Data_Model_DbTable_Projetos','Data_Model_DbTable_Organizacoes'];

	protected $_referenceMap =  [
			'Projetos' =>  [ 'columns' => 'projeto_id',
					'refTableClass' => 'Data_Model_DbTable_Projetos',
					'refColumns' => 'id' ] ,
			'Financiadores' =>  [ 'columns' => 'organizacao_id',
					'refTableClass' => 'Data_Model_DbTable_Organizacoes',
					'refColumns' => 'id' ]
	];


}