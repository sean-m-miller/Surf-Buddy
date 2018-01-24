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
		//var d = new Date(0);
		for(var i = 0; i < tideData.length; i++){
			var time = new Date(tideData[i]["localTimestamp"] * 1000); //doesn't account for milliseconds
			alert(time);
			String(time);
			alert(typeof(time));
			
		}
	}
}

run();