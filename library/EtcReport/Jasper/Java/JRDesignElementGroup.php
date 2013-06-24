<?php

namespace EtcReport\Jasper\Java;

/**
 *
 * @author marcone
 */
interface JRDesignElementGroup extends JRBaseElementGroup {

    /**
     * Como é uma interface para objeto em java, este médoto pode ser chamado com duas assinaturas como segue:<br>
     * <b>addElement($index, $element)<br>
     * addElement(EtcReport\Jasper\Java\JRDesignElement element);<br>
     * addElement(EtcReport\Jasper\Java\JRElement element);</b>
     * <br>
     * @param int $index 
     * @param EtcReport\Jasper\Java\JRDesignElement/EtcReport\Jasper\Java\JRElement  $element 
     */
    public function addElement($index, $element);

    /**
     * Como é uma interface para objeto em java, este médoto pode ser chamado com duas assinaturas como segue:<br>
     * <b>addElementGroup(int index, JRDesignElementGroup elemGrp);<br>
     * addElementGroup(JRDesignElementGroup elemGrp)<br>
     * @param int $index 
     * @param EtcReport\Jasper\Java\JRDesignElementGroup $elemGrp 
     * <br>

     */
    public function addElementGroup();

    /**
     * Returns the property change support object for this instance.
     * @return JRPropertyChangeSupport  
     */
    public function getEventSupport();

    /**
     * @param EtcReport\Jasper\Java\JRDesignElement  $element 
     * @return EtcReport\Jasper\Java\JRDesignElement 
     */
    public function removeElement($element);

    /**
     * @param EtcReport\Jasper\Java\JRDesignElementGroup $elemGrp 
     * @return EtcReport\Jasper\Java\JRDesignElementGroup 
     */
    public function removeElementGroup($elemGrp);

    /**
     * @param EtcReport\Jasper\Java\JRBaseElementGroup $elementGroup Description
     */
    public function setElementGroup($elementGroup);
}
