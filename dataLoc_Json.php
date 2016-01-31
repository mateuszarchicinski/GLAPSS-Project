<?php
    
	header('Content-type: application/json');
	
    $lacze = mysql_connect('localhost', '18659907_sm_i_kb', '')
	or die("Problem with data base connection");
	
    $baza = mysql_select_db('18659907_sm_i_kb', $lacze)
	or die("Incorrect data base");
	
	mysql_query("SET CHARSET utf8");
	
	$zpt = "SELECT * FROM geolocation_phone_signal_strength";
	
	$rezultat = mysql_query($zpt, $lacze);
	
	$pobrane_dane = array();	
	
	while ($wynik = mysql_fetch_row($rezultat)){
		$pobrane_dane[] = $wynik;
		//print_r($wynik);
	}
	
	echo json_encode($pobrane_dane);
	
?>