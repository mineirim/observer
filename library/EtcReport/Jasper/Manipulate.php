<?php
namespace EtcReport\Jasper;

/**
 * Description of Manipulate
 *
 * @author marcone
 */
class Manipulate {


    private $_jDbConnect = null;
    private $_jExporterParameter;
    private $_phpJasperPrint;
    private $_phpJasperReport;
    private $_jJasperFillManager;
    private $_jOutputStream;
    private $_phpJasperCompileManager;
    private $_jHashMap;
    private $_reportName;

    function __construct()
    {
        $this->initReport();
    }
    /**
     * 
     * @return \EtcReport\Jasper\Manager\JasperFillManager
     */
    private function getJasperFillManager(){
        if(!$this->_jJasperFillManager)
            $this->_jJasperFillManager = new \EtcReport\Jasper\Manager\JasperFillManager; // new \Java("net.sf.jasperreports.engine.JasperFillManager");
        return $this->_jJasperFillManager;
    }
            
    function initReport()
    {
        $this->_jOutputStream = new \Java("java.io.ByteArrayOutputStream");
        $this->_jExporterParameter = new \Java("net.sf.jasperreports.engine.JRExporterParameter");
        $this->_jHashMap = new \Java("java.util.HashMap");
    }
    public function getConnection(){
     
        return $this->_jDbConnect;
    }
    
    public function setConnection($cnn){
        $this->_jDbConnect = $cnn;
    }
    
    public function compileReport($jrxmlReport)
    {
        $this->_phpJasperCompileManager = new \EtcReport\Jasper\Manager\JasperCompileManager;
        $this->_phpJasperReport = $this->_phpJasperCompileManager->compileReport($jrxmlReport);
        $this->_reportName = $this->_phpJasperReport-> getName();
        return this;
    }

    public function setParams($mapArray)
    {
        /*
         * @TODO limpar hashmap
         */
        $this->addParams($mapArray);
        return $this;
    }
    /**
     * 
     * @return java.util.HashMap
     */
    public function getMapParams(){
        return $this->_jHashMap;
    }
    public function addParams($mapArray){
        foreach ($mapArray as $key => $value)
        {
            $this->_jHashMap->put($key, $value);
        }
        return $this;
    }
    /**
     * 
     * @return \EtcReport\Jasper\Manager\JasperPrint
     */
    public function fillReport(){
        
        $this->_phpJasperPrint = $this->getJasperFillManager()->fillReport($this->_phpJasperReport, $this->getMapParams(),
                $this->getConnection());
        return $this->_phpJasperPrint;
    }
    /**
     * 
     * @return \EtcReport\Jasper\Manager\JasperPrint
     */
    public function getJasperPrint(){
        if(!$this->_phpJasperPrint)
            $this->fillReport();
        return $this->_phpJasperPrint;
    }
    public function toPrinter()
    {
        $jJhe = new \Java("net.sf.jasperreports.engine.export.JRPrintServiceExporter");
        $prn = $jJhe->checkAvailablePrinters();
        if ($prn)
        {
            $jJhe->setParameter($this->_jExporterParameter->JASPER_PRINT, $this->_phpJasperPrint->toJavaObject());
            $jJhe->exportReport();
        }
        return; 
    }
    private function setPDFHeaders($fileName){
            header('Content-disposition: inline; filename="' . $this->_phpJasperReport-> getName() . '.pdf"');
            header('Content-Type: application/pdf');
            header('Content-Transfer-Encoding: binary');
            header('Content-Length: ' . @filesize($fileName));
            header('Pragma: no-cache');
            header('Cache-Control: must-revalidate, post-check=0, pre-check=0');
            header('Expires: 0');
    }
    public function toPDF($fileName = "")
    {
        $jJhe = new \Java("net.sf.jasperreports.engine.export.JRPdfExporter");
        $jJhe->setParameter($this->_jExporterParameter->JASPER_PRINT, $this->getJasperPrint()->toJavaObject());
        if ($fileName == "")
        {
//            $jJhe->setParameter($this->_jExporterParameter->OUTPUT_STREAM,
//                    $this->_jOutputStream);
            $fileName= getcwd() . "/tmp/". time() . ".pdf";
            
            $jJhe->setParameter($this->_jExporterParameter->OUTPUT_FILE_NAME, $fileName);
            $jJhe->exportReport();
            ob_clean();
            $this->setPDFHeaders($fileName);
            
            @readfile($fileName);
            
            //echo $string;
            ob_flush();
            unlink($fileName);
            die;
            
        } else
        {
            $jJhe->setParameter($this->_jExporterParameter->OUTPUT_FILE_NAME, $fileName);
            $jJhe->exportReport();
        }

        return;
    }

    public function toHtml()
    {
        $jJhe = new \Java("net.sf.jasperreports.engine.export.JRHtmlExporter");
        $jJhe->setParameter($this->_jExporterParameter->JASPER_PRINT, $this->_phpJasperPrint);
        $jJhe->setParameter($this->_jExporterParameter->OUTPUT_STREAM, $this->_jOutputStream);
        $jJhe->exportReport();
        echo $this->_jOutputStream->toString();
        return;
    }

    public function hasPrinter()
    {
        $jJhe = new \Java("net.sf.jasperreports.engine.export.JRPrintServiceExporter");
        $prn = $jJhe->checkAvailablePrinters();
        return $prn;
    }
    /**
     * função criada exclusivamente para depurar os valores do hasmap quando necessário
     */
    private function __displayHashMap(){
        
        //Get Map in Set interface to get key and value
        $s=$this->_jHashMap->entrySet();
 
        //Move next key and value of Map by iterator
        $it=$s->iterator();
 
        while($it->hasNext())
        {
            // key=value separator this by Map.Entry to get key and value
            $m =$it->next();
 
            // getKey is used to get key of Map
            $key=(string)$m->getKey();
 
            // getValue is used to get value of key in Map
            $value=(String)$m->getValue();
 
            echo ("Key :" .$key ."  Value :" .$value . "<br>");
        }
        
        die;
    }
    

}