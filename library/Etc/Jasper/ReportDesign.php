<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace Etc\Jasper;

/**
 * Description of ReportDesign
 *
 * @author marcone
 */
class ReportDesign {
    private $_JRXmlLoader;
    private $_jasperDesign=null;
    public function __construct($filename=null) {
        if($filename!==null){
            $this->loadJrxml($filename);
        }
    }
    public function getJRXmlLoader() {

        if ($this->_JRXmlLoader === null){
            $this->_JRXmlLoader = new \Java("net.sf.jasperreports.engine.xml.JRXmlLoader");
        }
        return $this->_JRXmlLoader;
    }       
    /**
     * @param type $jrxml
     * @return \Etc\Jasper\Engine\Design\JasperDesign
     */
    public function loadJrxml($jrxml) {
        $this->_reportName  = $jrxml;
        $this->_jasperDesign = $this->getJRXmlLoader()->load($jrxml);
        return $this->_jasperDesign;
    }
    /**
     * @return \Etc\Jasper\Engine\Design\JasperDesign
     */
    public function getJasperDesign(){
        return $this->_jasperDesign;
    }
}
