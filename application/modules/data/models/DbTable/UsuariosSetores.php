<?php
/**
 * Description of AnexoTags
 *
 * @author Marcone Costa
 */
class Data_Model_DbTable_UsuariosSetores extends Zend_Db_Table_Abstract{
	protected $_name = 'usuarios_setores';
	protected $_dependentTables = ['Data_Model_DbTable_Usuarios','Data_Model_DbTable_Setores'];
        protected $_rowsetClass ='Data_Model_DbTable_Rowset_Setores';
	protected $_referenceMap =  [
			'Usuarios' =>  [ 'columns' => 'usuario_id',
					'refTableClass' => 'Data_Model_DbTable_Usuarios',
					'refColumns' => 'id' ] ,
			'Setores' =>  [ 'columns' => 'setor_id',
					'refTableClass' => 'Data_Model_DbTable_Setores',
					'refColumns' => 'id' ]
	];


}