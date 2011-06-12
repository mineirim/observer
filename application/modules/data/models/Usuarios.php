<?php

class Data_Model_Usuarios {

    private $password_md5;
    private $salt;

    public function getUsuario($id) {
        $id = (int) $id;
        $table_usuarios = new Data_Model_DbTable_Usuarios();
        $table_usuarios = $this->fetchRow('id = ' . $id);
        if (!$row) {
            throw new Exception("Usuário não encontrado: $id");
        }
        return $row->toArray();
    }

    public function addUsuario($dados, array $grupos) {
        $table_usuarios = new Data_Model_DbTable_Usuarios();
        $table_usuarios->getAdapter()->beginTransaction();
        $this->makePassword($dados['password']);
        $dados['password'] = $this->password_md5;
        $dados['salt'] = $this->salt;
        $id = $table_usuarios->insert($dados);
        $this->getAdapter()->commit();
        return $id;
    }

    function updatePassword(array $dados, $where) {
        $table_usuarios = new Data_Model_DbTable_Usuarios();

        if (isset($dados['password'])) {
            $table_usuarios->getAdapter()->beginTransaction();
            $this->makePassword($dados['password']);
            $dados['password'] = $this->password_md5;
            $dados['salt'] = $this->salt;
            $table_usuarios->update($dados, $where);
            $table_usuarios->getAdapter()->commit();
        }
    }

    function updateUsuario(array $dados, array $grupos, $where) {
        $table_usuarios = new Data_Model_DbTable_Usuarios();
        $table_usuarios->getAdapter()->beginTransaction();
        if (isset($dados['password'])) {
            $this->makePassword($dados['password']);
            $dados['password'] = $this->password_md5;
            $dados['salt'] = $this->salt;
        }
        $table_usuarios->update($dados, $where);
        $table_usuarios->getAdapter()->commit();
    }

    function deleteUsuario($id) {
        $table_usuarios = new Data_Model_DbTable_Usuarios();
        $usuario = $table_usuarios->find($id)->current();
        $usuario->situacao_id = 2;
        $usuario->save();
    }

    function restoreUsuario($id) {
        $table_usuarios = new Data_Model_DbTable_Usuarios();
        $usuario = $table_usuarios->find($id)->current();
        $usuario->situacao_id = 1;
        $usuario->save();
    }

    private function makePassword($password) {
        $this->salt = md5(time());
        $this->password_md5 = md5($password . $this->salt);
    }

}

