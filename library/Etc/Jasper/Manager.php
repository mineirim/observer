<?php
namespace Etc\Jasper;

/**
 * Description of Manager
 *
 * @author Marcone Costa <marcone@barraetc.com.br>
 */
class Manager {
    private $_jDbConnect = null;
    private $_phpJasperPrint;
    private $_phpJasperReport;
    /** @var \Etc\Jasper\Engine\JasperFillManager */
    private $_jJasperFillManager;
    /** @var \Etc\Jasper\Engine\JasperCompileManager */
    private $_jasperCompileManager;

    private $_reportsPath = '/library/App/Reports/';

    private $_jOutputStream;
    /**
     *
     * @var \Etc\Jasper\Report
     */
    private $_report;
    
    private $_reportName;
    
    private $_conn=null;
    
    private $_xmlDS=null;
    /**
     * 
     * @param type $filename
     * @param type $params
     * @param type $type
     */
    public function __construct($filename=null, $params=array()){
        if($filename!==null){
            $this->_report =  new \Etc\Jasper\Report();
            $this->_reportName = $filename;
            $this->initReport();
            $this->_report->loadJasper($this->getReportsPath() . $this->_reportName . '.jasper');
            if($params!==null){
                $this->_report->configureParams($params);
            }
        }
    }
    /**
     * 
     * @param type $filename
     * @return \Etc\Jasper\ReportDesign
     */
    public function loadJrxml($filename){
        $this->_reportDesign = new \Etc\Jasper\ReportDesign($this->getReportsPath() . $filename);
        return $this->_reportDesign;        
    }
    function initReport()
    {
        $this->_jOutputStream = new \Java("java.io.ByteArrayOutputStream");
        $this->_jHashMap = new \Java("java.util.HashMap");
    }
    /**
     * @return  \Etc\Jasper\Engine\JasperFillManager
     */
    public function getJasperFillManager(){
        
        if(!$this->_jJasperFillManager){
            $this->_jJasperFillManager =  new \Java("net.sf.jasperreports.engine.JasperFillManager");
        }
        return $this->_jJasperFillManager;
    }
    /**
     * 
     * @return \Etc\Jasper\Engine\JasperCompileManager
     */
    public function getJasperCompileManager() {
        if (!$this->_jasperCompileManager){
            $this->_jasperCompileManager = new \Java("net.sf.jasperreports.engine.JasperCompileManager");
        }
        return $this->_jasperCompileManager;
    }
            
    
    public function getReportsPath() {
        return \Etc\Tools::getBasePath() .$this->_reportsPath;
    }
    public function setReportsPath($path) {
        $this->_reportsPath =$path;
    }
    public function displayAsPDF($header_name=null){
        $header_name = $header_name===null ? $this->_reportName :$header_name;
        
        $this->_jasperPrint = $this->getJasperFillManager()->fillReport(
                    $this->_report->getJasperReport(), $this->_report->getMapParams(), $this->getConnection()
            );
        $exporter = new \Etc\Jasper\Exporter\Pdf( $this->_jasperPrint, $header_name);
        $exporter->display();
    }
    public function displayAsXls($header_name=null){
        $header_name = $header_name===null ? $this->_reportName :$header_name;
        
        $this->_jasperPrint = $this->getJasperFillManager()->fillReport(
                    $this->_report->getJasperReport(), $this->_report->getMapParams(), $this->getConnection()
            );
        $exporter = new \Etc\Jasper\Exporter\Excel( $this->_jasperPrint, $header_name);
        $exporter->display();
    }
    /**
     * 
     * @param type $outputName
     * @return type
     */
    public function saveAsPDF($outputName=null){
        $outputName = $outputName===null ? $this->_reportName :$outputName;
        $this->_jasperPrint = $this->getJasperFillManager()->fillReport(
                    $this->_report->getJasperReport(), $this->_report->getMapParams(), $this->getConnection()
            );
        $exporter = new \Etc\Jasper\Exporter\Pdf( $this->_jasperPrint, $outputName);
        return $exporter->toFile();
    }
    public function saveAsHTML($filename=null){
        $outputName = $filename ? $filename:  \tempnam(APPLICATION_PATH . '/../tmp/', 'jrhtml' ) ;
        \chmod($outputName, 0777);
        $this->_report->setDefaultParams();
        $this->_jasperPrint = $this->getJasperFillManager()->fillReport(
                    $this->_report->getJasperReport(), $this->_report->getMapParams(), $this->getConnection()
            );
        $exporter = new \Etc\Jasper\HtmlExporter();
        $exporter->exportToHtmlFile($this->_jasperPrint, $outputName);
        return $outputName;        
    }

    public function setXmlDatasource($filename, $xpath=false){
        $context = java('net.sf.jasperreports.engine.DefaultJasperReportsContext')->getInstance();
        java('net.sf.jasperreports.engine.JRPropertiesUtil')->getInstance($context)->setProperty('net.sf.jasperreports.xpath.executer.factory','net.sf.jasperreports.engine.util.xml.JaxenXPathExecuterFactory');        
        if($xpath===false){
            $xpath=$this->_report->getJasperReport()->getQuery()->getText();
        }
        $file = new \java('java.io.File', $filename);
        $inputStream = new \java('java.io.FileInputStream',$file);
        //jasperReport.getQuery().getText()
        $this->_conn= new \java('net.sf.jasperreports.engine.data.JRXmlDataSource',$inputStream,$xpath);
                
    }
    /**
     * 
     * @param string $engine (java/php)
     * @return type
     */
    public function getConnection(){
        if(!isset($this->_conn)){
            $conn = new \Etc\Jasper\Connection();
            $this->_conn=$conn->getJConnection();
        }
        return $this->_conn;
    }

    /**
     * 
     * @return \Etc\Jasper\Report
     */
    public function getReport(){
        if(!isset($this->_report)){
            $this->_report = new \Etc\Jasper\Report();
        }
        return $this->_report;
    }
    public function setReport($report){
        $this->_report = $report;
    }

}
