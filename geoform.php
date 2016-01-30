<?php
	
	$lacze = mysql_connect('localhost', '18659907_sm_i_kb', 'sm_i_kb1')
	or die("Problem with data base connection");
	
	$baza = mysql_select_db('18659907_sm_i_kb', $lacze)
	or die("Incorrect data base");
	
	mysql_query("SET CHARSET utf8");
	
	$lat = trim($_POST['lat']);
	$lon = trim($_POST['lon']);
	$signal_dBm = trim($_POST['signal_dBm']);
	
	if(!empty($lat) && !empty($lon) && !empty($signal_dBm) && is_numeric($lat) && is_numeric($lon) && is_numeric($signal_dBm) && $signal_dBm < -10 && $signal_dBm > -120){
		
		$zpt = "INSERT INTO geolocation_phone_signal_strength(lat, lon, signal_dBm) VALUES ('$lat', '$lon', '$signal_dBm')";
		
		$rezultat = mysql_query($zpt, $lacze);
		
    }
	
?>