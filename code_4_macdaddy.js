alert("hello");
var requestURL = 'https://api.weather.gov/gridpoints/MTR/89,91'; // json data for Davenport CA
var request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();
alert("hello2");
request.onload = function() {
	var dir, mag, tod; // direction, magnitude, time of day
	var data = request.response;
	alert("hello3");
	alert(data["id"]);
	alert(data["properties"]["windDirection"]["values"][0]["value"]);
	for(var i = 0; i < data["properties"]["windDirection"]["values"].length && i < data["properties"]["windSpeed"]["values"].length; i++){//loop, watch for errors
		tod = (tod+=3)%24;
		if(data["properties"]["windDirection"]["values"][i]["validTime"] === data["properties"]["windSpeed"]["values"][i]["validTime"]){
			dir = data["properties"]["windDirection"]["values"][i]["value"];
			mag = data["properties"]["windSpeed"]["values"][i]["value"];
			//assign direction string
			if( dir >= 330 & dir <= 30){
					dir = "North";
			}
			else if(dir > 30 & dir <= 60){
				dir = "North-East";
			}
			else if(dir > 60 & dir <= 120){
				dir = "East";
			}
			else if(dir > 120 & dir <= 150){
				dir = "South-East";
			}
			else if(dir > 150 & dir <= 210){
				dir = "South";
			}
			else if(dir > 210 & dir <= 240){
				dir = "South-West";
			}
			else if(dir > 240 & dir <= 300){
				dir = "West";
			}
			else{
				dir = "North-West";
			}
			//convert wind speed
			mag = mag * 2.23694 // convert m/s to mph
			
			//create a textnode and append to DOM with information
		
		
		}
}