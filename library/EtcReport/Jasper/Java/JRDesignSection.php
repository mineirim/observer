<?php

namespace EtcReport\Jasper\Java;

/**
 *
 * @author marcone
 */
interface JRDesignSection {

    /**
     * Returns the bands within the current section.
     * @return EtcReport\Jasper\Java\JRDesignBand 
     */
    public function Bands();

    /**
     * Returns the property change support object for this instance.
     * @return JRPropertyChangeSupport 
     */
    public function getEventSupport();

    /**
     * Método com mais de uma assinatura, como segue:
     * <b>addBand(int index, JRBand band)<br>
     * addBand(JRBand band)</b>
     * Adds a band to the section.     * 
     * @param int $index
     * @param EtcReport\Jasper\Java\JRDesignBand $band  
     */
    public function addBand($index, $band);

    /**
     * Returns the bands within the current section.
     * @return array EtcReport\Jasper\Java\JRDesignBand[]
     */
    public function getBands();

    /**
     * Gets a list of all bands within the current section.
     * @return java.util.List<EtcReport\Jasper\Java\JRDesignBand>
     */
    public function getBandsList();

    /**
     * Returns the section origin, i.e. its location/role within the report (e.g. detail/title/group header/etc).
     * @return JROrigin 
     */
    public function getOrigin();

    /**
     * Removes a band from the section.
     * <b>
     * removeBand(int index)<br>
     * removeBand(JRBand band)</b>
     * @param int $index parametro para o primeiro tipo de assinatura
     * @param EtcReport\Jasper\Java\JRDesignBand  $band tipo de parâmetro para a segunda assinatura
     * 
     * @return EtcReport\Jasper\Java\JRDesignBand 
     * 
     */
    public function removeBand($index_or_band);
}
