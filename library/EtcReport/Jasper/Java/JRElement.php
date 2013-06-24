<?php

namespace EtcReport\Jasper\Java;

/**
 *
 * @author marcone
 */
interface JRElement {

    /**
     * @param JRExpressionCollector $collecotor 
     */
    public function collectExpressions($collector);

    /**
     * Indicates the logical group that the element belongs to.
     * @return EtcReport\Jasper\Java\JRDesignElementGroup
     */
    public function getElementGroup();

    /**
     * Returns the string value that uniquely identifies the element.
     * @return java.lang.String 
     */
    public function getKey();

    /**
     * Returns the position type for the element
     * @return PositionTypeEnum 
     */
    public function getPositionTypeValue();

    /**
     * Gets the expression that is evaluated in order to decide if the element should be displayed.
     * @return EtcReport\Jasper\Java\JRDesignExpression
     */
    public function getPrintWhenExpression();

    /**
     * Returns the group for which an element with a printRepeatedValues attribute set to true will be redisplayed even if the value has not changed.
     * @return EtcReport\Jasper\Java\JRDesignGroup 
     */
    public function getPrintWhenGroupChanges();

    /**
     * Returns the list of dynamic/expression-based properties for this report element.
     * @return JRPropertyExpression[] 
     */
    public function getPropertyExpressions();

    /**
     * Indicates the stretch type for the element
     * @return StretchTypeEnum	 
     */
    public function getStretchTypeValue();

    /**
     * Gets the the section relative horizontal offset of the element top left corner.
     * @return int 
     */
    public function getX();

    /**
     * Gets the the section relative vertical offset of the element top left corner.
     * @return int 
     */
    public function getY();

    /**
     * Returns true if an element with a printRepeatedValues attribute set to true will be redisplayed for every new page or column that is not an overflow from a previous page or column.
     * @return boolean 
     */
    public function isPrintInFirstWholeBand();

    /**
     * Specifies if the element value will be printed for every iteration, even if its value has not changed.
     * @return boolean 
     */
    public function isPrintRepeatedValues();

    /**
     * If this is set to true, the element will be reprinted on the next page if the band does not fit in the current page.
     * @return boolean 
     */
    public function isPrintWhenDetailOverflows();

    /**
     * Returns true if the remaining blank space appearing when the value is not printed will be removed.
     * @return boolean 
     */
    public function isRemoveLineWhenBlank();

    /**
     * Sets the position type for the element.
     * @param PositionTypeEnum $positionType 
     */
    public function setPositionType($positionType);

    /**
     * Specifies whether an element with a printRepeatedValues attribute set to true should be redisplayed for every new page or column that is not an overflow from a previous page or column.
     * @param boolean $isPrintInFirstWholeBand 
     */
    public function setPrintInFirstWholeBand($isPrintInFirstWholeBand);

    /**
     * @param boolean $sPrintRepeatedValues 
     */
    public function setPrintRepeatedValues($isPrintRepeatedValues);

    /**
     * If this is set to true, the element will be reprinted on the next page if the band does not fit in the current page.
     * @param boolean $isPrintWhenDetailOverflows
     */
    public function setPrintWhenDetailOverflows($isPrintWhenDetailOverflows);

    /**
     * Specifies whether the remaining blank space appearing when the value is not printed will be removed.
     * @param boolean $isRemoveLineWhenBlank
     */
    public function setRemoveLineWhenBlank($isRemoveLineWhenBlank);

    /**
     * Specifies how the engine should treat a missing image.
     * @param StretchTypeEnum $stretchTypeEnum
     */
    public function setStretchType($stretchTypeEnum);

    /**
     * @param int $width 
     */
    public function setWidth($width);
    /**
     * Sets the the section relative horizontal offset of the element top left corner.    
     * @param int $x
     */
    public function setX($x);
}

