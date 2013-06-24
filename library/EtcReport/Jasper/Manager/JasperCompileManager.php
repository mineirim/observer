<?php
namespace EtcReport\Jasper\Manager;

/**
 * Description of CompileManager
 *
 * @author marcone
 */
class JasperCompileManager {
    private $_jJasperCompileManager;
    public function __construct() {
         $this->_jJasperCompileManager = new \Java("net.sf.jasperreports.engine.JasperCompileManager");
    }
    public function toJavaObject(){
        return $this->_jJasperCompileManager;
    }
    /**
     * @return EtcReport\Jasper\Manager\JasperReport Description
     */
    public function compileReport($jrxmlReport){
        $jJasperReport = $this->_jJasperCompileManager->compileReport($jrxmlReport);
        return new \EtcReport\Jasper\Manager\JRBaseReport($jJasperReport);
    }

}

?>
