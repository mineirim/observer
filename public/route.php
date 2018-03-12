<?php
$url=strtok($_SERVER["REQUEST_URI"],'?');
if (file_exists($_SERVER["DOCUMENT_ROOT"] . $url)) {
	    return false;
} else {
	    require "index.php";
}
