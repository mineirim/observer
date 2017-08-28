<?php
namespace Etc\Reports;
use FPDI;
/**
 * Description of Basic
 *
 * @author marcone
 */
class MergePDF{

    private $_baseFile;

    public function __construct($output, $attachments) {
        $this->_baseFile =new FPDI();
        $this->combine($output);
        $anexosDbTable = new \Data_Model_DbTable_Anexos();
        foreach ($attachments as $id) {
            if(is_int($id)){
                $anexo = $anexosDbTable->fetchRow(['id=?' => $id]);
                $file = APPLICATION_PATH .'/../files/'.$anexo->nome;
                if(file_exists($file)) {
                    $this->combine($file);
                }
            }
        }
        $this->_baseFile->Output('I');
        die;
    }
    

    public function combine($file) {
        $pageCount = 0;

        // get the page count
        $pageCount = $this->_baseFile->setSourceFile($file);
        // iterate through all pages
        for ($pageNo = 1; $pageNo <= $pageCount; $pageNo++) {
            // import a page
            $templateId = $this->_baseFile->importPage($pageNo);
            // get the size of the imported page
            $size = $this->_baseFile->getTemplateSize($templateId);

            // create a page (landscape or portrait depending on the imported page size)
            if ($size['w'] > $size['h']) {
                $this->_baseFile->AddPage('L', array($size['w'], $size['h']));
            } else {
                $this->_baseFile->AddPage('P', array($size['w'], $size['h']));
            }

            // use the imported page
            $this->_baseFile->useTemplate($templateId);
        }
    }

}
