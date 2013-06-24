<?php

namespace EtcReport\Jasper\Java;

/**
 *
 * @author marcone
 */
interface JRDesignBand extends \EtcReport\Jasper\Java\JRDesignElementGroup {

    public function getHeight();

    /**
     * Returns the band origin, i.e. its location/role within the report (e.g. detail/title/group header/etc).
     * @return JROrigin	
     */
    public function getOrigin();

    /**
     * Returns the parent properties holder, whose properties are used as defaults for this object.
     * @return JRPropertiesHolder	
     */
    public function getParentProperties();

    /**
     * Returns the boolean expression that specifies if the band will be displayed.
     * @return EtcReport\Jasper\Java\JRDesignExpression 
     */
    public function getPrintWhenExpression();

    /**
     * Returns this object's properties map.
     * @return JRPropertiesMap	 
     */
    public function getPropertiesMap();

    /**
     * Specifies the band split behavior.
     * @return SplitTypeEnum 
     */
    public function getSplitTypeValue();

    /**
     * Checks whether the object has any properties.
     * @return boolean 
     */
    public function hasProperties();

    public function setHeight($height);

    /**
     * @param \EtcReport\Jasper\Java\JRDesignExpression $expression 
     */
    public function setPrintWhenExpression($expression);

    /**
     * @param SplitTypeEnum $splitTypeValue 
     */
    public function setSplitType($splitTypeValue);
}
