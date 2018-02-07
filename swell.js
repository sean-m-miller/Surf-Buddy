function run(){ //by wrapping script in run(), scope of variables is limited to swell.js
	//API request "plumbing"
	var requestURL = 'http://magicseaweed.com/api/825794d8004ef7c2292c48301cb53d08/forecast/?spot_id=163&units=us&fields=localTimestamp,swell.*,components';
	var request = new XMLHttpRequest();
	request.open('GET', requestURL);
	request.responseType = 'json';
	request.send();
	request.onload = function() {
		var tideData = request.response;
		var startDate = false;
		var dcnt = 0;
		//JSON data has loaded, parse away!
		for(var i = 0; i < tideData.length; i++){
			var timeStamp = new Date(tideData[i]["localTimestamp"] * 1000); //doesn't account for milliseconds
			var str = JSON.stringify(timeStamp);
			var date = str.slice(6, 11);
			var time = str.slice(12, 14);
			if(startDate === false){
				startDate = date;
			}
			if(startDate !== date){
				startDate = date;
				dcnt++;
			}
			if(time === "06"){ // 6am swell forecast
				var first = " 6am     " + tideData[i]["swell"]["minBreakingHeight"] + " - " + tideData[i]["swell"]["maxBreakingHeight"] + " ft";
				first+= " Primary Swell: " + tideData[i]["swell"]["components"]["primary"]["height"] + " ft at " + tideData[i]["swell"]["components"]["primary"]["period"];
				first+=" seconds from " + tideData[i]["swell"]["components"]["primary"]["compassDirection"];
				first+= " Secondary Swell: " + tideData[i]["swell"]["components"]["secondary"]["height"] + " ft at " + tideData[i]["swell"]["components"]["secondary"]["period"];
				first+=" seconds from " + tideData[i]["swell"]["components"]["secondary"]["compassDirection"];
				addWords(first, startDate, dcnt);
			}
			if(time === "12"){ // 12am swell forecast
				var second = " 12pm     " + tideData[i]["swell"]["minBreakingHeight"] + " - " + tideData[i]["swell"]["maxBreakingHeight"] + " ft";
				second+= " Primary Swell: " + tideData[i]["swell"]["components"]["primary"]["height"] + " ft at " + tideData[i]["swell"]["components"]["primary"]["period"];
				second+=" seconds from " + tideData[i]["swell"]["components"]["primary"]["compassDirection"];
				second+= " Secondary Swell: " + tideData[i]["swell"]["components"]["secondary"]["height"] + " ft at " + tideData[i]["swell"]["components"]["secondary"]["period"];
				second+=" seconds from " + tideData[i]["swell"]["components"]["secondary"]["compassDirection"];
				addWords(second, startDate, dcnt);
			}
			if(time === "18"){ // 6pm swell forecast
				var third = " 6pm     " + tideData[i]["swell"]["minBreakingHeight"] + " - " + tideData[i]["swell"]["maxBreakingHeight"] + " ft";
				third+= " Primary Swell: " + tideData[i]["swell"]["components"]["primary"]["height"] + " ft at " + tideData[i]["swell"]["components"]["primary"]["period"];
				third+=" seconds from " + tideData[i]["swell"]["components"]["primary"]["compassDirection"];
				third+= " Secondary Swell: " + tideData[i]["swell"]["components"]["secondary"]["height"] + " ft at " + tideData[i]["swell"]["components"]["secondary"]["period"];
				third+=" seconds from " + tideData[i]["swell"]["components"]["secondary"]["compassDirection"];
				addWords(third, startDate, dcnt);
			}
		}
	}
}

function addWords(str, startDate, dcnt){
	//Create a new swell forecast DOM element
	var position = document.getElementById("Day"+dcnt);
	var newEl = document.createElement('li');
	var newText = document.createTextNode(str);
	newEl.appendChild(newText);
	position.append(newEl);
	var position2 = document.getElementById("D"+dcnt);
	var month = startDate.slice(0, 2);
	var day = startDate.slice(3, 5);
	//left off here, make format same as for wind
	if(month === "01"){
		month = "Jan";
	}
	else if(month === "02"){
		month = "Feb";
	}
	else if(month === "03"){
		month = "Mar";
	}
	else if(month === "04"){
		month = "Apr";
	}
	else if(month === "05"){
		month = "May";
	}
	else if(month === "06"){
		month = "Jun";
	}
	else if(month === "07"){
		month = "Jul";
	}
	else if(month === "08"){
		month = "Aug";
	}
	else if(month === "09"){
		month = "Sep";
	}
	else if(month === "10"){
		month = "Oct";
	}
	else if(month === "11"){
		month = "Nov";
	}
	else{
		month = "Dec";
	}
	//push to DOM
	position2.innerHTML = month + " " + day;
}

run();
