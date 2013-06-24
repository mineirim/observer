<?php
/**
 * Description of Service
 *
 * @author marcone
 */

namespace EtcReport\Service;

use EtcReport\Jasper\Loader;
use EtcReport\Jasper\Manipulate;
use Zend\ServiceManager\ServiceLocatorAwareInterface;
use Zend\ServiceManager\ServiceLocatorInterface;
class Jasper implements ServiceLocatorAwareInterface {

    protected $serviceLocator;

    public function setServiceLocator(ServiceLocatorInterface $serviceLocator) {
        $this->serviceLocator = $serviceLocator;
    }

    public function getServiceLocator() {
        return $this->serviceLocator;
    }
    private $_reportPath;
    private $_manipulate, $_objDbConnect, $_fileName =null;
    public function __construct() {
        
       
    }
    /**
     * 
     * @return Manipulate
     */
    private function getManipulate(){
        if(!$this->_manipulate)
            $this->_manipulate= new Manipulate();
        return $this->_manipulate;
    }
    public function setJrxml($file){
        $this->_fileName = $file;
    }
    public function getAsXml(){
        
    }
    public function setDefaultParams(){
        
    }
    public function listParams(){
        
    }
    public function getConnection(){
        if(is_null($this->_objDbConnect))
            $this->_createConnection ();
        return $this->_objDbConnect;
    }
    private function _createConnection(){
        
        $connection = $this->getServiceLocator()->get('netpconnection');
        $uri = $connection->getUri();
        
        $objClass = new \Java("java.lang.Class");
        $objClass->forName("com.mysql.jdbc.Driver");
        $objDbm = new \Java("java.sql.DriverManager");
        $this->_objDbConnect = $objDbm->getConnection($uri ,
                $connection->getUsername(), $connection->getPassword());
        return $this;
    }
    

    public function getReportsPath() {
        if(!$this->_reportPath)
            $this->_reportPath = getcwd().'/module/EtcReport/reports/';
        return $this->_reportPath;
    }
    public function sentToPrint($objPrint){
        $objStream = new Java("java.io.ByteArrayOutputStream");
        $objJep = new Java("net.sf.jasperreports.engine.JRExporterParameter");
        $objJhe = new Java("net.sf.jasperreports.engine.export.JRPdfExporter");
        $objJhe->setParameter($objJep->JASPER_PRINT, $objPrint );
        $objParam = new Java("net.sf.jasperreports.engine.export.JRPdfExporterParameter");
        //this is the script to automatically print the exported jasper PDF report
        $scrpt = "this.print({bUI: false, bSilent: true, bShrinkToFit: false});this.closeDoc;";
        $objJhe->setParameter($objJep->OUTPUT_STREAM,$objStream);
        $objJhe->setParameter($objParam->PDF_JAVASCRIPT,$scrpt);
        $objJhe->exportReport();
        header("Content-type: application/pdf");
        echo java_cast($objStream->toByteArray(),"S");        
    }    
    /**
     * @var $params array
     * @return Jasper Jasper service
     */
    public function setParams($params){
        $this->getManipulate()->addParams($params);
        return $this;
    }
    public function displayAsPDF($reportName){
        
        
        $this->getManipulate()->compileReport($this->getReportsPath() . $reportName .'.jrxml');
        $this->getManipulate()->setConnection($this->getConnection());
                
        $this->getManipulate()->toPDF();
    }
}

?>
