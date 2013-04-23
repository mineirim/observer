<?php

class Data_Model_Instrumentos {
    /**
     * 
     * @param type $id
     * @return  Zend_Db_Statement_Pdo
     */
    public function getRecursiveStructure($id) {
        $select = "
	    with recursive i as (
                    select * from instrumentos 
                    where id  = (
                                with recursive q(id, ordem) as
                                          (
                                          select {$id}, 0
                                          UNION ALL
                                          select i.instrumento_id, q.ordem+1
                                          from instrumentos i  inner join instrumentos p on p.id=i.instrumento_id
                                          inner join q on i.id = q.id and i.instrumento_id is not null AND p.situacao_id=1
                                          )
                                  select id from q where ordem=(select max(ordem) from q) 
                                  )
                    UNION ALL 
                    select inst.* from instrumentos inst inner join i on inst.instrumento_id=i.id AND inst.situacao_id=1
                    )
                    select * from i";
        $stmt = Zend_Registry::get('db')->query($select);
        $stmt->setFetchMode(Zend_Db::FETCH_OBJ);
        return $stmt;
    }
    /**
     * retorna o número de nós pais
     */
    public function getNumParents(){
        
    }
    public function getRecursiveParents($id){
        $select = "
            with recursive q as
                (
                select {$id} id, 0 ix, cast('' as character varying) singular 
                UNION ALL
                select i.instrumento_id, q.ix+1, i.singular
                from instrumentos i  inner join instrumentos p on p.id=i.instrumento_id
                inner join q on i.id = q.id and i.instrumento_id is not null AND p.situacao_id=1
                )
              select * from q  where id <> {$id}
        ";
        $stmt = Zend_Registry::get('db')->query($select);
        $stmt->setFetchMode(Zend_Db::FETCH_OBJ);
        return $stmt;
    }
    public function delete($id){
        $table= new \Data_Model_DbTable_Instrumentos();
        $table->update(array('situacao_id'=>2), "id=$id");
    }
}