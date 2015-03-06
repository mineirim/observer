<?php
namespace Etc\Jasper;
/**
 * Description of HtmlExporter
 *
 * @author marcone
 */
class HtmlExporter {
    
    public function exportToHtmlFile($jasperPrint, $outputPath){
//        $outputPath = realpath(".") . "\\" . "output.html";

        try {
            /* @var \Etc\Jasper\Engine\JasperExportManager */
            $exporter = new \java("net.sf.jasperreports.engine.export.JRHtmlExporter");
            
            $exporter->setParameter(\java("net.sf.jasperreports.engine.JRExporterParameter")->JASPER_PRINT, $jasperPrint);
            $exporter->setParameter(\java("net.sf.jasperreports.engine.JRExporterParameter")->OUTPUT_FILE_NAME, $outputPath);
            $exporter->setParameter(\java("net.sf.jasperreports.engine.JRExporterParameter")->IGNORE_PAGE_MARGINS, \java("java.lang.Boolean")->FALSE);
            $exporter->setParameter(\java("net.sf.jasperreports.engine.export.JRHtmlExporterParameter")->IS_USING_IMAGES_TO_ALIGN, \java("java.lang.Boolean")->FALSE);
            $exporter->setParameter(\java("net.sf.jasperreports.engine.export.JRHtmlExporterParameter")->IMAGES_DIR_NAME, APPLICATION_PATH . '/../public/cache/');
            $exporter->setParameter(\java("net.sf.jasperreports.engine.export.JRHtmlExporterParameter")->IMAGES_URI, '/public/cache/');
            $exporter->setParameter(\java("net.sf.jasperreports.engine.export.JRHtmlExporterParameter")->IS_REMOVE_EMPTY_SPACE_BETWEEN_ROWS,\java("java.lang.Boolean")->TRUE);
            $exporter->setParameter(\java("net.sf.jasperreports.engine.export.JRHtmlExporterParameter")->FRAMES_AS_NESTED_TABLES,\java("java.lang.Boolean")->FALSE);
            $exporter->setParameter(\java("net.sf.jasperreports.engine.export.JRHtmlExporterParameter")->SIZE_UNIT,"pt");
       
//            $imagesMap = new \JAVA("java.util.HashMap");

        } catch (JavaException $ex) {
            echo $ex;
        }   
        $exporter->exportReport();

//        readfile($outputPath);
//        unlink($outputPath);
    }
}

?>
