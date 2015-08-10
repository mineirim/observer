<?php

class Data_Model_Usuarios {

    private $password_md5;
    private $salt;
    /**
     * 
     * @return Data_Model_DbTable_Row_Usuario
     */
    public function getUsuario($id) {
        $id = (int) $id;
        $table_usuarios = new Data_Model_DbTable_Usuarios();
        $usuario = $table_usuarios->fetchRow('id = ' . $id);
        if (!$usuario) {
            throw new Exception("Usuário não encontrado: $id");
        }
        return $usuario;
    }
    /**
     *
     * @param array $dados
     * @return Data_Model_DbTable_Row_Usuario 
     */
    public function addUsuario($dados) {
        $table_usuarios = new Data_Model_DbTable_Usuarios();
        $table_usuarios->getAdapter()->beginTransaction();
        
        $password = isset($dados['senha'])?$dados['senha']:null;
        $this->makePassword($password);
        $dados['senha'] = $this->password_md5;
        $dados['salt'] = $this->salt;
        

        if(isset($dados['setores'])){
            $setoresIds = is_array( $dados['setores']) ?  $dados['setores'] : split(',', $dados['setores']);
            unset($dados['setores']);
        }else{
            $setoresIds=[];
        }
        $id = $table_usuarios->insert($dados);
        $table_usuarios->getAdapter()->commit();
        $usuarioRow= $table_usuarios->fetchRow('id = ' . $id);
        $this->updateSetores($usuarioRow->id, $setoresIds);
        return $usuarioRow;        
    }
    
    public function checaDuplicidade($login){
        $table_usuarios = new Data_Model_DbTable_Usuarios();
        if($table_usuarios->fetchRow(array("usuario=?"=>$login)))
            throw new Exception("Login \"$login\" já cadastrado");
                
    }
    /**
     *
     * @param string $where
     * @param string $password 
     */
    function updatePassword($where, $password=null,$alterar_senha=false) {
        $table_usuarios = new Data_Model_DbTable_Usuarios();
        $dados = array();
       
        $table_usuarios->getAdapter()->beginTransaction();
        $this->makePassword($password);
        $dados['senha'] = $this->password_md5;
        $dados['salt'] = $this->salt;
        $dados['alterar_senha']=$alterar_senha?1:0;
        $table_usuarios->update($dados, $where);
        $table_usuarios->getAdapter()->commit();
        return $table_usuarios->fetchRow($where);
    }
    /**
     *
     * @param array $dados
     * @param string $where 
     * @return Data_Model_DbTable_Row_Usuario
     */
    function updateUsuario(array $dados, $where) {
        $table_usuarios = new Data_Model_DbTable_Usuarios();
        $table_usuarios->getAdapter()->beginTransaction();
        if (isset($dados['senha'])) {
            $this->makePassword($dados['senha']);
            $dados['senha'] = $this->password_md5;
            $dados['salt'] = $this->salt;
        }
        if(isset($dados['setores'])){
            $setoresIds = is_array( $dados['setores']) ?  $dados['setores'] : split(',', $dados['setores']);
            unset($dados['setores']);
        }else{
            $setoresIds=[];
        }
        $table_usuarios->update($dados, $where);
        $table_usuarios->getAdapter()->commit();
        $usuarioRow= $table_usuarios->fetchRow($where);
        $this->updateSetores($usuarioRow->id, $setoresIds);
        return $usuarioRow;
    }
    public function updateSetores($usuarioId,$setoresIds){
        $usuarioSetoresDbTable = new Data_Model_DbTable_UsuariosSetores;
        if(count($setoresIds) ==0){
            $usuarioSetoresDbTable->delete('usuario_id='. $usuarioId );
        }else{
            $usuarioSetoresDbTable->delete('usuario_id='. $usuarioId . ' AND setor_id NOT IN ('. implode(',', $setoresIds) . ')');
        }
        
        foreach ($setoresIds as $setorId) {
            if(!$usuarioSetoresDbTable->fetchRow('usuario_id='. $usuarioId . ' AND setor_id =' .$setorId)){
                $usuarioSetoresDbTable->insert(['usuario_id'=>$usuarioId,'setor_id'=>$setorId]);
            }
        }
    }
    function deleteUsuario($id) {
        
        $table_usuarios = new Data_Model_DbTable_Usuarios();
        $table_usuarios->update(array('situacao_id'=>2), "id=$id");
    }

    function restoreUsuario($id) {
        $table_usuarios = new Data_Model_DbTable_Usuarios();
        $table_usuarios->update(array('situacao_id'=>1), "id=$id");
    }

    private function makePassword($password=null) {
        // define a senha padrão
        
        $password= $password?$password:'123456';
        
        $this->salt = md5(time());
        $this->password_md5 = md5($password . $this->salt);
    }

}

