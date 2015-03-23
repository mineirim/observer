<?php

namespace Etc\Jasper;

/**
 * Description of Report
 *
 * @author Marcone Costa <marcone@barraetc.com.br>
 */
class Report {
    /** @var \Etc\Jasper\Engine\JasperReport */
    private $_jasperReport;

    private $_jHashMap;
    /**
     *
     * @var \Etc\Jasper\Engine\JasperReport 
     */
    private $_report ;
    
    private $_reportName;
    public function __construct() {
        
        $this->_jHashMap = new \Java("java.util.HashMap");
    }

   
    /**
     * 
     * @param type $jasper
     * @return \Etc\Jasper\Engine\JasperReport 
     */
    public function loadJasper($jasper){
        $this->_reportName  = $jasper;
        $this->_report = java('net.sf.jasperreports.engine.util.JRLoader')->loadObjectFromFile($jasper);
        return $this->_report;
    }    
    /**
     * 
     * @param \Etc\Jasper\Engine\JasperReport  $report
     */
    public function setReport($report){
        $this->_report = $report;
    }

    /**
     * @return java.util.HashMap
     */
    public function getMapParams(){
        return $this->_jHashMap;
    }
    /**
     * 
     * @param array $mapArray
     * @return \Etc\Jasper\Manager
     */
    public function addParams($mapArray){
        foreach ($mapArray as $key => $value)
        {
            $this->_jHashMap->put($key, $value);
        }
        return $this;
    }    
    /**
     * 
     * @param $reportDesign Etc\Jasper\Engine\Design
     * @return \Etc\Jasper\Report
     */
    public function compileLoadedReport($reportDesign) {
        $this->_report = $this->getJasperCompileManager()->compileReport($reportDesign);
        return $this;
    }
    
    public function getJasperCompileManager() {
        if (!$this->_sJcm)
            $this->_sJcm = new \Java("net.sf.jasperreports.engine.JasperCompileManager");
        return $this->_sJcm;
    }
    
    public function getDateFields($reportName) {
        $parameters =$this->_report->getParameters();
        $ret = array();
        foreach ($parameters as /* @var $param \Etc\Jasper\Engine\Design\JRDesignParameter */ $param) {
            if($param->hasProperties()){
                $fullName = (string) $param->getName();
                $properties =$param->getPropertiesMap();
                if ($properties && $properties->containsProperty('data')) {
                        $ret[] = str_replace('.', '_', $fullName);
                }
            }
        }
        return $ret;
    }

    public function getParamsFromReport() {
        $map_params =$this->_report->getParameters();
        $arr_params = array();
        foreach ($map_params as  /* @var $param \Etc\Jasper\Engine\Design\JRDesignParameter */ $param) {
            $key = str_replace('.', '_', $param->getName());
            $arr_params[$key] = $param;
        }

        return $arr_params;
    }

    public function configureParams($receivedParams) {
            $map_params = $this->getParamsFromReport();

            foreach ($receivedParams as $paramName => $value) {
                /* @var $param \Etc\Jasper\Engine\Design\JRDesignParameter */ 
                $param = isset($map_params[$paramName]) ?$map_params[$paramName] :null;
                $value = $value !== "" ? $value : null;
                if ($value !== null) {
                    if ($param) {
                        switch ($param->getValueClassName()) {
                            case 'java.sql.Date':
                                $zd = new \Zend_Date($value);
                                $gregCal = new \Java("java.util.GregorianCalendar", (int) $zd->get(\Zend_Date::YEAR)
                                        , (int) $zd->get(\Zend_Date::MONTH)
                                        , (int) $zd->get(\Zend_Date::DAY));
                                $jdata = new \Java('java.sql.Timestamp', $gregCal->getTimeInMillis());
                                $value = $jdata;
                            case 'java.sql.Timestamp':
                                $zd = new \Zend_Date($value);
                                $gregCal = new \Java("java.util.GregorianCalendar", (int) $zd->get(\Zend_Date::YEAR)
                                        , (int) $zd->get(\Zend_Date::MONTH)
                                        , (int) $zd->get(\Zend_Date::DAY)
                                        , (int) $zd->get(\Zend_Date::HOUR)
                                        , (int) $zd->get(\Zend_Date::MINUTE)
                                        , (int) $zd->get(\Zend_Date::SECOND));

                                $jdata = new \Java('java.sql.Timestamp', $gregCal->getTimeInMillis());
                                $value = $jdata;
                            case 'java.lang.Boolean' :
                                $value = new \Java('java.lang.Boolean', $value);
                            default:
                                $value = new \Java($param->getValueClassName(), $value);
                                break;
                        }
                    }
                }
                    
                if (!is_object($param)) {
                    unset($receivedParams[$paramName]);
                } else {
                    $this->addParams(array((string)$param->getName() => $value));
                }
            }
            $this->setDefaultParams();   
        
    }
    public function setDefaultParams(){
            $this->_jHashMap->put("REPORT_LOCALE", new \Java('java.util.Locale', "pt", "BR"));
            $this->_jHashMap->put('APPLICATION_PATH', APPLICATION_PATH);
            $this->_jHashMap->put('SUBREPORT_DIR', APPLICATION_PATH . '/modules/relatorio/views/scripts/index/');
    }
    
    /**
     * 
     * @return \Etc\Jasper\Engine\JasperReport
     */
    public function getJasperReport(){
        return $this->_report;
    }
}
