<?php

sleep(5);

require "cssEmoteParser.php";

$count["subs"] = 0;
$count["fails"] = 0;

$subss["other"] = Array("minecraft", "fffffffuuuuuuuuuuuu", "homestuck");
$subss["other_nsfw"] = Array();
$subss["main"] = Array("map.css", "gremotes", "pankakke", "mylittlesports", "molestia", "flitter", "ilovedashie", "applebloom", "seriouslyluna", "mylittlefoodmanes", "gallopfrey", "mylittleanime", "mylittleaprilfools", "dashiemotes", "lyra", "tbpimagedump", "mylittlealcoholic", "mlplounge", "mylittleserver", "minuette", "twilightsparkle", "mylittlewarhammer", "ainbowdash", "mylittledamon", "mylittlekindle", "octavia", "pinkiepie", "mylittlewtf", "mylittlenanners", "mylittlewelcomewagon", "mylittlenosleep", "mlpdrawingschool", "mylittledaww", "mylittlemusician", "surprise", "mylittlelistentothis", "applejack", "mylittlecelestias", "mylittlefortress", "roseluck", "mlhfis", "falloutequestria", "mylittlelivestream", "mlas1animotes", "daylightemotes", "mylittlesquidward", "vinylscratch", "mylittlenopenopenope", "thebestpony", "mylittleandysonic1", "idliketobeatree", "mylittlebannertest", "mylittlechaos", "mylittlesupportgroup", "speedingturtle", "mylittlecirclejerk", "mylittleonions", "mylittlecombiners", "mylittlepony");
$subss["main_nsfw"] = Array("mylittlechaos", "mylittlebannertest", "futemotes", "ponyanarchism", "spaceclop", "clopclop", "nsfwgremotes", "mylittlecombiners", "mylittlepony");

$css = Array();

function getStyle($name){
	if(stripos($name,".css") !== false){
		return file_get_contents($name);
	}
	return file_get_contents("http://reddit.com/r/$name/stylesheet.css?r=".rand(0,999999));
}

foreach($subss as $subsss){
	foreach($subsss as $sub){
		if(!isset($css[$sub]))$css[$sub] = getStyle($sub);
		echo ".";
		$count["subs"]++;
		sleep(6);
	}
}

echo "\n";

$i = 0;

foreach($css as $sub => &$data){
	while(!$data && (++$i < 3)){
		echo "$k failed $i times. Retrying\n";
		$count["fails"]++;
		sleep($i * 18);
		if(!@$css[$sub])$css[$sub] = file_get_contents("http://reddit.com/r/$sub/stylesheet.css?r=".rand(0,999999));
	}
}

unset($subsss);
unset($sub);
unset($k);

echo "Retrieved " . $count["subs"] . " subs, failed " . $count["fails"] . " times.\n";



foreach($subss as $k => $subs){
	$cT = new cssEmoteParser();
	if(stripos($k, "_nsfw")===false){
		$cT->nsfw = Array("cock", "dick", "jizz", "/fut", "dashurbate");
	}
	foreach($subs as $s){
		$cT->parseString($css[$s],$s);
	}
	$cT->finalize();
	file_put_contents("$k.min.css", $cT->toString());
	file_put_contents("$k.count", $cT->emoteCount);
}
?>