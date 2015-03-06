<?php
namespace Etc\Jasper\Exporter;

/**
 * Description of Pdf
 *
 * @author Marcone Costa <marcone@barraetc.com.br>
 */
class Pdf extends \Etc\Jasper\Exporter\Base {
    private $_pdfExporterConfiguration;
    private $_jPdfExporter;
    public function __construct($jasperPrint, $outputname) {
        $this->_jasperPrint=$jasperPrint;
        $this->_outputname = $outputname;
    }
    
    private function getPdfExporterConfiguration(){
        if(!\is_object($this->_pdfExporterConfiguration)){
            $this->_pdfExporterConfiguration = new \java('net.sf.jasperreports.export.SimplePdfExporterConfiguration');
        }
        return $this->_pdfExporterConfiguration;
    }
    public function getPdfExporter(){

        if(!\is_object($this->_jPdfExporter)){
            $this->_jPdfExporter =  new \Java('net.sf.jasperreports.engine.export.JRPdfExporter');
        }
        return $this->_jPdfExporter;
    }
    public function setTitle(){
//exporter.setParameter(JRExporterParameter.JASPER_PRINT, jasperPrint);
//exporter.setParameter(JRExporterParameter.OUTPUT_FILE, outPath + outFile);
//exporter.setParameter(JRPdfExporterParameter.METADATA_AUTHOR, "Adnan");
//exporter.setParameter(JRPdfExporterParameter.METADATA_TITLE, "Title");
//// ...
//exporter.exportReport();        
    }

    function getExporterInput() {
        $exporterInput = new \java('net.sf.jasperreports.export.SimpleExporterInput',$this->_jasperPrint);
        return $exporterInput;
    }
    function getWriterExporter($filename){
        $writerExport = new \java('net.sf.jasperreports.export.SimpleOutputStreamExporterOutput',$filename);
        return $writerExport;
    }

    /**
     * Compila o arquivo .jrxm em um arquivo .jasper
     */
    public function display($forceDownload=false) {
        try {
                $sJem = $this->getPdfExporter();
                $tmpfile = \tempnam(APPLICATION_PATH . '/../public/cache/', 'tmp_jrpdf' ) ;
                \chmod($tmpfile, 0777);
                $sJem->setExporterInput($this->getExporterInput());
                $sJem->setExporterOutput($this->getWriterExporter($tmpfile));
                $conf = $this->getPdfExporterConfiguration();
                $conf->setMetadataTitle('Foco Monitoramento e Controle');
                $conf->setMetadataAuthor('Foco Monitoramento e Controle');
                try{
                    $conf->setDisplayMetadataTitle(\java('java.lang.Boolean')->TRUE);
                }catch(\Exception $e){
                    \error_log('versão antiga do jasper');
                }
                $sJem->setConfiguration($conf);
                $sJem->exportReport();
                if (file_exists($tmpfile)) {
                    ob_clean();
                    $this->setHeaders($tmpfile,$forceDownload);
                    set_time_limit(0);
                    ob_flush();
                    readfile($tmpfile);
                    ob_flush();
                    unlink($tmpfile);
                    die;
                } else {
                    throw new \Exception("Arquivo não foi criado");
                }
 
        } catch (\Exception $e) {
            var_dump($e);
            die;
            throw new \Exception('Houve um problema ao renderizar o relatório selecionado.');
        }
    }
    private function setHeaders($tmpfile, $forceDownload=false){
        if($forceDownload){
            header("Content-Disposition: attachment; filename=".$this->_outputname  . '.pdf"');
        }else{
            header('Content-disposition: inline; filename="' .  $this->_outputname  . '.pdf"');
        }
        header('Content-Type: application/pdf');
        header('Content-Transfer-Encoding: binary');
        header('Content-Length: ' . @filesize($tmpfile));
        header('Pragma: no-cache');
        header('Cache-Control: must-revalidate, post-check=0, pre-check=0');
        header('Expires: 0');
        return $this;
    }    
    public function toFile($dest=null,$format = 'pdf') {
        if ($dest!=null){
            $this->_outputname= APPLICATION_PATH . '/../library/Uploads/RelatorioDesempenho/'.time().'.pdf';
        }
        try {
            $sJem = $this->getJasperExportManager();
            if ($format == 'pdf') {
              $sJem->exportReportToPdfFile($this->_jasperPrint, $this->_outputname);
              if (file_exists($this->_outputname)) {
                    return $this->_outputname;
                } else {
                    throw new \Exception("Arquivo não foi criado");
                }
            }elseif($format=='html'){
                $this->saveHtmlFile($this->_outputname);
              if (file_exists($this->_outputname)) {
                    return $this->_outputname;
                } else {
                    throw new \Exception("Arquivo não foi criado");
                }                
            }else {
               throw new \Exception('Formato não suportado.');
            }
        } catch (\Exception $e) {
            throw new \Exception('Houve um problema ao renderizar o relatório selecionado.');
        }        
    }
}
