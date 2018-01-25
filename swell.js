function run(){
	var requestURL = 'http://magicseaweed.com/api/825794d8004ef7c2292c48301cb53d08/forecast/?spot_id=163&units=us&fields=localTimestamp,swell.*,components';
	var request = new XMLHttpRequest();
	request.open('GET', requestURL);
	request.responseType = 'json';
	request.send();
	alert("swell0");
	request.onload = function() {
		//alert("inload");
		var tideData = request.response;
		var startDate = false;
		var dcnt = 0;
		for(var i = 0; i < tideData.length; i++){
			var timeStamp = new Date(tideData[i]["localTimestamp"] * 1000); //doesn't account for milliseconds
			//alert(timeStamp);
			var str = JSON.stringify(timeStamp);
			var date = str.slice(6, 11);
			//alert(date + "date");
			var time = str.slice(12, 14);
			//alert(time + "time"); 
			if(startDate === false){
				startDate = date;
			}
			if(startDate !== date){
				startDate = date;
				dcnt++;
			}
			if(time === "06"){
				var first = " 6am     " + tideData[i]["swell"]["minBreakingHeight"] + " - " + tideData[i]["swell"]["maxBreakingHeight"] + " ft";
				first+= " Primary Swell: " + tideData[i]["swell"]["components"]["primary"]["height"] + " ft at " + tideData[i]["swell"]["components"]["primary"]["period"];
				first+=" seconds from " + tideData[i]["swell"]["components"]["primary"]["compassDirection"];
				first+= " Secondary Swell: " + tideData[i]["swell"]["components"]["secondary"]["height"] + " ft at " + tideData[i]["swell"]["components"]["secondary"]["period"];
				first+=" seconds from " + tideData[i]["swell"]["components"]["secondary"]["compassDirection"];
				addWords(first, startDate, dcnt);
			}
			if(time === "12"){
				var second = " 12pm     " + tideData[i]["swell"]["minBreakingHeight"] + " - " + tideData[i]["swell"]["maxBreakingHeight"] + " ft";
				second+= " Primary Swell: " + tideData[i]["swell"]["components"]["primary"]["height"] + " ft at " + tideData[i]["swell"]["components"]["primary"]["period"];
				second+=" seconds from " + tideData[i]["swell"]["components"]["primary"]["compassDirection"];
				second+= " Secondary Swell: " + tideData[i]["swell"]["components"]["secondary"]["height"] + " ft at " + tideData[i]["swell"]["components"]["secondary"]["period"];
				second+=" seconds from " + tideData[i]["swell"]["components"]["secondary"]["compassDirection"];
				addWords(second, startDate, dcnt);
			}
			if(time === "18"){
				var third = " 6pm     " + tideData[i]["swell"]["minBreakingHeight"] + " - " + tideData[i]["swell"]["maxBreakingHeight"] + " ft";
				third+= " Primary Swell: " + tideData[i]["swell"]["components"]["primary"]["height"] + " ft at " + tideData[i]["swell"]["components"]["primary"]["period"];
				third+=" seconds from " + tideData[i]["swell"]["components"]["primary"]["compassDirection"];
				third+= " Secondary Swell: " + tideData[i]["swell"]["components"]["secondary"]["height"] + " ft at " + tideData[i]["swell"]["components"]["secondary"]["period"];
				third+=" seconds from " + tideData[i]["swell"]["components"]["secondary"]["compassDirection"];
				addWords(third, startDate, dcnt);
			}
			//alert(tideData[i]["swell"]["minBreakingHeight"] + " - " + tideData[i]["swell"]["maxBreakingHeight"]);
		}
	}
}

function addWords(str, startDate, dcnt){
	var position = document.getElementById("Day"+dcnt);
	var newEl = document.createElement('li');
	var newText = document.createTextNode(str);
	newEl.appendChild(newText);
	position.append(newEl);
	var position2 = document.getElementById("D"+dcnt);
	var month = startDate.slice(0, 2);
	var day = startDate.slice(3, 5);
	//left off here, make format same as for wind
	position2.innerHTML = startDate;
}

run();