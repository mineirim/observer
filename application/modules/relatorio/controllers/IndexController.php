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
        $reportFileName = 'geral';
        $this->_helper->viewRenderer->setNoRender(true);
        
        $jasper_reports = new \Etc\Jasper\Reports();
        
        $programacao_id = $this->_getParam('id');
        $programacoes_table = new Data_Model_DbTable_Programacoes();
        $instrumentos_table = new Data_Model_Instrumentos();
        $programacao_row = $programacoes_table->fetchRow('programacao_id='.$programacao_id);
        
        $estrutura = $instrumentos_table->getRecursiveStructure($programacao_row->instrumento_id);
        /**
         * @var $numHeaders Número de cabeçalhos que serão apresentados */
        $numHeaders = $estrutura->rowCount();
        
        $script_paths =$this->view->getScriptPaths();
        $jasper_reports->setReportsPath($script_paths[0]."index/");
        
        
        $xml_report = $jasper_reports->getReportXml($reportFileName, '/n:jasperReport');
        
        $xml_report_group = $jasper_reports->getReportXml($reportFileName, '/n:jasperReport/n:group[@name="nivel"]');
        $xml_group_base = $xml_report_group[0]->asXML();
        $dom_group_base = \dom_import_simplexml($xml_report_group[0]);
        $dom_report = \dom_import_simplexml($xml_report[0]);
        $dom_report->removeChild($dom_report->getElementsByTagName('group')->item(0));
        
        $ix=1;
        while ($value = $estrutura ->fetch() )
        {            
            if($ix == $numHeaders-1)
                    break;
            $ix++;
            $px ="p".$value->id."_";
            
            $xml_text = str_replace('p1_', $px, $xml_group_base);
            $xml_text = str_replace('nivel', $px.'nivel', $xml_text);

            $node_new = new SimpleXMLElement($xml_text);

            $dom_group_xml  = dom_import_simplexml($node_new);
            $dom_group  = $dom_report->ownerDocument->importNode($dom_group_xml , TRUE);
            unset($dom_group_xml);
            $node = $dom_report->getElementsByTagName("background")->item(0);
            $dom_report->insertBefore($dom_group,$node);
            //$dom_report->appendChild($dom_group );
            //$xml_report[0]->{$node_new->getName()} = $node_new;
                        
        }       
        //echo "<textarea rows='40' cols='150'>".$xml_report[0]->asXML()."</textarea>";die;
        
        
                //echo "<textarea cols=150 rows=40>".$xml_report[0]->asXML()."</textarea>";die;
        $is = $this->getInputStream($xml_report[0]->asXML());
        
        $report = $jasper_reports->load($is);        
        
        $jasper_reports->compileLoadedReport($report);
        
// JRDesignQuery query = new JRDesignQuery();
//    query.setText("SELECT * FROM Address $P!{OrderByClause}");
//    jasperDesign.setQuery(query);        
        
        $this->getResponse()->setHttpResponseCode(200);
        $jasper_reports->compileReport('geral');
    }
    private function getQuery(){
        $template = "n1 as ( SELECT  p1.id AS p1_id, p1.singular as p1_singular, p1.has_responsavel as p1_has_responsavel, p1.has_supervisor as p1_has_supervisor, p1.has_equipe as p1_has_equipe, p1.menu as p1_menu, p1.descricao as p1_descricao, p1.ordem as p1_ordem, p1.programacao_id as p1_programacao_id, p1.equipe as p1_equipe, p1.responsavel as p1_responsavel, p1.supervisor as p1_supervisor, p1.instrumento_id as p1_instrumento_id
//                            FROM  vw_report_base p1 where p1.programacao_id is null and p1.instrumento_id=2)";
//            with 	n1 as ( SELECT  p1.id AS p1_id, p1.singular as p1_singular, p1.has_responsavel as p1_has_responsavel, p1.has_supervisor as p1_has_supervisor, p1.has_equipe as p1_has_equipe, p1.menu as p1_menu, p1.descricao as p1_descricao, p1.ordem as p1_ordem, p1.programacao_id as p1_programacao_id, p1.equipe as p1_equipe, p1.responsavel as p1_responsavel, p1.supervisor as p1_supervisor, p1.instrumento_id as p1_instrumento_id
//                            FROM  vw_report_base p1 where p1.programacao_id is null and p1.instrumento_id=2),
//                    n2 as (
//                            SELECT n1.*, p2.id AS p2_id, p2.singular as p2_singular, p2.has_responsavel as p2_has_responsavel, p2.has_supervisor as p2_has_supervisor, p2.has_equipe as p2_has_equipe, p2.menu as p2_menu, p2.descricao as p2_descricao, p2.ordem as p2_ordem, p2.programacao_id as p2_programacao_id, p2.equipe as p2_equipe, p2.responsavel as p2_responsavel, p2.supervisor as p2_supervisor, p2.instrumento_id as p2_instrumento_id
//                            FROM    vw_report_base p2 RIGHT JOIN n1 on p2.programacao_id=n1.p1_id),
//                    n3 as (
//                            SELECT n2.*, p3.id AS p3_id, p3.singular as p3_singular, p3.has_responsavel as p3_has_responsavel, p3.has_supervisor as p3_has_supervisor, p3.has_equipe as p3_has_equipe, p3.menu as p3_menu, p3.descricao as p3_descricao, p3.ordem as p3_ordem, p3.programacao_id as p3_programacao_id, p3.equipe as p3_equipe, p3.responsavel as p3_responsavel, p3.supervisor as p3_supervisor, p3.instrumento_id as p3_instrumento_id
//                            FROM    vw_report_base p3 RIGHT JOIN n2 on p3.programacao_id=n2.p2_id),
//                    n4 as (
//                            SELECT n3.*, p4.id AS p4_id, p4.singular as p4_singular, p4.has_responsavel as p4_has_responsavel, p4.has_supervisor as p4_has_supervisor, p4.has_equipe as p4_has_equipe, p4.menu as p4_menu, p4.descricao as p4_descricao, p4.ordem as p4_ordem, p4.programacao_id as p4_programacao_id, p4.equipe as p4_equipe, p4.responsavel as p4_responsavel, p4.supervisor as p4_supervisor, p4.instrumento_id as p4_instrumento_id
//                            FROM    vw_report_base p4 RIGHT JOIN n3 on p4.programacao_id=n3.p3_id),
//                    n5 as (
//                            SELECT n4.*, p5.id AS p5_id, p5.singular as p5_singular, p5.has_responsavel as p5_has_responsavel, p5.has_supervisor as p5_has_supervisor, p5.has_equipe as p5_has_equipe, p5.menu as p5_menu, p5.descricao as p5_descricao, p5.ordem as p5_ordem, p5.programacao_id as p5_programacao_id, p5.equipe as p5_equipe, p5.responsavel as p5_responsavel, p5.supervisor as p5_supervisor, p5.instrumento_id as p5_instrumento_id
//                            FROM    vw_report_base p5 RIGHT JOIN n4 on p5.programacao_id=n4.p4_id)		        
//            SELECT * FROM n5 order by p1_id,p2_id,p3_id  
        $query = " ";
    }
    public function getInputStream( $value){
        
        $out = new Java("java.io.ByteArrayOutputStream");

          $arr = array();
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
