<?php

namespace Etc\Reports;

/**
 * Description of Basic
 *
 * @author marcone
 */
class CustomReports extends \Etc\Reports\Basic {

    private $_modeloRelatorio;

    /**
     * @var array
     */
    protected $_reportTitle = [1 => 'RESULTADOS',
        2 => 'RELATÓRIO FÍSICO',
        3 => 'RELATÓRIO FÍSICO/FINANCEIRO',
    ];
    protected $_requestParams;
    public function __construct($reportFileName = 'fiotec', $reportType = 1, $format = 'pdf') {
        $this->_reportFileName = $reportFileName;
        $this->_reportType = $reportType;
        $this->_reportsPath = APPLICATION_PATH . '/modules/relatorio/views/scripts/index/';
        $this->format = $format;
        $relatoriosModel = new \Data_Model_DbTable_Relatorios();
        $modeloRowset = $relatoriosModel->find($reportType);
        if ($modeloRowset->count() === 0) {
            throw new \Zend_Controller_Exception('Modelo de relatório não encontrado', 1404);
        }
        $this->_modeloRelatorio = $modeloRowset->current()->toArray();
    }

    /**
     * @return mixed
     */
    public function getReportsPath() {
        return $this->_reportsPath;
    }

    /**
     * @param $paht
     */
    public function setReportsPath($paht) {
        $this->_reportsPath = $paht;
    }

    /**
     * @param $params
     */
    public function init($params) {
        $this->_requestParams=$params;
        $this->_auth = \Zend_Auth::getInstance();
        $identity = $this->_auth->getIdentity();
        $this->jasper_reports = new \Etc\Jasper\Reports();

        $this->jasper_reports->setReportsPath($this->_reportsPath);
        $programacoes_table = new \Data_Model_DbTable_Programacoes();
        $instrumentos_table = new \Data_Model_Instrumentos();
        $this->_reportParams['report_type'] = (int) (isset($params['report-type']) ? $params['report-type'] : 1);
        $this->_reportParams['APPLICATION_PATH'] = APPLICATION_PATH;
        $this->_reportParams['user_id'] = (int) $identity->id;
        $this->_reportParams['user_type'] = (int) $identity->is_su ? 1 : 2;
        $this->_reportParams['report_title'] = $this->_reportTitle[$this->_reportParams['report_type']];
        $compositeId = explode('-', $params['id']);
        $instrumentoParentId=1;
        if (count($compositeId) > 1) {
            switch ($compositeId[0]) {
                case 'instrumentoId':
                    $instrumento_id = $compositeId[1];
                    $estrutura = $instrumentos_table->getRecursiveStructure($instrumento_id);
                    break;
                case 'projetoId':
                    $projetosModel = new \Data_Model_Projetos();
                    $projeto = $projetosModel->getProjeto($compositeId[1]);
                    if($projeto['propriedades']!==null && isset($projeto['propriedades']->modelo)){
                        $instrumentoParentId = $projeto['propriedades']->modelo->id;
                    }
                    $estrutura            = $instrumentos_table->getRecursiveStructure($instrumentoParentId);
                    $params['projeto_id'] = $compositeId[1];
                    break;
            }
        } else {
            $programacao_id = $params['id'];
            $programacao_row = $programacoes_table->fetchRow('id=' . $programacao_id);
            $estrutura = $instrumentos_table->getRecursiveStructure($programacao_row->instrumento_id);
        }
        /**
         * @var $numHeaders Número de cabeçalhos que serão apresentados */
        $numHeaders = $estrutura->rowCount();
        $instrumentosCustom = $this->_modeloRelatorio['configuracoes']->instrumentos;
//                $this->_reportParams['mostrar_fisico'] = true ;//(bool)  !$this->_modeloRelatorio['configuracoes']->mostrar_fisico;
        $instrumentosCustomIds = [];
        foreach ($instrumentosCustom as $inst) {
            $instrumentosCustomIds[$inst->id] = $inst;
        }
        $this->jasper_reports->setReportsPath($this->getReportsPath());
        $xml_report = $this->jasper_reports->getReportXml($this->_reportFileName, '/n:jasperReport');

        $xml_report_group = $this->jasper_reports->getReportXml($this->_reportFileName, '/n:jasperReport/n:group[@name="nivel"]');
        $xml_group_base = $xml_report_group[0]->asXML();
        $dom_group_base = \dom_import_simplexml($xml_report_group[0]);
        $dom_report = \dom_import_simplexml($xml_report[0]);
        $dom_report->removeChild($dom_report->getElementsByTagName('group')->item(0));
        $estrutura_arr = $estrutura->fetchAll();
        $sql = false;
        $order = [];
        for ($ix = 1; $ix < $numHeaders; $ix++) {
            $value = $estrutura_arr[$ix];
            if (isset($programacao_row) && $programacao_row->instrumento_id == $value->id) {
                $filter_id = $programacao_row->id;
            } else {
                if ($estrutura_arr[0]->id === $programacao_row->instrumento_id) {
                    $filter_id = $programacao_row->id;
                } else {
                    $filter_id = false;
                }
            }
            $sql .= $sql ? ', ' : '';
            $sql .= $this->getQuery($ix, $value, $filter_id);
            $px = 'p' . $ix . '_';
            $order[] = 'p' . $ix . '_id';
            if ($ix > 0 && $ix < $numHeaders - 1) {
                if (array_key_exists($estrutura_arr[$ix]->id, $instrumentosCustomIds)) {
                    $instrumentoCustom = $instrumentosCustomIds[$estrutura_arr[$ix]->id];
                    $xml_text = str_replace('p1_', $px, $xml_group_base);
                    if ($instrumentoCustom->rename) {
                        $xml_text = str_replace('$F{' . $px . 'singular} + "', '"' . $instrumentoCustom->rename, $xml_text);
                    }
                    $xml_text = str_replace('nivel', $px . 'nivel', $xml_text);
                    $node_new = new \SimpleXMLElement($xml_text);
                    $dom_group_xml = \dom_import_simplexml($node_new);
                    $dom_group = $dom_report->ownerDocument->importNode($dom_group_xml, TRUE);
                    unset($dom_group_xml);
                    $node = $dom_report->getElementsByTagName('background')->item(0);
                    $dom_report->insertBefore($dom_group, $node);
                }
            }
        }
        $ix--;
        $projetoWhere = '';
        if (isset($params['projeto_id']) && $params['projeto_id'] !== '') {
            $this->_reportParams['projeto_id'] = (int) $params['projeto_id'];
            $projetoWhere = "\n WHERE n{$ix}.p{$ix}_projeto_id=" . $params['projeto_id'];
        }
        $sql .= " SELECT * FROM n{$ix} {$projetoWhere} order by " . implode(',', $order);
        $xml_report_text = str_replace('__detail_', $px, $xml_report[0]->asXML());
        $instrumentoCustom = $instrumentosCustomIds[$estrutura_arr[$ix]->id];
        if ($instrumentoCustom->rename) {
            $xml_report_text = str_replace('$F{' . $px . 'singular} + "', '"' . $instrumentoCustom->rename, $xml_report_text);
        }
        if(!$instrumentoCustom){
            $this->_reportParams['mostrar_detalhes']=0;
        }
        if($this->_modeloRelatorio['configuracoes']->campoApresentacao){
            $xml_report_text = str_replace('"apresentacao"', '"'.$this->_modeloRelatorio['configuracoes']->campoApresentacao.'"', $xml_report_text);
        }
        file_put_contents('/tmp/000x.jrxml', $xml_report_text);
        $is = $this->getInputStream($xml_report_text);
        /* @var $jasperDesign \EtcReport\Jasper\Manager\JasperDesign */
        $jasperDesign = $this->jasper_reports->load($is);
        for ($ix = 2; $ix < $numHeaders; $ix++) {
            $value = $estrutura_arr[$ix];
            if ($ix > 0 && $ix < $numHeaders - 1) {
                $this->addFields($jasperDesign, $ix);
            }
        }
        $this->jasper_reports->setQuery($sql);
        $this->jasper_reports->getJasperCompileManager()->writeReportToXmlFile($jasperDesign, $this->_reportsPath . 'report-' . $this->_reportParams['report_type'] . '.jrxml');
//		$this->jasper_reports->compileLoadedReport($jasperDesign);
    }

    public function display() {
        $jasper = new \JasperPHP\JasperPHP;
        $input = $this->_reportsPath . 'report-' . $this->_reportParams['report_type'] . '.jrxml';
        $inputFiotec = $this->_reportsPath . 'TableOfContentsReport.jrxml';
        $this->_reportParams['report_file'] = 'report-' . $this->_reportParams['report_type'] . '.jasper';
        $this->_reportParams['mostrar_fisico'] = $this->_modeloRelatorio['configuracoes']->mostrarFisico ? 1 : 0;
        $this->_reportParams['mostrar_financeiro'] = $this->_modeloRelatorio['configuracoes']->mostrarFinanceiro ? 1 : 0;
        if( isset($this->_modeloRelatorio['configuracoes']->tituloRelatorio)){
            $this->_reportParams['report_title'] = utf8_encode($this->_modeloRelatorio['configuracoes']->tituloRelatorio);
        }
//            $output = '/tmp/out/';
        $output = APPLICATION_PATH . '/../public/cache/00rep-' . $this->_reportParams['report_type'];
        $conf = \Zend_Registry::get('config');
        $dbConf = $conf->resources->db->params;
        $dbparams = [
            'driver' => 'postgres',
            'username' => $dbConf->username,
            'host' => $dbConf->host,
            'database' => $dbConf->dbname,
            'port' => 5432,
            'password' => $dbConf->password,
        ];
        $options = ['format' => [$this->format],
            'locale' => 'pt_BR',
            'resource' => $this->_reportsPath,
            'params' => $this->_reportParams, 'db_connection' => $dbparams,];
        $jasper->compile($input)->execute();
        $jasper->process($inputFiotec, $output, $options)->execute();   //$this->jasper_reports->compileReport('report-'.$this->_reportParams['report_type'], 'pdf', $this->_reportParams);
        if ($this->format == 'pdf') {
            if(isset($this->_requestParams['attach']) && strlen($this->_requestParams['attach'])>0 && $this->_requestParams['attach'] !=='[]'){
                $attachments = explode(':', $this->_requestParams['attach']);
                $merge =  new \Etc\Reports\MergePDF($output. '.pdf', $attachments);
            }
            $this->displayPdf($output . '.pdf', 'tipo');
        } elseif ($this->format == 'html') {
            $this->showHtml($output . '.html');
        } elseif ($this->format == 'docx') {
            $this->downloadDocx($output .'.'. $this->format);
        }
    }
    protected function downloadDocx($output, $reportType){
        ob_clean();
        header('Content-Description: File Transfer');
        header('Content-Type: application/vnd.openxmlformats-officedocument.wordprocessingml.document');
        header('Content-Disposition: attachment; filename="relatorio' . $reportType . '.docx"');
        header('Content-Transfer-Encoding: binary');
        header('Expires: 0');
        header('Cache-Control: must-revalidate, post-check=0, pre-check=0');
        header('Pragma: public');
        header('Content-Length: ' . @filesize($output));
        ob_clean();
        flush();
        @readfile($output);
        ob_flush();
        exit();         
    }
    protected function displayPdf($output, $reportType) {
        ob_clean();
        header('Content-disposition: inline; filename="relatorio-' . $reportType . '.pdf"');
        header('Content-Type: application/pdf');
        header('Content-Transfer-Encoding: binary');
        header('Content-Length: ' . @filesize($output));
        header('Pragma: no-cache');
        header('Cache-Control: must-revalidate, post-check=0, pre-check=0');
        header('Expires: 0');
        set_time_limit(0);
        ob_flush();
        ob_flush();
        @readfile($output);
        ob_flush();
        die;
    }

    protected function showHtml($output) {
        $dom = new \DOMDocument();

        $dom->loadHTMLFile($output);
        foreach ($dom->getElementsByTagName('img') as $img) {
            $file = APPLICATION_PATH . '/../public/cache/' . $img->getAttribute('src');
            $imgData = base64_encode(file_get_contents($file));
            $src = 'data: ' . mime_content_type($file) . ';base64,' . $imgData;
            $img->setAttribute('src', $src);
        }
        ob_clean();
        header('Content-Type: text/html; charset:UTF-8');
        header('Pragma: no-cache');
        header('Cache-Control: must-revalidate, post-check=0, pre-check=0');
        header('Expires: 0');
        set_time_limit(0);
        ob_flush();
        ob_flush();

        echo $dom->saveHTML();
        ob_flush();
        die;
    }

    /**
     * @return mixed
     */
    public function saveHTML() {
        $manager = new \Etc\Jasper\Manager();
        $report = new \Etc\Jasper\Report();
        $report->setReport($this->jasper_reports->getReport());
        $manager->setReport($report);
        return $manager->saveAsHTML();
    }

    /**
     * @param \EtcReport\Jasper\Manager\JasperDesign $jasperDesign
     * @param int $seq
     */
    protected function addFields($jasperDesign, $seq) {
        $fields = [
            ['name' => 'id', 'class' => 'java.lang.Integer'],
            ['name' => 'singular', 'class' => 'java.lang.String'],
            ['name' => 'has_responsavel', 'class' => 'java.lang.Boolean'],
            ['name' => 'has_supervisor', 'class' => 'java.lang.Boolean'],
            ['name' => 'has_equipe', 'class' => 'java.lang.Boolean'],
            ['name' => 'menu', 'class' => 'java.lang.String'],
            ['name' => 'descricao', 'class' => 'java.lang.String'],
            ['name' => 'ordem', 'class' => 'java.lang.Integer'],
            ['name' => 'programacao_id', 'class' => 'java.lang.Integer'],
            ['name' => 'equipe', 'class' => 'java.lang.String'],
            ['name' => 'responsavel', 'class' => 'java.lang.String'],
            ['name' => 'supervisor', 'class' => 'java.lang.String'],
            ['name' => 'instrumento_id', 'class' => 'java.lang.Integer'],
        ];
        foreach ($fields as $value) {
            /* @var $jField \EtcReport\Jasper\Java\JRDesignField  */
            $jField = new \Java('net.sf.jasperreports.engine.design.JRDesignField');
            $jField->setName('p' . $seq . '_' . $value['name']);
            $jField->setValueClassName($value['class']);
            $jasperDesign->addField($jField);
        }
    }

    /**
     * @param $ix
     * @param $estrutura
     * @param $filter_id
     */
    protected function getQuery($ix, $estrutura, $filter_id = false) {

        if ($ix == 1) {
            $where = $filter_id ? " AND p{$ix}.id=" . $filter_id : ' ';
            $template = "WITH 	n1 as ( SELECT  p1.id AS p1_id, p1.singular as p1_singular, p1.has_responsavel as p1_has_responsavel, p1.has_supervisor as p1_has_supervisor, p1.has_equipe as p1_has_equipe, p1.menu as p1_menu, p1.descricao as p1_descricao, p1.ordem as p1_ordem, p1.programacao_id as p1_programacao_id, p1.equipe as p1_equipe, p1.responsavel as p1_responsavel, p1.supervisor as p1_supervisor, p1.instrumento_id as p1_instrumento_id, p1.projeto_id as p1_projeto_id, p1.responsavel_id as p1_responsavel_id, p1.supervisor_id as p1_supervisor_id
                            FROM  vw_report_base p1 WHERE p1.programacao_id is null and p1.instrumento_id={$estrutura->id} {$where})";
        } else {
            $join = $filter_id ? ' INNER ' : ' RIGHT ';
            $where = $filter_id ? " WHERE p{$ix}.id=" . $filter_id : ' ';
            $template = "n__ix__ as (
                                SELECT n__iy__.*, p__ix__.id AS p__ix___id, p__ix__.singular as p__ix___singular, p__ix__.has_responsavel as p__ix___has_responsavel, p__ix__.has_supervisor as p__ix___has_supervisor, p__ix__.has_equipe as p__ix___has_equipe, p__ix__.menu as p__ix___menu, p__ix__.descricao as p__ix___descricao, p__ix__.ordem as p__ix___ordem, p__ix__.programacao_id as p__ix___programacao_id, p__ix__.equipe as p__ix___equipe, p__ix__.responsavel as p__ix___responsavel, p__ix__.supervisor as p__ix___supervisor, p__ix__.instrumento_id as p__ix___instrumento_id, p__ix__.projeto_id as p__ix___projeto_id,  p__ix__.responsavel_id as p__ix___responsavel_id, p__ix__.supervisor_id as p__ix___supervisor_id
                                FROM    vw_report_base p__ix__ {$join} JOIN n__iy__ on p__ix__.programacao_id=n__iy__.p__iy___id $where
                         )";
        }
        $query = str_replace('__ix__', $ix, $template);
        $query = str_replace('__iy__', $ix - 1, $query);
        return $query;
    }

    /**
     * @param $value
     * @return mixed
     */
    public function getInputStream($value) {

        $out = new \Java('java.io.ByteArrayOutputStream');

        $arr = [];
        $strlen = strlen($value);
        for ($i = 0; $i < $strlen; $i++) {
            $val = ord(substr($value, $i, 1));
            if ($val >= 128) {

                $val = ($val) - 256;
            }
            $arr[] = $val;
        }

        $out->write($arr);

        $value = new \Java('java.io.ByteArrayInputStream', $out->toByteArray());
        return $value;
    }

}
