<?php

namespace Etc\Jasper;
use \EtcReport\Jasper\Manager\JasperDesign,
 \EtcReport\Jasper\Java\JRDesignBand;

/* no java_require() include the java.inc for PHP/Java Bridge */
if ( ! function_exists('java_require') ) {
    require_once("http://localhost:8080/JavaBridge/java/Java.inc"); 
}

/* declare this, it doesn't exist with Zend Java, but is needed for PHP/Java Bridge */
if ( ! function_exists('java_cast')) {
    function java_cast($whatever) {
        return $whatever;
    }
}
/**
 *
 * @author Marcone Costa
 */
class Reports {

    private $_reportsPath;

    public function __construct()
    {
       
    }
    public function addFields(){
        
    }
    public function sxml_append(SimpleXMLElement $to, SimpleXMLElement $from) {
        $toDom = dom_import_simplexml($to);
        $fromDom = dom_import_simplexml($from);
        $toDom->appendChild($toDom->ownerDocument->importNode($fromDom, true));
    }
    /**
     * 
     * @param string $jrxml
     * @param type $xpath
     * @return  \SimpleXMLElement
     */
    public function getReportXml($jrxml, $xpath = false)
    {
        if (!file_exists($jrxml))
            $jrxml = $this->getReportsPath() . $jrxml . '.jrxml';
        $reportXml = simplexml_load_file($jrxml);
        $reportXml->registerXPathNamespace('n',
                'http://jasperreports.sourceforge.net/jasperreports');
        return $reportXml->xpath($xpath);
    }

    function initReport($username, $password, $dataSourceServerUrl)
    {
        $this->_objStream = new Java("java.io.ByteArrayOutputStream");
        $this->_objJep = new Java("net.sf.jasperreports.engine.JRExporterParameter");
        $objClass = new Java("java.lang.Class");
        $objClass->forName("org.postgresql.Driver");
        $objDbm = new Java("java.sql.DriverManager");
        $this->_objDbConnect = $objDbm->getConnection($dataSourceServerUrl,
                $username, $password);
        return;
    }


    public function _makeJasperConnection()
    {

        $conf = \Zend_Registry::get('config');
        $dbConf = $conf->resources->db->params;
        $dbUrl = "jdbc:postgresql://{$dbConf->host}/{$dbConf->dbname}";

        $javaClass = new \java('java.lang.Class');
        $javaClass->forName("org.postgresql.Driver");
        $objDbm = new \Java("java.sql.DriverManager");
        $this->_conn = $objDbm->getConnection($dbUrl, $dbConf->username, $dbConf->password);
        return $this->_conn;
    }
    /**
     * 
     * @param type $query
     * @return JasperDesign
     */
    public function setQuery($query){
                
        $jDesignQuery = new \java('net.sf.jasperreports.engine.design.JRDesignQuery');
        $jDesignQuery->setText($query);
        $this->_jJasperDesign->setQuery($jDesignQuery);  
        return $this->_jJasperDesign;
    }

    private $_sJcm, $_report, $_JRXmlLoader = null;

    public function getJasperCompileManager()
    {
        if (!$this->_sJcm)
            $this->_sJcm = new \Java("net.sf.jasperreports.engine.JasperCompileManager");
        return $this->_sJcm;
    }

    /**
     * 
     * @param type $reportFileName
     * @return \App\Service\JasperReports
     */
    public function compileFileReport($reportFileName)
    {
        if ($this->_report === null)
            $this->_report = $this->getJasperCompileManager()->compileReport($reportFileName);
        return $this;
    }

    public function compileLoadedReport($reportDesign)
    {
        $this->_report = $this->getJasperCompileManager()->compileReport($reportDesign);
        return $this;
    }

    public function getReport()
    {
        return $this->_report;
    }

    public function setReport($report)
    {
        $this->_report = $report;
    }

    public function getJRXmlLoader()
    {

        if ($this->_JRXmlLoader === null)
            $this->_JRXmlLoader = new \Java("net.sf.jasperreports.engine.xml.JRXmlLoader");
        return $this->_JRXmlLoader;
    }

    public function load($reportFileName)
    {
        $this->_jJasperDesign = $this->getJRXmlLoader()->load($reportFileName);
        return $this->_jJasperDesign;
    }
    public function loadXml($xml){
        return $this->getJRXmlLoader()->loadXML($xml);
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
     * Compila o arquivo .jrxm em um arquivo .jasper
     * @deprecated since version number
     */
    public function compileReport($reportFileName, $format = 'pdf',
            $params = array())
    {
        $reportsPath = $this->getReportsPath();
        try
        {
            $Conn = $this->_makeJasperConnection();
            $this->compileFileReport($reportsPath . $reportFileName . ".jrxml");
            $report = $this->getReport();
            $sJfm = new \Java("net.sf.jasperreports.engine.JasperFillManager");
            $map = new \Java("java.util.HashMap");
            $map_params = $this->getParamsFromReport($reportFileName, true);
            foreach ($params as $paramName => $value)
            {
                $param = $map_params[$paramName];
                $value = $value ? $value : null;
                if ($value != null)
                {
                    if (is_object($param['class']))
                    {
                        switch ($param['class']->__toString())
                        {
                            case 'java.sql.Date':
                                $zd = new \Zend_Date($value);
                                $gregCal = new \Java("java.util.GregorianCalendar",
                                        (int) $zd->get(\Zend_Date::YEAR)
                                        ,
                                        (int) $zd->get(\Zend_Date::MONTH)
                                        , (int) $zd->get(\Zend_Date::DAY));
                                $jdata = new \Java('java.sql.Timestamp',
                                        $gregCal->getTimeInMillis());
                                $value = $jdata;
                                break;
                            case 'java.sql.Timestamp':

                                $zd = new \Zend_Date($value);
                                $gregCal = new \Java("java.util.GregorianCalendar",
                                        (int) $zd->get(\Zend_Date::YEAR)
                                        ,
                                        (int) $zd->get(\Zend_Date::MONTH)
                                        ,
                                        (int) $zd->get(\Zend_Date::DAY)
                                        ,
                                        (int) $zd->get(\Zend_Date::HOUR)
                                        ,
                                        (int) $zd->get(\Zend_Date::MINUTE)
                                        , (int) $zd->get(\Zend_Date::SECOND));

                                $jdata = new \Java('java.sql.Timestamp',
                                        $gregCal->getTimeInMillis());
                                $value = $jdata;
                            default:
                                break;
                        }
                    }
                }
                $map->put($param['name']->__toString(), $value);
                $map->put("REPORT_LOCALE",
                        new \Java('java.util.Locale', "pt", "BR"));
                //java.text.NumberFormat.getCurrencyInstance(new Locale("pt","br")).format($F{suaField}.doubleValue())  
            }
            $map->put('SUBREPORT_DIR', $this->getReportsPath());
            $map->put('APPLICATION_PATH', APPLICATION_PATH);
            $map->put('pcs_param.IMAGES_PATH',
                    APPLICATION_PATH . '/../public/img/');
            $print = $sJfm->fillReport(
                    $report, $map, $this->_conn
            );
            if ($format == 'pdf')
            {
                $sJem = new \Java("net.sf.jasperreports.engine.JasperExportManager");
                $sJem->exportReportToPdfFile($print,
                        APPLICATION_PATH . '/../public/cache/' . $reportFileName . ".pdf");

                if (file_exists(APPLICATION_PATH . '/../public/cache/' . $reportFileName . ".pdf"))
                {

                    ob_clean();
                    header('Content-disposition: inline; filename="' . $reportFileName . '.pdf"');
                    header('Content-Type: application/pdf');
                    header('Content-Transfer-Encoding: binary');
                    header('Content-Length: ' . @filesize(APPLICATION_PATH . '/../public/cache/' . $reportFileName . ".pdf"));
                    header('Pragma: no-cache');
                    header('Cache-Control: must-revalidate, post-check=0, pre-check=0');
                    header('Expires: 0');
                    set_time_limit(0);
                    ob_flush();
                    ob_flush();
                    @readfile(APPLICATION_PATH . '/../public/cache/' . $reportFileName . ".pdf");
                    ob_flush();
                    die;
                } else
                {
                    throw new \Exception("Arquivo não foi criado");
                }
            } else
            {
                $sJem = new \Java("net.sf.jasperreports.engine.JasperExportManager");
                //$sJem->exportReportToHtmlFile($print, APPLICATION_PATH . '/../tmp/' . $reportFileName . ".html");

                if (file_exists(APPLICATION_PATH . '/../public/cache/' . $reportFileName . ".html"))
                {
                    $this->view->filename = APPLICATION_PATH . '/../public/cache/' . $reportFileName . ".html";
                }
            }
        } catch (\net\sf\jasperreports\engine\JRException $ex)
        {

            echo $e->toString();
        } catch (\NoClassDefFoundError $ex)
        {

            echo $e->toString();
        } catch (\JavaClassCastException $ex)
        {
            $this->_helper->viewRenderer->setNoRender(true);
            print "jclass cast: " . $ex;
        } catch (\FileNotFoundException $ex)
        {
            $this->_helper->viewRenderer->setNoRender(true);
            print "jclass cast: " . $ex->toString();
        } catch (\JavaException $ex)
        {
            $exStr = $ex->toString();
            echo "Exception occured; mixed trace: $exStr\n";
            $trace = new \java("java.io.ByteArrayOutputStream");
            $ex->printStackTrace(new \java("java.io.PrintStream", $trace));
            print "java stack trace: $trace\n";
        } catch (\Exception $e)
        {
            print_r($e->message());die;
            
            throw new \Exception('Houve um problema ao renderizar o relatório selecionado.');
        }
    }

    public function getReportsPath()
    {
        if (!$this->_reportsPath)
            $this->setReportsPath(\Etc\Tools::getBasePath() . '/library/Reports/');
        return $this->_reportsPath;
    }

    public function setReportsPath($path)
    {
        $this->_reportsPath = $path;
    }

    public function getParamsFromReport($reportName)
    {
        $map_params = $this->getReportXml($reportName,
                '/n:jasperReport/n:parameter');

        $arr_params = array();
        foreach ($map_params as $value)
        {
            $key = str_replace('.', '_', $value['name']);
            $arr_params[$key] = $value;
        }

        return $arr_params;
    }

}

class MyJasper {

    private $_objDbConnect;
    private $_objJep;
    private $_objPrint;
    private $_objReport;
    private $_objStream;

    function __construct($username, $password, $dataSourceServerUrl)
    {
        $this->initReport($username, $password, $dataSourceServerUrl);
    }

    function initReport($username, $password, $dataSourceServerUrl)
    {
        $this->_objStream = new Java("java.io.ByteArrayOutputStream");
        $this->_objJep = new Java("net.sf.jasperreports.engine.JRExporterParameter");
        $objClass = new Java("java.lang.Class");
        $objClass->forName("org.postgresql.Driver");
        $objDbm = new Java("java.sql.DriverManager");
        $this->_objDbConnect = $objDbm->getConnection($dataSourceServerUrl,
                $username, $password);
        return;
    }

    public function compileReport($jrxmlReport)
    {
        $objJcm = new Java("net.sf.jasperreports.engine.JasperCompileManager");
        $this->_objReport = $objJcm->compileReport($jrxmlReport);
        return;
    }

    public function setParams($mapArray)
    {
        $map = new Java("java.util.HashMap");
        foreach ($mapArray as $key => $value)
        {
            $map->put($key, $value);
        }
        $objJfm = new Java("net.sf.jasperreports.engine.JasperFillManager");
        $this->_objPrint = $objJfm->fillReport($this->_objReport, $map,
                $this->_objDbConnect);
        return;
    }

    public function toPrinter()
    {
        $objJhe = new Java("net.sf.jasperreports.engine.export.JRPrintServiceExporter");
        $prn = $objJhe->checkAvailablePrinters();
        if ($prn)
        {
            $objJhe->setParameter($this->_objJep->JASPER_PRINT, $this->_objPrint);
            $objJhe->exportReport();
        }
        return;
    }

    public function toPDF($fileName = "")
    {
        $objJhe = new Java("net.sf.jasperreports.engine.export.JRPdfExporter");
        $objJhe->setParameter($this->_objJep->JASPER_PRINT, $this->_objPrint);
        if ($fileName == "")
        {
            $objJhe->setParameter($this->_objJep->OUTPUT_STREAM,
                    $this->_objStream);
            $objJhe->exportReport();
            header("Content-type: application/pdf");
            echo java_cast($this->_objStream->toByteArray(), "S");
        } else
        {
            $objJhe->setParameter($this->_objJep->OUTPUT_FILE_NAME, $fileName);
            $objJhe->exportReport();
        }

        return;
    }

    public function toHtml()
    {
        $objJhe = new Java("net.sf.jasperreports.engine.export.JRHtmlExporter");
        $objJhe->setParameter($this->_objJep->JASPER_PRINT, $this->_objPrint);
        $objJhe->setParameter($this->_objJep->OUTPUT_STREAM, $this->_objStream);
        $objJhe->exportReport();
        echo $this->_objStream->toString();
        return;
    }

    public function hasPrinter()
    {
        $objJhe = new Java("net.sf.jasperreports.engine.export.JRPrintServiceExporter");
        $prn = $objJhe->checkAvailablePrinters();
        return $prn;
    }

}