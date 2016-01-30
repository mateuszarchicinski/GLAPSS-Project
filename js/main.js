// JavaScript Document


// Map Variables
var mapObj;
var map = document.getElementById('Map');
var x = document.getElementById('MapError');
var y = document.getElementById('MapButton');
var lat;
var lon;
var count;


//Markers Colors
var yellowM = 'http://maps.google.com/mapfiles/kml/paddle/ylw-circle.png';
var greenM = 'http://maps.google.com/mapfiles/kml/paddle/grn-circle.png';
var blueM = 'http://maps.google.com/mapfiles/kml/paddle/blu-circle.png';
var redM = 'http://maps.google.com/mapfiles/kml/paddle/red-circle.png';
var whiteM = 'http://maps.google.com/mapfiles/kml/paddle/wht-circle.png';


function getLocationPresent(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    }else{
        x.innerHTML = "Geolocation is not supported by this browser.";
		x.style.lineHeight = "50px";
		x.style.backgroundColor = "#EF5350";
		x.style.visibility = "visible";
    }
}

function showPosition(position){
    lat = position.coords.latitude;
	lon = position.coords.longitude;
	
	count = count + 1;
	
    x.innerHTML = 'Poprawnie dodano marker ! ' + 'Numer pomiaru: ' + count + ' Wartości pomiaru: ' + signal_dBm.value + ' dBm ' + 'Lokalizacja: ' + lat + ' | ' + lon;
	x.style.lineHeight = "25px";
	x.style.backgroundColor = "#66BB6A";
	x.style.visibility = "visible";
	
	addMarkerPresent({title: 'Numer pomiaru: ' + count + ' Wartości pomiaru: ' + signal_dBm.value + ' dBm ' + 'Lokalizacja: ' + lat + ' | ' + lon, draggable: true});
	
	sendData();
	
	signal_dBm.value = "";
	signal_dBm.className = "";
}

function showError(error){
    switch(error.code){
        case error.PERMISSION_DENIED:
            x.innerHTML = "User denied the request for Geolocation.";
			x.style.lineHeight = "50px";
			x.style.backgroundColor = "#EF5350";
			x.style.visibility = "visible";
            break;
        case error.POSITION_UNAVAILABLE:
            x.innerHTML = "Location information is unavailable.";
			x.style.lineHeight = "50px";
			x.style.backgroundColor = "#EF5350";
			x.style.visibility = "visible";
            break;
        case error.TIMEOUT:
            x.innerHTML = "The request to get user location timed out.";
			x.style.lineHeight = "50px";
			x.style.backgroundColor = "#EF5350";
			x.style.visibility = "visible";
            break;
        case error.UNKNOWN_ERROR:
            x.innerHTML = "An unknown error occurred.";
			x.style.lineHeight = "50px";
			x.style.backgroundColor = "#EF5350";
			x.style.visibility = "visible";
            break;
    }
	x.style.lineHeight = "50px";
	x.style.backgroundColor = "#66BB6A";
	x.style.visibility = "hidden";
}

function createMap(lat, lon){
	//52.2296756, 21.012228699999998
	var options =
	{
		center: new google.maps.LatLng(52.2296756, 21.012228699999998),
		zoom: 5,
		sensor: false,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	}
	
	mapObj = new google.maps.Map(map, options);
	
}

function loadMarkers(){
	
	function createObject(){
		return new XMLHttpRequest();
	}
	
	var reqLoc = createObject();
	reqLoc.open('GET','dataLoc_Json.php',true);
	reqLoc.send(null);
	reqLoc.onreadystatechange = function(){
		if(reqLoc.readyState == 4){
			var jsonObj = eval ("(" + reqLoc.responseText + ")");
			
			count = jsonObj.length;
			
			for(i=0;i<jsonObj.length;i++){
				addMarkerPast(jsonObj[i][1],jsonObj[i][2],jsonObj[i][3],{title: 'Numer pomiaru: ' + jsonObj[i][0] + ' Wartości pomiaru: ' + jsonObj[i][3] + ' dBm ' + 'Lokalizacja: ' + jsonObj[i][1] + ' | ' + jsonObj[i][2], draggable: false});
			}
		}
	}
	
}

function addMarkerPresent(optionsMarker){
	
	optionsMarker.map = mapObj;
	
	optionsMarker.position = new google.maps.LatLng(lat, lon);
	
	if(signal_dBm.value > -50){
		optionsMarker.icon = yellowM;
	}else if(signal_dBm.value <= -50 && signal_dBm.value > -80){
		optionsMarker.icon = greenM;
	}else if(signal_dBm.value <= -80 && signal_dBm.value > -100){
		optionsMarker.icon = blueM;
	}else if(signal_dBm.value <= -100 && signal_dBm.value > -110){
		optionsMarker.icon = redM;
	}else{
		optionsMarker.icon = whiteM;
	}	
	
	var newMarker = new google.maps.Marker(optionsMarker);
	
}

function addMarkerPast(a,b,c,d){
	
	var latt = a;
	var lonn = b;
	var signal_dBmm = c;
	var optionsMarker = d;
	
	optionsMarker.map = mapObj;
	
	optionsMarker.position = new google.maps.LatLng(latt, lonn);
	
	if(signal_dBmm > -50){
		optionsMarker.icon = yellowM;
	}else if(signal_dBmm <= -50 && signal_dBmm > -80){
		optionsMarker.icon = greenM;
	}else if(signal_dBmm <= -80 && signal_dBmm > -100){
		optionsMarker.icon = blueM;
	}else if(signal_dBmm <= -100 && signal_dBmm > -110){
		optionsMarker.icon = redM;
	}else{
		optionsMarker.icon = whiteM;
	}	
	
	var newMarker = new google.maps.Marker(optionsMarker);
	
}

var signal_dBm = document.getElementById('signal_dBm');

function isValidButton(a,b){
var placeToValid = a;
var checkLength = b;

	if((placeToValid.value.length > 0) && (placeToValid.value.length <= checkLength) && (placeToValid.value < -10) && (placeToValid.value > -120) && !isNaN(placeToValid.value)){
		signal_dBm.className = "input_okey";
		return true;
	}else{
		x.innerHTML = "Wymagane pole, uzupełnij je o wartość mocy sygnału telefonu komórkowego z którego obecnie korzystasz następnie zapisz pomiar !";
		x.style.lineHeight = "25px";
		x.style.backgroundColor = "#2196F3";
		x.style.visibility = "visible";
		signal_dBm.className = "input_error";
		return false;
	}
}

function sendData(){
	
	var signal_dBm = document.getElementById('signal_dBm').value;
	
	function createObject(){
		return new XMLHttpRequest();
	}
	
	var req = createObject();
	req.open('POST','geoform.php',true);
	req.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	req.send('lat=' + lat + '&lon=' + lon + '&signal_dBm=' + signal_dBm);
	
}

window.addEventListener('load',function(){
	
	createMap();
	loadMarkers();
	
});

y.addEventListener('click',function(){
	
	if(isValidButton(signal_dBm,4) == true){
		getLocationPresent();
	}
	
});

var project = document.getElementById('project');

project.addEventListener('click',function(){
	
	
	
});


// MyForm

var errors = [];

var name_lastName = document.getElementById("name-lastName");
var name_lastNameReg = /^[A-ZĄĆĘŁŃÓŚŹŻ][a-ząćęłńóśźż]+ [A-ZĄĆĘŁŃÓŚŹŻ][a-ząćęłńóśźż]+$/;

function isValid(a,b,c){

var placeToValid = a;
var regEx = b;
var boolable = c;

if(placeToValid.value.length == 0){
	if(boolable){
		errors[0] = "Wymagane pole jest puste";
		placeToValid.className = "input_error";
		return false;
	}else{
		errors[1] = "Wymagane pole jest puste";
		placeToValid.className = "input_error";
		return false;
	}
}else if(placeToValid.value.length >= 1 && placeToValid.value.length <= 150){
	if(regEx.test(placeToValid.value)){
		if(boolable){
			errors[0] = "";
			placeToValid.className = "input_okey";
			return true;
		}else{
			errors[1] = "";
			placeToValid.className = "input_okey";
			return true;
		}
	}else{
		if(boolable){
			errors[0] = "Wypełnij pole wg. wzorca np. Jan Kowalski";
			placeToValid.className = "input_error";
			return false;
		}else{
			errors[1] = "Wypełnij pole wg. wzorca np. Example@exm.com";
			placeToValid.className = "input_error";
			return false;
		}
	}
}else{
	if(boolable){
		errors[0] = "Imie i Nazwisko razem nie może przekraczać 150 znaków";
		placeToValid.className = "input_error";
		return false;
	}else{
		errors[1] = "E-Mail nie może przekraczać 150 znaków";
		placeToValid.className = "input_error";
		return false;
	}
}

};

name_lastName.addEventListener('blur',function(){

	isValid(name_lastName,name_lastNameReg, true);
	printErrors();

});

var e_mail = document.getElementById("e-mail");
var e_mailReg = /^\w+(\.\w+)*@\w+(\.\w+)*\.\w{2,4}$/;

e_mail.addEventListener('blur',function(){

	isValid(e_mail,e_mailReg, false);
	printErrors();

});

var subject = document.getElementById('subject');

function isEnoughSize(a,b,c,d){

var placeToCheck = a;
var minSize = b;
var maxSize = c;
var boolable = d;

if(placeToCheck.value.length == 0){
	if(boolable){
		errors[2] = "Wymagane pole jest puste";
		placeToCheck.className = "input_error";
		return false;
	}else{
		errors[3] = "Wymagane pole jest puste";
		placeToCheck.className = "input_error";
		return false;
	}
}else if(placeToCheck.value.length >= minSize && placeToCheck.value.length <= maxSize){
	if(boolable){
		errors[2] = "";
		placeToCheck.className = "input_okey";
		return true;
	}else{
		errors[3] = "";
		placeToCheck.className = "input_okey";
		return true;
	}
}else{
	if(boolable){
		errors[2] = "Temat nie może przekraczać 100 znaków";
		placeToCheck.className = "input_error";
		return false;
	}else{
		errors[3] = "Treść wiadomości nie może przekraczać 1000 znaków";
		placeToCheck.className = "input_error";
		return false;
	}
}

}

subject.addEventListener('blur',function(){

	isEnoughSize(subject, 1, 100, true);
	printErrors();

});

var content_message = document.getElementById('content-message');

content_message.addEventListener('blur',function(){

	isEnoughSize(content_message, 1, 1000, false);
	printErrors();

});

function printErrors(){
	
	var place = document.getElementById('form-info');
	
	place.innerHTML = "";
	
	var j = 0;
	
	for(var i in errors){
		if(!errors[i] == ""){
			j++;
			place.innerHTML +=  j + ". " + errors[i] + "<br/>";
		}
	}
	
};

function onSubmit(){

if(isValid(name_lastName,name_lastNameReg, true) && isValid(e_mail,e_mailReg, false) && isEnoughSize(subject, 1, 100, true) && isEnoughSize(content_message, 1, 1000, false)){
	return true;
}else{
	return false;
}

}

var myform = document.getElementById('myform');

myform.addEventListener('submit',function(e){
	
	e.preventDefault();
	
	if(onSubmit()){
		sendMessage();
		cleanValues();
	}else{
		alert("Wypełnij prawidłowo formularz widomości !");
	}
	
});

var btn_submit = document.getElementById('submit');

btn_submit.addEventListener('click',function(){

	isValid(name_lastName,name_lastNameReg, true);
	isValid(e_mail,e_mailReg, false);
	isEnoughSize(subject, 1, 100, true);
	isEnoughSize(content_message, 1, 1000, false);
	printErrors();

});

function cleanValues(){
	name_lastName.value = "";
	name_lastName.className = "";
	e_mail.value = "";
	e_mail.className = "";
	subject.value = "";
	subject.className = "";
	content_message.value = "";
	content_message.className = "";
}

function sendMessage(){
	
	var name_lastName = document.getElementById('name-lastName').value;
	var e_mail = document.getElementById('e-mail').value;
	var subject = document.getElementById('subject').value;
	var content_message = document.getElementById('content-message').value;
	
	function createObject(){
		return new XMLHttpRequest();
	}
	
	var req = createObject();
	req.open('POST','myform.php',true);
	req.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	req.send('name_lastName=' + name_lastName + '&e_mail=' + e_mail + '&subject=' + subject + '&content_message=' + content_message);
	alert("Dziękujemy za wiadomość jeteśmy w kontakcie !");
	
};

var GM_active = document.getElementById('GM-active');
var C_active = document.getElementById('C-active');

GM_active.addEventListener('click',function(){
	GM_active.className = "active-menu-item";
	C_active.className = "";
});

C_active.addEventListener('click',function(){
	GM_active.className = "";
	C_active.className = "active-menu-item";
});


// Jquery Document


$('#googleMapHeader').click(
	function(event){
	event.preventDefault();
	
	$('html,body').animate(
		{
			scrollTop: $('#googleMap').offset().top
		},
			100
	);
});

$('#contactHeader').click(
	function(event){
	event.preventDefault();
	
	$('html,body').animate(
		{
			scrollTop: $('#contact').offset().top
		},
			500
	);
});