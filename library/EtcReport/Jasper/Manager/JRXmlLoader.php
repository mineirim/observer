<?php
namespace EtcReport\Jasper\Manager;
/**
 * Description of Loader
 *
 * @author marcone
 */
class JRXmlLoader {
    private $_jJRXmlLoader;
    public function __construct(){
        $this->_jJRXmlLoader = new \Java("net.sf.jasperreports.engine.xml.JRXmlLoader");
    }
    /**
     * 
     * @return net.sf.jasperreports.engine.xml.JRXmlLoader
     */
    public function toJavaObject(){        
        return $this->_jJRXmlLoader;
    }
    /**
     * 
     * @param type $reportFileName
     * @return \EtcReport\Jasper\Manager\JasperDesign
     */
    public function load($reportFileName)
    {
        return $this->phpJasperDesignFactory($this->_jJRXmlLoader->load($reportFileName));
    }
    
    /**
     * 
     * @param type $reportFileName
     * @return \EtcReport\Jasper\Manager\JasperDesign
     */
    public function loadXml($xml){
        return $this->phpJasperDesignFactory($this->_jJRXmlLoader->loadXML($xml));
    }
    /**
     * 
     * @param \EtcReport\Jasper\Manager\JasperDesign $phpJasperDesign
     */
    public function setJasperDesign($phpJasperDesign) {
        $this->_jJRXmlLoader->setJasperDesign($phpJasperDesign->toJavaObject()) ;
    }
    /**
     * 
     * @return java(net.sf.jasperreports.engine.xml.XmlLoaderReportContext)
     */
    public function getReportContext(){
        return $this->_jJRXmlLoader->getReportContext();
    }
    
    /**
     * @return \EtcReport\Jasper\Manager\JasperDesign
     */
    private function phpJasperDesignFactory($jasperDesign){
        $phpJasperDesign = new \EtcReport\Jasper\Manager\JasperDesign($jasperDesign);
        return $phpJasperDesign;
    }
}

