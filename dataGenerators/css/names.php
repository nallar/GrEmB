<?php
if(@$_GET['subs'])$_POST['subs'] = $_GET['subs'];
if(!@$_POST['subs']) die(); 
header("Content-type: application/json");
header("Expires: " . gmdate("D, d M Y H:i:s", time() + 1) . " GMT");
header("Pragma: cache");
header("Cache-Control: max-age=1");
$subs = explode(",",@$_POST['subs']);
foreach($subs as &$s){
	$s = preg_replace("/[^a-zA-Z0-9_\-\.]/","",$s);
}
$nsfw = @$_GET['nsfw'] === '1';
$compact = implode(",",$subs).",nsfw=".($nsfw?"1":"0");
$key = md5($compact);
$d = @file_get_contents("cache/$key.name");
if($d){
	echo $d;
	die();
}
file_put_contents("keys/$key.key", $compact);
require "cssEmoteParser.php";
$cT = new cssEmoteParser();
if(!$nsfw){
	$cT->nsfw = array_merge($cT->nsfw,Array("horsecock", "dick", "jizz", "dashurbate"));
}
foreach($subs as &$s){
	$d = @file_get_contents("subs/$s.min.css");
	if(!$d){
		file_put_contents("subs/$s.min.css","/*Not yet retrieved from queue.*/");
	}
	$cT->parseString($d,$s,false,false);
}
$d = (str_replace(", \"}","}",'{"cssKey": "' . $key . "\", \"" . implode("\": 1, \"",$cT->getEmoteNames()) . '": 1}'));
echo $d;
file_put_contents("cache/$key.name", $d);
?>