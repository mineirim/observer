<?php

namespace EtcReport\Jasper\Manager;
/**
 * Description of JRBaseReport
 *
 * @author marcone
 */
class JRBaseReport {
    protected $_JRBaseReport;
    public function __construct($JRBaseReport) {
        $this->_JRBaseReport = $JRBaseReport;
    }
    public function toJavaObject(){
        return $this->_JRBaseReport;
    }
    /**
     * 
     * @return string
     */
    public function getName(){
        return $this->_JRBaseReport->getName();
    }
    /**
     * @return array EtcReport\Jasper\Java\JRDesignGroup[]
     */
    public function getGroups(){
        return $this->_JRBaseReport->getGroups();
    }
    
    /**
     * @return array EtcReport\Jasper\Java\JRDesignBand[]
     */
    public function getAllBands(){
        return $this->_JRBaseReport->getAllBands();
    }
    
    /**
     * @return array JRField[]
     */
    public function getFields(){
        return $this->_JRBaseReport->getFields();
    }
    
    /**
     * @return array JRParameter[]
     */
    public function getParameters(){
        return $this->_JRBaseReport->getParameters();
    }
    /**
     * @return array Description
     */
    public function getPropertyNames(){
        return $this->_JRBaseReport->getPropertyNames();
    }
    /**
     * @return array Description
     */
    public function getSortFields(){
        return $this->_JRBaseReport->getSortFields();
    }
    /**
     * @return array Description
     */
    public function getTemplates(){
        return $this->_JRBaseReport->getTemplates();
    }
    /**
     * @return array Description
     */
    public function getVariables(){
        return $this->_JRBaseReport->getVariables();
    }
    
    
    /**
     * @return EtcReport\Jasper\Java\JRDesignBand
     */
    public function getBackground(){
        return $this->_JRBaseReport->getBackground();
    }
    /**
     * @return EtcReport\Jasper\Java\JRDesignBand
     */
    public function getColumnFooter(){
        return $this->_JRBaseReport->getColumnFooter();
    }
    /**
     * @return EtcReport\Jasper\Java\JRDesignBand
     */
    public function getColumnHeader(){
        return $this->_JRBaseReport->getColumnHeader();
    }
    /**
     * @return EtcReport\Jasper\Java\JRDesignBand
     */
    public function getLastPageFooter(){
        return $this->_JRBaseReport->getLastPageFooter();
    }
    /**
     * @return EtcReport\Jasper\Java\JRDesignBand
     */
    public function getNoData(){
        return $this->_JRBaseReport->getNoData();
    }
    /**
     * @return EtcReport\Jasper\Java\JRDesignBand
     */
    public function getPageFooter(){
        return $this->_JRBaseReport->getPageFooter();
    }
    /**
     * @return EtcReport\Jasper\Java\JRDesignBand
     */
    public function getPageHeader(){
        return $this->_JRBaseReport->getPageHeader();
    }    
    /**
     * @return EtcReport\Jasper\Java\JRDesignBand
     */
    public function getSummary(){
        return $this->_JRBaseReport->getSummary();
    }    
    /**
     * @return EtcReport\Jasper\Java\JRDesignBand
     */
    public function getTitle(){
        return $this->_JRBaseReport->getTitle();
    }
    /**
     * @return EtcReport\Jasper\Java\JRDesignSection
     */
    public function getDetailSection(){
        return $this->_JRBaseReport->getDetailSection();
    }    
    
    /**
     * @return \EtcReport\Jasper\Java\JRDesignQuery
     */
    public function getQuery(){
        return $this->_JRBaseReport->getQuery();
    }    
    
    
    /**
     * @todo implementar os métodos de manipulação de relatório abaixo
     * copyTemplates,  , getBottomMargin, getColumnCount, getColumnDirection,
     * getColumnSpacing, getColumnWidth, getDatasets, getDefaultStyle, getEventSupport,  getFormatFactoryClass, 
     * getImports, getLanguage, , getLeftMargin, getMainDataset,  getOrientationValue, 
     * , , getPageHeight, getPageWidth,  getParentProperties, getPrintOrderValue, getPropertiesMap, 
     * getProperty,  getResourceBundle, getRightMargin, getScriptletClass, getScriptlets, getStyles, 
     *  getTopMargin, getUUID, getWhenNoDataTypeValue, getWhenResourceMissingTypeValue, 
     * hasProperties, isFloatColumnFooter, isIgnorePagination, isSummaryNewPage, isSummaryWithPageHeaderAndFooter, isTitleNewPage, removeProperty, 
     * setProperty, setWhenNoDataType, setWhenResourceMissingType
     */
}

?>
