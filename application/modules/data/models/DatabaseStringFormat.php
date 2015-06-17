<?php

/**
 * Description of DatabaseStringFormat
 *
 * @author marcone
 */
class Data_Model_DatabaseStringFormat {
    public static function removeFontFormat($dbTable, $fieldName){
        if(is_string($dbTable)){
            $dbTable =  new $dbTable;
        }
        $records = $dbTable->fetchAll();
        foreach ($records as $value) {
            $newvalue = preg_replace('/(<font[^>]*>)|(<\/font>)/', '',preg_replace('/font-family\:[^;]+;?|font-size\:[^;]+;?|line-height\:[^;]+;?/i', '$1', $value->$fieldName));
            echo $newvalue .'<br>';
            $dbTable->update([ $fieldName => $newvalue], 'id=' . $value->id);
        }
    }
    public static function removeStringFontFormat($str){
        return preg_replace('/(<font[^>]*>)|(<\/font>)/', '',preg_replace('/font-family\:[^;]+;?|font-size\:[^;]+;?|line-height\:[^;]+;?/i', '$1', $str));
    }
}
