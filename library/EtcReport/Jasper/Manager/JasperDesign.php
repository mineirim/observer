<?php

namespace EtcReport\Jasper\Manager;

/**
 * Description of JasperDesign
 *
 * @author marcone
 */
class JasperDesign extends \EtcReport\Jasper\Manager\JRBaseReport {

    public function __construct($jJRDesign) {
        $this->_JRBaseReport = $jJRDesign;
    }
    /**
     * 
     * @param EtcReport\Jasper\Java\JRDesignField $field
     */
    public function addField($field) {
        $this->_JRBaseReport->addField($field);
    }

    /**
     * Assinaturas:
     * <b>removeField(JRField field);<br>
     * removeField(java.lang.String field) </b>
     * @param java.lang.String  $fieldName 
     */
    public function removeField($fieldName) {
        return $this->_JRBaseReport->removeField($fieldName);
    }

    /**
     * Gets a list of sort report fields.
     * @return type Description
     * java.util.List<JRSortField> 
     */
    public function getSortFieldsList() {
        return $this->_JRBaseReport->getSortFieldsList();
    }

    /**
     * @param JRDesignGroup  $group 
     */
    public function addGroup($group) {
        $this->_JRBaseReport->addGroup($group);
        return $this;
    }

    /**
     * 
     * @return java(java.util.Map<java.lang.String,JRParameter>)
     */
    public function getParametersMap() {
        return $this->_JRBaseReport->getParametersMap();
    }

    /**
     * 
     * @return java(java.util.List<JRParameter>)
     */
    public function getParametersList() {
        return $this->_JRBaseReport->getParametersList();
    }

    /**
     * @return java.util.List <JRField>
     */
    public function getFieldsList() {
        return $this->_JRBaseReport->getFieldsList();
    }

    /**
     * @return java.util.Map <java.lang.String,JRField>	
     */
    public function getFieldsMap() {
        return $this->_JRBaseReport->getFieldsMap();
    }

    /**
     * @return java java.util.List<JRGroup>
     */
    public function getGroupsList() {
        return $this->_JRBaseReport->getGroupsList();
    }

    /**
     * @return Java java.util.Map<java.lang.String,EtcReport\Jasper\Java\JRDesignGroup>	
     */
    public function getGroupsMap() {
        return $this->_JRBaseReport->getGroupsMap();
    }

    /**
     * @todo Implementar métodos para manipular a classe
     * 
     */
}
