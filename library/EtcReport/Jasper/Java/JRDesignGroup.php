<?php

namespace EtcReport\Jasper\Java;

/**
 *
 * @author marcone
 */
interface JRDesignGroup {

    /**
     * @return EtcReport\Jasper\Java\JRDesignVariable 
     */
    public function getCountVariable();

    /**
     * Returns the property change support object for this instance.
     * @return JRPropertyChangeSupport 
     */
    public function getEventSupport();

    /**
     * Gets the expression that defines what records in the group have in common.
     * @return EtcReport\Jasper\Java\JRDesignExpression 
     */
    public function getExpression();

    /**
     * Specifies how the group footer section behaves with regards to its position on the current page.
     * @return FooterPositionEnum
     */
    public function getFooterPositionValue();

    /**
     * Gets the footer section created for this group.
     * @return EtcReport\Jasper\Java\JRDesignSection
     */
    public function getGroupFooterSection();

    /**
     * Gets the header section created for this group.
     * @return EtcReport\Jasper\Java\JRDesignSection
     */
    public function getGroupHeaderSection();

    /**
     * Gets the minimum amount of vertical space needed at the bottom of the column in order to place the group header on the current column.
     * @return int 
     */
    public function getMinHeightToStartNewPage();

    /**
     * Gets the group name
     * @return java.lang.String 
     */
    public function getName();

    /**
     * Gets the flag that signals if the group should be prevented from splitting on first break attempt.
     * @return boolean 
     */
    public function isKeepTogether();

    /**
     * Gets the flag that signals if the group header should be reprinted at the beginning of each page.
     * @return boolean 
     */
    public function isReprintHeaderOnEachPage();

    /**
     * Gets the flag that signals if the group header should be printed always on a new page, along with the re-initialization of the page number.
     * @return boolean 
     */
    public function isResetPageNumber();

    /**
     * Gets the flag that signals if the group header should be printed always on a new column.
     * @return boolean 
     */
    public function isStartNewColumn();

    /**
     * Gets the flag that signals if the group header should be printed always on a new page.
     * @return boolean 
     */
    public function isStartNewPage();

    /**
     * Specifies the group footer section behavior with regards to its position on the current page.
     * @param FooterPositionEnum $footerPositionValue 
     */
    public function setFooterPosition($footerPositionValue);

    /**
     * Sets the flag that signals if the group should be prevented from splitting on first break attempt.
     * @param boolean $keepTogether 
     */
    public function setKeepTogether($keepTogether);

    /**
     * Sets the minimum amount of vertical space needed at the bottom of the column in order to place the group header on the current column.
     * @param int $minHeight 
     */
    public function setMinHeightToStartNewPage($minHeight);

    /**
     * Sets the flag that signals if the group header should be reprinted at the beginning of each page.
     * @param boolean $isReprint
     */
    public function setReprintHeaderOnEachPage($isReprint);

    /**
     * Sets the flag that signals if the group header should be printed always on a new page, along with the re-initialization of the page number.
     * @param boolean $isReset 
     */
    public function setResetPageNumber($isReset);

    /**
     * Sets the flag that signals if the group header should be printed always on a new column.
     * @param boolean $isStart 
     */
    public function setStartNewColumn($isStart);

    /**
     * Sets the flag that signals if the group header should be printed always on a new page.   
     * @param boolean $isStart 
     */
    public function setStartNewPage($isStart);
}
