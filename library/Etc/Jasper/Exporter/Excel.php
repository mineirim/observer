<?php
namespace Etc\Jasper\Exporter;

/**
 * Description of Excel
 *
 * @author marcone
 */
class Excel extends \Etc\Jasper\Exporter\Base {
    
    public function __construct($jasperPrint, $outputname) {
        $this->_jasperPrint=$jasperPrint;
        $this->_outputname = $outputname;
    }
    
    public function getJasperExportManager() {
        if(!$this->_jExportManager){
            $this->_jExportManager =  new \Java('net.sf.jasperreports.engine.export.ooxml.JRXlsxExporter');
        }
        return $this->_jExportManager;
        
        
    }
    /**
     * Compila o arquivo .jrxm em um arquivo .jasper
     */
    public function display($forceDownload=false) {
        try {
                $sJem = $this->getJasperExportManager();

                $tmpfile = \tempnam(APPLICATION_PATH . '/../public/cache/', 'tmp_jrpdf' ) ;
                \chmod($tmpfile, 0777);
                $sJem->setParameter(java('net.sf.jasperreports.engine.export.JRXlsExporterParameter')->JASPER_PRINT, $this->_jasperPrint);
                $sJem->setParameter(java('net.sf.jasperreports.engine.export.JRXlsExporterParameter')->OUTPUT_FILE_NAME, $tmpfile);

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
        header("Content-Type: application/vnd.ms-excel");
        if($forceDownload){
            header("Content-Disposition: attachment; filename=".$this->_outputname  . '.pdf"');
        }else{
            header('Content-disposition: inline; filename="' .  $this->_outputname  . '.pdf"');
        }        
        header("Pragma: no-cache");
        header("Expires: 0");        
        header('Content-Length: ' . @filesize($tmpfile));
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
