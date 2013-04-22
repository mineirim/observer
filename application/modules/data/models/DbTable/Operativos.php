<?php

class Data_Model_DbTable_Operativos extends Etc_Model_AssignModel
{

    protected $_name = 'operativos';
    protected $_dependentTables = array('Data_Model_DbTable_OperativosHistorico');
    protected $_referenceMap = array (
                'Programacoes' => array ( 'columns' => 'programacao_id', 
                                                          'refTableClass' => 'Data_Model_DbTable_Programacoes', 
                                                          'refColumns' => 'id' ) );

    public function update(array $data, $where) {
        $historico_table = new Data_Model_DbTable_OperativosHistorico();
        $currents = $this->fetchAll($where);
        
        $this->getAdapter()->beginTransaction();
        foreach ($currents as $operativo){
            $current_array = $operativo->toArray();
            $current_array['operativo_id']= $current_array['id'];
            unset($current_array['id']);
            $historico_table->insert($current_array);
        }
        $this->_data = $data;
        $this->_data['alteracao_usuario_id'] = $this->_idUsuario;
        $this->_data['alteracao_data'] = @date('Y-m-d  H:i:s');
        $return = parent::update($this->_data, $where);
        $this->getAdapter()->commit();
        return $return;
    } 
}

