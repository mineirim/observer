<?php

/**
 * Description of Tags
 *
 * @author Marcone Costa
 */
class Data_Model_DbTable_Rowset_Projetos extends Zend_Db_Table_Rowset_Abstract
{
    /**
     * @return array the tags in an array
     */
    public function getAsArray()
    {
        $projetos = [];
        while ($this->valid()) {
            /* @var $projeto Data_Model_DbTable_Row_Projeto */
            $projeto = $this->current();
            $arr_projeto = $projeto->toArray();
            $arr_projeto['supervisor_nome'] =$projeto->findParentRow('Data_Model_DbTable_Usuarios')->nome;
            $financiadores =[];
            foreach ($projeto->getFinanciadores() as $financiador){
                $financiadores[] =$financiador->nome;
            }
            $arr_projeto['financiadores'] = '(' . implode(', ', $financiadores) . ')';
            
            $projetos[] = $arr_projeto;  
            $this->next();
        }
        $this->rewind();
        return $projetos;
    }
    
}
