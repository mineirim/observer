<?php

namespace EtcReport\Jasper\Manager;
/**
 * Description of JasperPrint
 *
 * @author marcone
 */
class JasperPrint {
    private $_jJasperPrint=null;
    public function __construct($jJasperPrint) {
        $this->_jJasperPrint = $jJasperPrint;
    }

    public function toJavaObject(){
        return $this->_jJasperPrint;
    }
}

?>
