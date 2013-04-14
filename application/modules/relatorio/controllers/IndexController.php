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
        
        $estrutura = $instrumentos_table->getRecursiveStructure($programacao_row->id);
        $numHeaders = $estrutura->rowCount();
        
        $script_paths =$this->view->getScriptPaths();
        $jasper_reports->setReportsPath($script_paths[0]."index/");
        $xml_report = $jasper_reports->getReportXml('geral', '/n:jasperReport');
        $xml_report_group = $jasper_reports->getReportXml($reportFileName, '/n:jasperReport/n:group[@name="nivel"]');
        $strXml = $xml_report_group[0]->asXML();
        $dom_group_base = dom_import_simplexml($xml_report_group[0]);
        $dom_report = dom_import_simplexml($xml_report[0]);
        $dom_report->removeChild($dom_report->getElementsByTagName('group')->item(0));
        
        $ix=1;
        while ($value = $estrutura ->fetch() )
        {            
            if($ix == $numHeaders-1)
                    break;
            $ix++;
            $px ="p".$value->id."_";
            
            $xml_text = str_replace('p1_', $px, $strXml);
            $xml_text = str_replace('nivel', $px.'nivel', $xml_text);

            $node_new = new SimpleXMLElement($xml_text);

            $dom_group  = dom_import_simplexml($node_new);
            $dom_group  = $dom_report->ownerDocument->importNode($dom_group , TRUE);
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
