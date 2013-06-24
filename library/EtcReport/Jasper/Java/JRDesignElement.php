<?php

namespace EtcReport\Jasper\Java;

/**
 *
 * @author marcone
 */
interface JRDesignElement extends \EtcReport\Jasper\Java\JRElement {

    /**
     * Add a dynamic/expression-based property.
     * @param JRPropertyExpression  $propertyExpression 
     */
    public function addPropertyExpression($propertyExpression);

    /**
     * Returns the list of dynamic/expression-based properties for this report element.
     * @return array JRPropertyExpression[]
     */
    public function getPropertyExpressions();

    /**
     * Returns the list of property expressions.
     * @return java.util.List<JRPropertyExpression>	 
     */
    public function getPropertyExpressionsList();

    /**
     * Remove a property expression.<br>
     * 
     * Método com mais de uma assinatura como segue:
     * <b>removePropertyExpression(JRPropertyExpression propertyExpression)<br>
     * removePropertyExpression(java.lang.String name)</b>
     * @param JRPropertyExpression $propertyExpression 
     * @param java.lang.String $name 
     */
    public function removePropertyExpression($name_or_propertyExpression);

    /**
     * Specifies the logical group that the element belongs to.
     * @param \EtcReport\Jasper\Java\JRDesignElementGroup
     */
    public function setElementGroup($elementGroup);

    /**
     * @param int $height
     */
    public function setHeight($height);

    /**
     * Sets the unique identifier for the element.
     * @param java.lang.String $key 
     */
    public function setKey($key);

    /**
     * Sets the print when expression.
     * @param \EtcReport\Jasper\Java\JRDesignExpression $expression 
     */
    public function setPrintWhenExpression($expression);

    /**
     * Specifies the group for which an element with a printRepeatedValues attribute set to true will be redisplayed even if the value has not changed.
     * @param \EtcReport\Jasper\Java\JRDesignGroup $group 
     */
    public function setPrintWhenGroupChanges($group);

    /**
     * @param JRStyle $style 
     */
    public function setStyle($style);

    /**
     * Set the name of the external style to be used for this element.
     * @param java.lang.String $styleName 
     */
    public function setStyleNameReference($styleName);

    /**
     * @param java.util.UUID  $uuid 
     */
    public function setUUID($uuid);

    /**
     * Sets the vertical section relative offset for the element.
     * @param int $yDescription
     */
    public function setY($y);
}

