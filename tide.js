// Pull data from weather underground, slice tide data
function run(){
	var requestURL = 'http://api.wunderground.com/api/d3e330d211d368e8/tide/q/CA/Santa_Cruz.json';
	var request = new XMLHttpRequest();
	request.open('GET', requestURL);
	request.responseType = 'json';
	request.send();
	request.onload = function() {
		var data = request.response;
		var timeStamp, type, startDate, height, time, position, position2;
		var dcnt = 0;
		var entry = 0;
		for(var i = 0; i < data["tide"]["tideSummary"].length; i++){
			timestamp = data["tide"]["tideSummary"][i]["date"]["pretty"];
			date = timestamp.slice(timestamp.length-8, timestamp.length-6); // day of month
			if(startDate === false){
				startDate = date;
			}
			if(date !== startDate){
				dcnt++;
				startDate = date;
				entry = 0;
			}
			if(data["tide"]["tideSummary"][i]["data"]["height"].length>0) {// NOT moon or sunrise
				if(timestamp[4] === " "){ // annoying string slicing to extract the month
					if(date > 9){
						month = timestamp.slice(15, timestamp.length - 8);
					}
					else{
						month = timestamp.slice(15, timestamp.length - 7);
					}
				}
				if(timestamp[5] === " "){
					if(date > 9){
						month = timestamp.slice(16, timestamp.length - 8);
					}
					else{
						month = timestamp.slice(16, timestamp.length - 7);
					}
				}
				//Create and push DOM element
				position2 = document.getElementById("date"+dcnt);
				position2.innerHTML = month + " " + date;
				time = timestamp.slice(0, 8);
				type = data["tide"]["tideSummary"][i]["data"]["type"];
				height = data["tide"]["tideSummary"][i]["data"]["height"];
				position = document.getElementById("e"+dcnt+entry);
				position.innerHTML = type + ", " + height + " ft at " + time;
				entry++;
			}
		}
	}
}

run();
