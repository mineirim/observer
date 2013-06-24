<?php

namespace EtcReport\Jasper\Java;

/**
 *
 * @author marcone
 */
interface JRDesignExpression {

    /**
     * @return array JRExpressionChunk[]
     */
    public function getChunks();

    public function getId();

    /**
     * @return java.lang.String	
     */
    public function getText();

    public function regenerateId();

    /**
     * @param JRDesignExpressionChunk $chunk 
     */
    public function addChunk($chunk);

    /**
     * @param java.lang.String  $text 
     */
    public function addFieldChunk($text);

    /**
     * @param java.lang.String  $text 
     */
    public function addParameterChunk($text);

    /**
     * @param java.lang.String  $text 
     */
    public function addResourceChunk($text);

    /**
     * @param java.lang.String  $text 
     */
    public function addTextChunk($text);

    /**
     * @param java.lang.String  $text 
     */
    public function addVariableChunk($text);

    /**
     * Returns the property change support object for this instance.
     * @return JRPropertyChangeSupport	 
     */
    public function getEventSupport();

    /**
     * Clears the current list of chunks and adds the passed list of chunks.
     * @param java.util.List<JRExpressionChunk>  $chunks 
     */
    public function setChunks($chunks);

    /**
     * @param int $id 
     */
    public function setId($id);

    /**
     * 
     * @param java.lang.String $text
     */
    public function setText($text);
}
