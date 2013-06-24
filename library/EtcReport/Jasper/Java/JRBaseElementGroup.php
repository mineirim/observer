<?php

namespace EtcReport\Jasper\Java;

/**
 *
 * @author marcone
 * implementa os seguintes métodos(que não podem ser descritos na inteface, pois clone é palavra reservada do php)<br>
 * <b> java.lang.Object	clone() <br>
 *  java.lang.Object	clone(JRElementGroup parentGroup) </b>
 */
interface JRBaseElementGroup {

    /**
     * Gets a list of all direct children elements or elements groups.
     * @return java.util.List<JRChild>	 
     */
    public function getChildren();

    /**
     * Como é uma interface para objeto em java, este médoto pode ser chamado com duas assinaturas como segue:<br>
     * <b>getElementByKey($key);  <i>Não estático</i><br>
     * getElementByKey($elements, $key); <i>Estático</i></b>
     * <br>
     * @description Gets an element from this group, based on its element key.
     * @param array  $elements EtcReport\Jasper\Java\JRElement[]
     * @param java.lang.String  $key 
     * @return EtcReport\Jasper\Java\JRElement
     * 
     */
    public static function getElementByKey($elements, $key);


    /**
     * Gets the parent element group.
     * @return EtcReport\Jasper\Java\JRDesignGroup ;
     */
    public function getElementGroup();

    /**
     * Como é uma interface para objeto em java, este médoto pode ser chamado com duas assinaturas como segue:<br>
     * <b>getElements();<br>
     * getElements($children);</b>
     * <br>
     * @description Gets an array containing all the elements and element groups in the hierarchy.
     * @param java.util.List<JRChild> $children 
     * @return array EtcReport\Jasper\Java\JRElement[]
     */
    public static function getElements($children);

    /**
     * @param JRVisitor  $visitor 
     */
    public function visit($visitor);
}
