<?php

class Data_Model_Programacoes
{
    public function getRecursive($id=null){
           $programacoes = new Data_Model_DbTable_Programacoes();
           $where = $id?'programacao_id='.$id:"programacao_id is null";
           $parent = $programacoes->fetchAll($where, 'ordem' );
           $root = array();
           foreach ($parent as $value) {
                $usuario    = $value->findParentRow('Data_Model_DbTable_Usuarios');
                $usuario = $usuario?$usuario->toArray():array();
                $setor      = $value->findParentRow('Data_Model_DbTable_Setores');
                $setor = $setor?$setor->toArray():array();
                $instrumento= $value->findParentRow('Data_Model_DbTable_Instrumentos')->toArray();
                $parent     = $value->findParentRow('Data_Model_DbTable_Programacoes');
                $parent = $parent ? $parent->toArray() :array();
                $operativo = $value->findDependentRowset('Data_Model_DbTable_Operativos');
              
                $operativo = count($operativo)>0?$operativo->toArray():array();
                $child = array(
                       'id'             =>$value->id,
                       'menu'           =>$value->menu,
                       'descricao'      =>$value->descricao,
                       'ordem'          =>$value->ordem,
                       'instrumento_id' =>$value->instrumento_id,
                       'programacao_id' =>$value->programacao_id,
                       'setor_id'       =>$value->setor_id,
                       'responsavel_usuario_id'=>$value->responsavel_usuario_id,
                       'responsavel'    =>$usuario,
                       'setor'          => $setor,
                       'instrumento'    =>$instrumento,
                       'parent'         =>$parent,
                        'operativo'         =>$operativo,
                        'iconCls'=>'x-tree-noiconx'
               );
               $children = $this->getRecursive($value->id);
               if(count($children)> 0){
                   $child['expanded']=true;
                   $child['rows']= $children;
               }else{
                   $child['leaf']=true;
               }
               array_push($root, $child);
           }
           return $root;
       }
    /**
     *
     * @param type $id
     * @param type $withAssociations
     * @return type array
     */
    public function getProgramacao($id,$withAssociations=false){
           $programacoes = new Data_Model_DbTable_Programacoes();
           $where = "id=$id";
           $programacao = $programacoes->fetchRow($where);
           $row = $programacao->toArray();
           if($withAssociations){
               $usuario    = $programacao->findParentRow('Data_Model_DbTable_Usuarios');
               $usuario = $usuario?$usuario->toArray():array();
               $setor      = $programacao->findParentRow('Data_Model_DbTable_Setores');
               $setor = $setor?$setor->toArray():array();
               $row['responsavel']=$usuario;
               $row['setor'] = $setor;
               $row['instrumento'] = $programacao->findParentRow('Data_Model_DbTable_Instrumentos')->toArray();
               $parent =$programacao->findParentRow('Data_Model_DbTable_Programacoes');
               $row['parent'] = $parent? $parent->toArray():'';
           }
           return $row;
       }
       
    /**
     *
     * @param type $programacao_id
     * @return type array
     */
    public function getNode($programacao_id=null,$instrumento_id=null){
           $programacoes_table = new Data_Model_DbTable_Programacoes();
           
           $where =$programacao_id? "programacao_id=$programacao_id":"instrumento_id=$instrumento_id";
           $programacoes = $programacoes_table->fetchAll($where);
           $rows = array();
           foreach ($programacoes as $programacao) {
               $row = $programacao->toArray();
               $row['leaf']= count($programacao->findDependentRowset ('Data_Model_DbTable_Programacoes')) == 0 ;
               $row['parent'] =  $programacao->id;
               $rows[]=$row;
           }
           return $rows;
       }
       
}

