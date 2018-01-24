function run(){
	var requestURL = 'http://magicseaweed.com/api/825794d8004ef7c2292c48301cb53d08/forecast/?spot_id=163&units=us&fields=localTimestamp,swell.*,components';
	var request = new XMLHttpRequest();
	request.open('GET', requestURL);
	request.responseType = 'json';
	request.send();
	alert("swell0");
	request.onload = function() {
		alert("inload");
		var tideData = request.response;
		alert(tideData[0]["localTimestamp"]);
		//document.getElementById("temp").innerHTML = "The Current Water Temperature in Monterey is " + tideData["data"][0]["v"] + " degrees Fahreneheit";
	}
}

run();