<?php

class Data_Model_Programacoes
{
    public function getRecursive($id=null){
           $programacoes = new Data_Model_DbTable_Programacoes();
           $where = $id?'programacao_id='.$id:"programacao_id is null";
           $parent = $programacoes->fetchAll($where, 'ordem' );
           $root = array();
           foreach ($parent as $value) {
                    $child = array(
                           'id'=>$value->id,
                           'menu'=>$value->menu,
                           'descricao'=>$value->descricao,
                           'ordem'=>$value->ordem,
                           'instrumento_id'=>$value->instrumento_id,
                           'programacao_id'=>$value->programacao_id,
                           'setor_id'=>$value->setor_id                   
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

}

