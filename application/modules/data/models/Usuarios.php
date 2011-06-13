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
        
        $password = $dados['password']?$dados['password']:null;
        $this->makePassword($password);
        $dados['password'] = $this->password_md5;
        $dados['salt'] = $this->salt;
        $id = $table_usuarios->insert($dados);
        $table_usuarios->getAdapter()->commit();
        
        return $table_usuarios->fetchRow('id = ' . $id);;
    }
    /**
     *
     * @param string $where
     * @param string $password 
     */
    function updatePassword($where, $password=null) {
        $table_usuarios = new Data_Model_DbTable_Usuarios();
        $dados = array();
       
        $table_usuarios->getAdapter()->beginTransaction();
        $this->makePassword($password);
        $dados['password'] = $this->password_md5;
        $dados['salt'] = $this->salt;
        $table_usuarios->update($dados, $where);
        $table_usuarios->getAdapter()->commit();
        
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
        if (isset($dados['password'])) {
            $this->makePassword($dados['password']);
            $dados['password'] = $this->password_md5;
            $dados['salt'] = $this->salt;
        }
        $table_usuarios->update($dados, $where);
        $table_usuarios->getAdapter()->commit();
        return $table_usuarios->fetchRow($where);
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
        
        $dados['password'] = $password?$password:'123456';
        $this->salt = md5(time());
        $this->password_md5 = md5($password . $this->salt);
    }

}

