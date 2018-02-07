function run(){
	var requestURL = 'https://tidesandcurrents.noaa.gov/api/datagetter?date=latest&station=9413450&product=water_temperature&units=english&time_zone=lst&application=Tides_and_Currents&format=json';
	var request = new XMLHttpRequest();
	request.open('GET', requestURL);
	request.responseType = 'json';
	request.send();
	request.onload = function() {
		var Data = request.response;
		//Simple JSON parse, only getting water temp from this API
		document.getElementById("temp").innerHTML = "The Current Water Temperature in Monterey is " + Data["data"][0]["v"] + " degrees Fahreneheit";
	}
}

run();
