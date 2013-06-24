<?php

namespace EtcReport\Jasper\Manager;
/**
 * Description of JRDesign
 *
 * @author marcone
 */
class JasperReport extends \EtcReport\Jasper\Manager\JRBaseReport {
    
    public function __construct($jJasperReport) {
        $this->_JRBaseReport = $jJasperReport;
    }
    /**
     * 
     * @return java(net.sf.jasperreports.engine.JasperReport)
     */
    public function toJavaObject(){
        return $this->_JRBaseReport;
    }
    
    /**
     * @TODO implementar métodos abaixo
     */
//    public function getCompileData(){
//        
//    }
//    public function getCompileNameSuffix(){
//        
//    }
//
//    public function getCompilerClass(){
//        
    //}
}
