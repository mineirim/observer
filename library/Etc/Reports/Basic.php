<?php


namespace Etc\Reports;

/**
 * Description of Basic
 *
 * @author marcone
 */
class Basic {
    private $_reportFileName;
    private $_reportParams=[];
    public function __construct() {
        $this->_reportsPath = APPLICATION_PATH . '/modules/relatorio/views/scripts/index/';
    }
    public function getReportsPath(){
        return $this->_reportsPath;
    }
    public function setReportsPath($paht) {
        $this->_reportsPath = $paht;
    }
    public function init($params) {
        $this->_reportFileName = 'geral';       
        $this->jasper_reports = new \Etc\Jasper\Reports();   
        $this->jasper_reports->setReportsPath($this->_reportsPath);
        $programacoes_table = new \Data_Model_DbTable_Programacoes();
        $instrumentos_table = new \Data_Model_Instrumentos();
        $compositeId = split('-', $params['id']);
        if(count($compositeId)>1){
            switch ($compositeId[0]){
                case 'instrumentoId':
                    $instrumento_id = $compositeId[1];
                    $estrutura = $instrumentos_table->getRecursiveStructure($instrumento_id);
                    break;
                case 'projetoId':
                    $estrutura = $instrumentos_table->getRecursiveStructure(1);
                    $params['projeto_id'] = $compositeId[1];
                    break;
            }
        }else{
            $programacao_id = $params['id'];
            $programacao_row = $programacoes_table->fetchRow('id='.$programacao_id);
            $estrutura = $instrumentos_table->getRecursiveStructure($programacao_row->instrumento_id);
        }
        /**
         * @var $numHeaders Número de cabeçalhos que serão apresentados */
        $numHeaders = $estrutura->rowCount();        
       
        $this->jasper_reports->setReportsPath($this->getReportsPath());
        $xml_report = $this->jasper_reports->getReportXml($this->_reportFileName, '/n:jasperReport');
        
        $xml_report_group = $this->jasper_reports->getReportXml($this->_reportFileName, '/n:jasperReport/n:group[@name="nivel"]');
        $xml_group_base = $xml_report_group[0]->asXML();
        $dom_group_base = \dom_import_simplexml($xml_report_group[0]);
        $dom_report = \dom_import_simplexml($xml_report[0]);
        $dom_report->removeChild($dom_report->getElementsByTagName('group')->item(0));       
        $estrutura_arr  = $estrutura ->fetchAll();        
        $sql =false;        
        $order = array();
        for ( $ix =1 ; $ix< $numHeaders; $ix ++  )
        {            
            $value = $estrutura_arr[$ix];        
            if(isset($programacao_row) && $programacao_row->instrumento_id == $value->id){
                $filter_id = $programacao_row->id;
            }else{
                if($estrutura_arr[0]->id ===$programacao_row->instrumento_id){
                    $filter_id = $programacao_row->id;
                }else{
                    $filter_id=false;
                }
            }
            $sql  .= $sql ? ", " : ""; 
            $sql  .= $this->getQuery($ix, $value, $filter_id);
            $px ="p".$ix."_";
            $order[]= 'p'.$ix.'_id';
            if($ix > 0 && $ix< $numHeaders-1){                
                $xml_text = str_replace('p1_', $px, $xml_group_base);
                $xml_text = str_replace('nivel', $px.'nivel', $xml_text);
                $node_new = new \SimpleXMLElement($xml_text);
                $dom_group_xml  = \dom_import_simplexml($node_new);
                $dom_group  = $dom_report->ownerDocument->importNode($dom_group_xml , TRUE);
                unset($dom_group_xml);
                $node = $dom_report->getElementsByTagName("background")->item(0);
                $dom_report->insertBefore($dom_group,$node);
            }                    
        }       
        $ix--;
        if(isset($params['projeto_id']) && $params['projeto_id'] !==""){
            $this->_reportParams['projeto_id'] =(int)$params['projeto_id'];
            $projetoWhere = "\n WHERE n{$ix}.p{$ix}_projeto_id=".$params['projeto_id'] ;
        }
            
        $sql .= " SELECT * FROM n{$ix} {$projetoWhere} order by " . implode(',', $order);     
        $xml_report_text = str_replace('__detail_', $px, $xml_report[0]->asXML());
        $is = $this->getInputStream($xml_report_text);
        /* @var $jasperDesign \EtcReport\Jasper\Manager\JasperDesign */
        $jasperDesign = $this->jasper_reports->load($is);          
        for ( $ix =2 ; $ix< $numHeaders; $ix ++  )
        {            
            $value = $estrutura_arr[$ix];       
            if($ix > 0 && $ix< $numHeaders-1){
                $this->addFields($jasperDesign, $ix);
            }                    
        }        
        $this->jasper_reports->setQuery($sql);
        $this->jasper_reports->compileLoadedReport($jasperDesign);
    }
    public function display() {
        $this->jasper_reports->compileReport('geral','pdf',$this->_reportParams);        
    }
    public function saveHTML() {
        $manager = new \Etc\Jasper\Manager();
        $report = new \Etc\Jasper\Report();
        $report->setReport($this->jasper_reports->getReport());
        $manager->setReport($report);
        return $manager->saveAsHTML();
                
    }
    /**
     * @param \EtcReport\Jasper\Manager\JasperDesign $jasperDesign
     * @param int $seq
     */
    private function addFields( $jasperDesign, $seq){
        $fields =array(
            	array('name'=>'id' ,'class'=>'java.lang.Integer'),
                array('name'=>'singular' ,'class'=>'java.lang.String'),
                array('name'=>'has_responsavel' ,'class'=>'java.lang.Boolean'),
                array('name'=>'has_supervisor' ,'class'=>'java.lang.Boolean'),
                array('name'=>'has_equipe' ,'class'=>'java.lang.Boolean'),
                array('name'=>'menu' ,'class'=>'java.lang.String'),
                array('name'=>'descricao' ,'class'=>'java.lang.String'),
                array('name'=>'ordem' ,'class'=>'java.lang.Integer'),
                array('name'=>'programacao_id' ,'class'=>'java.lang.Integer'),
                array('name'=>'equipe' ,'class'=>'java.lang.String'),
                array('name'=>'responsavel' ,'class'=>'java.lang.String'),
                array('name'=>'supervisor' ,'class'=>'java.lang.String'),
                array('name'=>'instrumento_id' ,'class'=>'java.lang.Integer'),
        );
        foreach ($fields as $value) {
            /* @var $jField \EtcReport\Jasper\Java\JRDesignField  */
             $jField = new \Java('net.sf.jasperreports.engine.design.JRDesignField');
             $jField->setName('p'.$seq.'_'. $value['name']);
             $jField->setValueClassName($value['class']);
             $jasperDesign->addField($jField);
        }
	
    }
    private function getQuery($ix, $estrutura, $filter_id=false){
        
        if($ix==1){
            $where = $filter_id ? " AND p{$ix}.id=".$filter_id:" ";
            $template = "WITH 	n1 as ( SELECT  p1.id AS p1_id, p1.singular as p1_singular, p1.has_responsavel as p1_has_responsavel, p1.has_supervisor as p1_has_supervisor, p1.has_equipe as p1_has_equipe, p1.menu as p1_menu, p1.descricao as p1_descricao, p1.ordem as p1_ordem, p1.programacao_id as p1_programacao_id, p1.equipe as p1_equipe, p1.responsavel as p1_responsavel, p1.supervisor as p1_supervisor, p1.instrumento_id as p1_instrumento_id, p1.projeto_id as p1_projeto_id
                            FROM  vw_report_base p1 WHERE p1.programacao_id is null and p1.instrumento_id={$estrutura->id} {$where})";
        }else{
            $join = $filter_id ? " INNER " : " RIGHT ";
            $where = $filter_id ? " WHERE p{$ix}.id=".$filter_id:" ";
            $template = "n__ix__ as (
                                SELECT n__iy__.*, p__ix__.id AS p__ix___id, p__ix__.singular as p__ix___singular, p__ix__.has_responsavel as p__ix___has_responsavel, p__ix__.has_supervisor as p__ix___has_supervisor, p__ix__.has_equipe as p__ix___has_equipe, p__ix__.menu as p__ix___menu, p__ix__.descricao as p__ix___descricao, p__ix__.ordem as p__ix___ordem, p__ix__.programacao_id as p__ix___programacao_id, p__ix__.equipe as p__ix___equipe, p__ix__.responsavel as p__ix___responsavel, p__ix__.supervisor as p__ix___supervisor, p__ix__.instrumento_id as p__ix___instrumento_id, p__ix__.projeto_id as p__ix___projeto_id 
                                FROM    vw_report_base p__ix__ {$join} JOIN n__iy__ on p__ix__.programacao_id=n__iy__.p__iy___id $where
                         )";
        }
        $query = str_replace('__ix__', $ix, $template);
        $query = str_replace('__iy__', $ix -1, $query);
        return $query;
    }
    public function getInputStream( $value){
        
        $out = new \Java("java.io.ByteArrayOutputStream");

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

          $value = new \Java("java.io.ByteArrayInputStream", $out->toByteArray());
          return $value;
    }
}
