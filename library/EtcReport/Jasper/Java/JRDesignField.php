<?php

namespace EtcReport\Jasper\Java;

/**
 *
 * @author marcone
 */
interface JRDesignField {

    /**
     * @param java.lang.String  $name 
     */
    public function setName($name);

    /**
     * @param java.lang.Class<?> $class Description
     */
    public function setValueClass($class);

    /**
     * @param java.lang.String  $className 
     */
    public function setValueClassName($className);

    /**
     * Gets the field optional description.
     * @return java.lang.String 
     */
    public function getDescription();

    /**
     * Returns the property change support object for this instance.
     * @return JRPropertyChangeSupport	 
     */
    public function getEventSupport();

    /**
     * Gets the field unique name.
     */
    public function getName();

    /**
     * Returns the parent properties holder, whose properties are used as defaults for this object.
     * @return JRPropertiesHolder  
     */
    public function getParentProperties();

    /**
     * Returns this object's properties map.
     * @return JRPropertiesMap 
     */
    public function getPropertiesMap();

    /**
     * Gets the field value class.
     * @return java.lang.Class<?> 
     */
    public function getValueClass();

    /**
     * Gets the field value class name.
     * @return java.lang.String	 
     */
    public function getValueClassName();

    /**
     * Checks whether the object has any properties.
     * @return boolean 
     */
    public function hasProperties();

    /**
     * Sets the field description.
     * @param type $java.lang.String  
     */
    public function setDescription($description);
}

