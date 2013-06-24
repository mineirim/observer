<?php

namespace EtcReport\Jasper\Manager;

/**
 * Description of JasperFillManager
 *
 * @author marcone
 */
class JasperFillManager {
    private $_jJasperFillManager  =null;
    public function __construct() {
        $this->_jJasperFillManager = new \Java("net.sf.jasperreports.engine.JasperFillManager");
    }
    /**
     * 
     * @param type $jasperReport
     * @param type $parameters
     * @param type $connection
     * @return EtcReport\Jasper\Manager\JasperPrint
     */
    public function fillReport($jasperReport, $parameters, $connection) {
        
        $jJasperPrint = $this->toJavaObject()->fillReport($jasperReport->toJavaObject(), $parameters, $connection);
        $jasperPrint = new \EtcReport\Jasper\Manager\JasperPrint ($jJasperPrint);
        return $jasperPrint;
    }
    public function toJavaObject() {
        return $this->_jJasperFillManager;
    }
    
    public function __invoke() {
        return $this->_jJasperFillManager;
    }
}

?>
