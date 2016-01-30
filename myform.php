<?php
	
	$lacze = mysql_connect('localhost', '18659907_sm_i_kb', 'sm_i_kb1')
	or die("Problem with data base connection");
	
	$baza = mysql_select_db('18659907_sm_i_kb', $lacze)
	or die("Incorrect data base");
	
	mysql_query("SET CHARSET utf8");
	
	$name_lastName = trim($_POST['name_lastName']);
	$e_mail = trim($_POST['e_mail']);
	$subject = trim($_POST['subject']);
	$content_message = $_POST['content_message'];
	
	$zpt = "INSERT INTO messages(name_lastName, e_mail, subject, content_message) VALUES ('$name_lastName', '$e_mail', '$subject', '$content_message')";
	
	$rezultat = mysql_query($zpt, $lacze);
	
?>