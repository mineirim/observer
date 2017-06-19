<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Geral
 *
 * @author marcone - blog@barraetc.com.br - http://www.barraetc.com.br
 * 
 */
class Relatorio_IndexController extends Zend_Controller_Action
{

    public function __constructor()
    {
        
    }
    public function indexAction(){
        $this->_helper->viewRenderer->setNoRender(true);
        $basicReport = new \Etc\Reports\Basic();
        $script_paths =$this->view->getScriptPaths(); 
        
        $basicReport->setReportsPath($script_paths[0]."index/");
        $basicReport->init($this->getAllParams());
        $this->getResponse()->setHttpResponseCode(200);
        $basicReport->display();
    }
    /**
     * 
     * @param \EtcReport\Jasper\Manager\JasperDesign $jasperDesign
     * @param int $seq
     */
    private function addFields( $jasperDesign, $seq){
        $fields =[
            	['name'=>'id' ,'class'=>'java.lang.Integer'],
                ['name'=>'singular' ,'class'=>'java.lang.String'],
                ['name'=>'has_responsavel' ,'class'=>'java.lang.Boolean'],
                ['name'=>'has_supervisor' ,'class'=>'java.lang.Boolean'],
                ['name'=>'has_equipe' ,'class'=>'java.lang.Boolean'],
                ['name'=>'menu' ,'class'=>'java.lang.String'],
                ['name'=>'descricao' ,'class'=>'java.lang.String'],
                ['name'=>'ordem' ,'class'=>'java.lang.Integer'],
                ['name'=>'programacao_id' ,'class'=>'java.lang.Integer'],
                ['name'=>'equipe' ,'class'=>'java.lang.String'],
                ['name'=>'responsavel' ,'class'=>'java.lang.String'],
                ['name'=>'supervisor' ,'class'=>'java.lang.String'],
                ['name'=>'instrumento_id' ,'class'=>'java.lang.Integer'],
        ];
        foreach ($fields as $value) {
            /* @var $jField \EtcReport\Jasper\Java\JRDesignField  */
             $jField = new \java('net.sf.jasperreports.engine.design.JRDesignField');
             $jField->setName('p'.$seq.'_'. $value['name']);
             $jField->setValueClassName($value['class']);
             $jasperDesign->addField($jField);
        }
	
    }
    private function getQuery($ix, $estrutura, $filter_id=false){
        
        if($ix==1){
        $template = "with 	n1 as ( SELECT  p1.id AS p1_id, p1.singular as p1_singular, p1.has_responsavel as p1_has_responsavel, p1.has_supervisor as p1_has_supervisor, p1.has_equipe as p1_has_equipe, p1.menu as p1_menu, p1.descricao as p1_descricao, p1.ordem as p1_ordem, p1.programacao_id as p1_programacao_id, p1.equipe as p1_equipe, p1.responsavel as p1_responsavel, p1.supervisor as p1_supervisor, p1.instrumento_id as p1_instrumento_id
                            FROM  vw_report_base p1 where p1.programacao_id is null and p1.instrumento_id={$estrutura->id})";
        }else{
            $join = $filter_id ? " INNER " : " RIGHT ";
            $where = $filter_id ? " WHERE p{$ix}.id=".$filter_id:" ";
            $template = "n__ix__ as (
                                SELECT n__iy__.*, p__ix__.id AS p__ix___id, p__ix__.singular as p__ix___singular, p__ix__.has_responsavel as p__ix___has_responsavel, p__ix__.has_supervisor as p__ix___has_supervisor, p__ix__.has_equipe as p__ix___has_equipe, p__ix__.menu as p__ix___menu, p__ix__.descricao as p__ix___descricao, p__ix__.ordem as p__ix___ordem, p__ix__.programacao_id as p__ix___programacao_id, p__ix__.equipe as p__ix___equipe, p__ix__.responsavel as p__ix___responsavel, p__ix__.supervisor as p__ix___supervisor, p__ix__.instrumento_id as p__ix___instrumento_id
                                FROM    vw_report_base p__ix__ {$join} JOIN n__iy__ on p__ix__.programacao_id=n__iy__.p__iy___id $where
                         )";
        }
        $query = str_replace('__ix__', $ix, $template);
        $query = str_replace('__iy__', $ix -1, $query);
        return $query;
    }
    public function getInputStream( $value){
        
        $out = new Java("java.io.ByteArrayOutputStream");

          $arr = [];
          $strlen = strlen($value);
          for ($i = 0; $i < $strlen; $i ++) {
              $val = ord(substr($value, $i, 1));
              if ($val >= 128) {

                  $val = ($val) - 256;
              }
              $arr[] = $val;
          }

          $out->write($arr);

          $value = new Java("java.io.ByteArrayInputStream", $out->toByteArray());
          return $value;
    }
}
