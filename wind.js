function addText(dir, spd, time, date, dcnt){
	var month, day, str;
	//assign direction
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
	spd = Math.round(10*(spd * 2.23694))/10; // convert m/s to mph, round to tenths place
	//convert time
	if(time === "12"){
		time += " pm";
	}
	else if(time > 12){
		time = time - 12 + " pm";
	}
	else if(time === "00"){
		time = "12 am";
	}
	else{
		time = time.slice(1,2) + " am";
	}
	//convert date
	month = date.slice(0,2);
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
	day = date.slice(3, 5);
	date = month + " " + day;
	str = spd + " mph " + dir + " wind at " + time + " on " + date;
	var newEl = document.createElement('li');
	var newText = document.createTextNode(str);
	newEl.appendChild(newText);
	var position = document.getElementById("day"+dcnt);
	position.append(newEl);
	//alert(spd + " mph " + dir + " wind at " + time + " on " + date);
}

//alert("hello");
function run(){
	var requestURL = 'https://api.weather.gov/gridpoints/MTR/89,91'; // json data for Davenport CA
	var request = new XMLHttpRequest();
	request.open('GET', requestURL);
	request.responseType = 'json';
	request.send();
	//alert("hello2");
	request.onload = function() {
		alert("Inside onload");
		var dir, spd, tod, dirCnt, spdCnt, date1, date2, time1, time2, daycount, startdate; // direction, magnitude, time of day, direction offset, speed offset, date1 & time1 are for DIRECTION;
		var data = request.response;
		dirCnt = 0;
		spdCnt = 0;
		//alert("before while loop");
		daycount = 0;
		startdate = data["properties"]["windDirection"]["values"][dirCnt]["validTime"].slice(5, 10);
		while(dirCnt < data["properties"]["windDirection"]["values"].length && spdCnt < data["properties"]["windSpeed"]["values"].length){ // Only add data where speed and direction are temporally matched (there are instances where they lose sync)
			//alert("inside while loop");
			date1 = data["properties"]["windDirection"]["values"][dirCnt]["validTime"].slice(5, 10);
			time1 = data["properties"]["windDirection"]["values"][dirCnt]["validTime"].slice(11, 13);
			date2 = data["properties"]["windSpeed"]["values"][spdCnt]["validTime"].slice(5, 10);
			time2 = data["properties"]["windSpeed"]["values"][spdCnt]["validTime"].slice(11, 13);
			if(date1 === date2){
				if (date1 !== startdate){
					startdate = date1;
					daycount++;
				}
				if(time1 === time2){
					addText(data["properties"]["windDirection"]["values"][dirCnt]["value"], data["properties"]["windSpeed"]["values"][spdCnt]["value"], time1, date1, daycount); //direction, speed, time format
					spdCnt++;
					dirCnt++;
				}
				else if(time1 > time2){ // direction skipped and entry, update spdCnt
					spdCnt ++;
				}
				else{
					dirCnt ++;
				}
			}
			else if(date1 > date2){ // direction skipped, update spdCnt
				spdCnt++;
			}
			else{
				dirCnt++;
			}
		}
	}
}

run();