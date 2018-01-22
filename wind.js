alert("hello");
function direction(val){
	if(val>= 330 & val <= 30){
		return "North";
	}
	else if(val > 30 & val <= 60){
		return "North-East";
	}
	else if(val > 60 & val <= 120){
		return "East";
	}
	else if(val > 120 & val <= 150){
		return "South-East";
	}
	else if(val > 150 & val <= 210){
		return "South";
	}
	else if(val > 210 & val <= 240){
		return "South-West";
	}
	else if(val > 240 & val <= 300){
		return "West";
	}
	else{
		return "North-West";
	}
}


function convertSpeed(num){ // API gives value in m*s^-1, wwant in mph, double check when finished
	return num*2.23694;
}

var requestURL = 'https://api.weather.gov/gridpoints/MTR/89,91'; // json data for Davenport CA
var request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();
alert("hello2");
request.onload = function() {
	var data = request.response;
	alert("hello3");
	//alert(data["id"]);
	/*var directions []= data["properties"]["windDirection"]["values"];
	var magnitudes []= data["properties"]["windSpeed"]["values"];
	alert(directions[0]["value"]);
	*/
}
