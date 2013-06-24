<?php

namespace EtcReport\Jasper\Java;

/**
 *
 * @author marcone
 */
interface JRDesignVariable {

    /**
     * Gets the variable calculation type.
     * @return CalculationEnum	 
     */
    public function getCalculationValue();

    /**
     * Returns the main expression for this variable.
     * @return EtcReport\Jasper\Java\JRDesignExpression 
     */
    public function getExpression();

    /**
     * Returns the class of the incrementer factory used for choosing the right incrementer for the variable value.
     * @return java.lang.Class<?>	 
     */
    public function getIncrementerFactoryClass();

    /**
     * Returns the string name of the variable value class.
     */
    public function getIncrementerFactoryClassName();

    /**
     * Returns the group whose break triggers the variable increment.
     * @return EtcReport\Jasper\Java\JRDesignGroup
     */
    public function getIncrementGroup();

    /**
     * Gets the variable increment type.
     * @return IncrementTypeEnum 
     */
    public function getIncrementTypeValue();

    /**
     * Returns the initial value expression for this variable.
     * @return EtcReport\Jasper\Java\JRDesignExpression 
     */
    public function getInitialValueExpression();

    public function getName();

    /**
     * Returns the group whose break triggers the variable reset.
     * @return EtcReport\Jasper\Java\JRDesignGroup
     */
    public function getResetGroup();

    /**
     * Gets the variable reset type.
     * @return ResetTypeEnum	 
     */
    public function getResetTypeValue();

    /**
     * Returns the class of the variable value.
     * @return java.lang.Class<?> 
     */
    public function getValueClass();

    /**
     * Returns the string name of the variable value class.
     */
    public function getValueClassName();

    /**
     * Returns true if the variable calculation type is system defined.
     */
    public function isSystemDefined();


    /**
     * MÉTODOS DA CLASSE DESIGNVARABLE
     * ################################################################3
     */

    /**
     * Returns the property change support object for this instance.
     * @return JRPropertyChangeSupport Description
     */
    public function getEventSupport();

    /**
     * @param CalculationEnum
     */
    public function setCalculation($calculationValue);

    /**
     * @param EtcReport\Jasper\Java\JRDesignExpression expression
     */
    public function setExpression($expression);

    /**
     * @param java.lang.Class<?> 
     */
    public function setIncrementerFactoryClass($clazz);

    /**
     * @param java.lang.String 
     */
    public function setIncrementerFactoryClassName($className);

    /**
     * @param EtcReport\Jasper\Java\JRDesignGroup $group
     */
    public function setIncrementGroup($group);

    /**
     * @param IncrementTypeEnum incrementTypeValue
     */
    public function setIncrementType($incrementTypeValue);

    /**
     * @param EtcReport\Jasper\Java\JRDesignExpression
     */
    public function setInitialValueExpression($expression);

    /**
     * @param java.lang.String
     */
    public function setName($name);

    /**
     * @param EtcReport\Jasper\Java\JRDesignGroup $group
     */
    public function setResetGroup($group);

    /**
     * @param ResetTypeEnum
     */
    public function setResetType($resetTypeValue);

    /**
     * @param boolean
     */
    public function setSystemDefined($isSystemDefined);

    /**
     * @param java.lang.Class<?> 
     */
    public function setValueClass($clazz);

    /**
     * @param java.lang.String $className
     */
    public function setValueClassName($className);
}
