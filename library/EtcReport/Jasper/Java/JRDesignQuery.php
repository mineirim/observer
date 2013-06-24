<?php

namespace EtcReport\Jasper\Java;
/**
 * interface com métodos dispon
 *
 * @author marcone
 */
interface JRDesignQuery {

    /**
     * @param JRDesignQueryChunk $chunk
     */
    public function addChunk($chunk);

    /**
     * @param (java.lang.String[] $$tokens Adds a clause chunk to the query.
     */
    public function addClauseChunk($tokens);

    /**
     * java.lang.String
     */
    public function addParameterChunk($text);

    /**
     * java.lang.String
     */
    public function addParameterClauseChunk($text);

    /**
     * Como é uma interface para objeto em java, este médoto pode ser chamado com duas assinaturas como segue:<br>
     * <b>addPropertyChangeListener($l);<br>
     * addPropertyChangeListener($propName, $l);</b>
     * 
     * @description Add a property listener to receive property change events for only one specific property.
     * 
     * @param java.lang.String $propName
     * @param java.beans.PropertyChangeListener $l 
     * 
     */
    public function addPropertyChangeListener($propName, $l);

    /**
     * @param java.lang.String  $text 
     */
    public function addTextChunk($text);

    /**
     * @return JRQueryChunkHandler 
     */
    public function chunkAdder();

    /**
     * @return java.lang.Object
     */
    public function clone_();

    /**
     * @return array JRQueryChunk[]
     */
    public function getChunks();

    /**
     * Returns the property change support object for this instance.
     * @return JRPropertyChangeSupport	 
     */
    public function getEventSupport();

    /**
     * Get the property change support object for this class.
     * @return java.beans.PropertyChangeSupport 
     */
    public function getPropertyChangeSupport();

    /**
     * Como é uma interface para objeto em java, este médoto pode ser chamado com duas assinaturas como segue.
     * 
     * <b>1ª -</b> Remove a property change listener registered for all properties.<br>
     *    <b>removePropertyChangeListener($l);</b><br>     
     * <b>2ª -</b> Remove a property change listener registered for a specific property.<br>
     *    <b>removePropertyChangeListener($propName,$l);</b>
     * 
     * @param java.lang.String $propName 
     * @param java.beans.PropertyChangeListener $l 
     */
    public function removePropertyChangeListener($propName, $l);

    /**
     * @param java.util.List<JRQueryChunk> $chunks 
     */
    public function setChunks($chunks);

    /**
     * Sets the query language.
     * @param java.lang.String $language 
     */
    public function setLanguage($language);

    /**
     * @param java.lang.String $text 
     */
    public function setText($text);
}

?>
