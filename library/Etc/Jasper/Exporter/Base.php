<?php
namespace Etc\Jasper\Exporter;

/**
 * Description of Base
 *
 * @author Marcone Costa <marcone@barraetc.com.br>
 */
class Base {
    protected $_outputname;
    protected $_jExportManager;
    
    /**
     * @var \Etc\Jasper\Engine\JRExporterParameter
     */
    protected $_jRExporterParameter;
    
    
    /**
     * @var \Etc\Jasper\Engine\JasperPrint
     */
    protected $_jasperPrint;
    public function __construct() {
        $this->_jRExporterParameter = java('net.sf.jasperreports.engine.JRExporterParameter');
    }
    /**
     * @return  \Etc\Jasper\Engine\JasperExportManager
     */
    public function getJasperExportManager(){
        
        if(!$this->_jExportManager){
            $this->_jExportManager =  new \Java('net.sf.jasperreports.engine.JasperExportManager');
        }
        return $this->_jExportManager;
    }
}
