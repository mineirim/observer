<?php

class Data_Model_Projetos
{
    private $_db_table;
    /**
     * 
     * @param int $projeto_id
     * @return Data_Model_DbTable_Rowset_Organizacoes
     */
    public function getFinanciadores($projeto_id){
        $projetosTable = new Data_Model_DbTable_Projetos();
        /* @var $projeto Data_Model_DbTable_Row_Projeto */
        $projeto = $projetosTable->fetchRow('id='.$projeto_id);        
        return $projeto->getFinanciadores();       
    }
    /**
     * 
     * @return Data_Model_DbTable_Projetos 
     */
    public function getProjetosDBTable(){
        if (!$this->_db_table) {
            $this->_db_table = new Data_Model_DbTable_Projetos();
        }
        return $this->_db_table;
    }
    public function insert($formData){
        unset($formData['id']);
        if(isset($formData['financiadores_ids'])){
            $financiadores_ids = split(',', $formData['financiadores_ids']);
            unset($formData['financiadores_ids']);
        }else{
            $financiadores_ids=[];
        }
        $formData['data_inicio']=$this->formatDate($formData['data_inicio']);
        $formData['data_fim'] = $this->formatDate($dataFim);

        foreach ($formData as $key => $value) {
            if ($value == '') {
                unset($formData[$key]);
            }
        }
        $id =$this->getProjetosDBTable()->insert($formData);
        $this->updateFinanciadores($id, $financiadores_ids);
        $row = $this->getProjetosDBTable()->fetchRow("id=$id");
        return$row;
    }
    /**
     * verifica o formato de entrada da data e devolve no formato para salvar no banco
     */
    private function formatDate($date){
        if($date ==='' || !$date)
            return;

        if(DateTime::createFromFormat("Y-m-d",$date)){
            $formatedDate=$date;
        }else{
            $tmpDt = DateTime::createFromFormat("d/m/Y",$date);
            $formatedDate=$tmpDt->format('Y-m-d');
        }
        return $formatedDate;
    }
    public function update($formData){
        $params = [
            'nome'=>$formData['nome'],
            'data_inicio'=> $formData['data_inicio'],//$this->formatDate($formData['data_inicio']),
            'data_fim' => $formData['data_fim'],//$this->formatDate($dataFim),
            'coordenador_usuario_id' => $formData['coordenador_usuario_id'],
            'apresentacao' =>$formData['apresentacao']
        ];
        foreach ($params as &$value) {
            if($value==''){
                $value=null;
            }
        }
        $id=$formData['id'];
        unset($formData['id']);
        if(isset($formData['financiadores_ids'])){
            $financiadores_ids = split(',', $formData['financiadores_ids']);
            unset($formData['financiadores_ids']);
        }else{
            $financiadores_ids=[];
        }
        $this->getProjetosDBTable()->update($params, "id=$id");
        $row = $this->getProjetosDBTable()->fetchRow("id=$id");
        $this->updateFinanciadores($id, $financiadores_ids);
        return $row;
    }
    public function updateFinanciadores($projeto_id,$organizacoes_ids){
        $financiadoresTable = new Data_Model_DbTable_ProjetosFinanciadores;
        if(count($organizacoes_ids) ==0){
            $financiadoresTable->delete('projeto_id='. $projeto_id );
        }else{
            $financiadoresTable->delete('projeto_id='. $projeto_id . ' AND organizacao_id NOT IN ('. implode(',', $organizacoes_ids) . ')');
        }
        foreach ($organizacoes_ids as $organizacao_id) {
            if(!$financiadoresTable->fetchRow('projeto_id='. $projeto_id . ' AND organizacao_id =' .$organizacao_id)){
                $financiadoresTable->insert(['projeto_id'=>$projeto_id,'organizacao_id'=>$organizacao_id]);
            }
        }
    }
}

