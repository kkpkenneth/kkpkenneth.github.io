//Define vars to hold tome values
let seconds = 0;
let minutes = 0;
let hours= 0;
//Define vars to hold "display"value
let displaySeconds = 0;
let displayMinutes = 0;
let displayHours = 0;
//Define vars to hold setInterval() function
let interval= null;
//Define vars to hold stopwatch status
let status= "stopped";
//Stopwatch function (logic to determine when to increment next value, etc.)
function stopWatch(){
	seconds++;
	//logic to determine when to increment next value
	if (seconds/60 ===1){
		seconds = 0;
		minutes++;
		if (minutes/60 === 1){
			minutes = 0;
			hours++;
		}
	}
	//IF seconds/minutes/hours are only one dight, add a leading 0 to the value
		if (second<10){	
			displaySeconds = "0" + second.toString();
		}
		else{
			displaySeconds = seconds;
		}
		if (minutes<10){
			displayMinutes = "0" + minutes.toString();
		}
		else{
			displayMinutes = minutes;
		}
		if (hours<10){
			displayHours = "0" + hours.toString();
		}
		else{
			displayHours=hours;
		}
		//Display update time values to user
		document.getElementById("display").innerHTML = displayHours + ":" + displaySeconds;
	}
	function startStop(){
		if (status === "stopped"){
			//starts the stopwatch (by calling the setInterval()function)
			interval = window.setInterval(stopWatch,10);
			document.getElementById("startStop").innerHTML = "STOP";
			status = "started";

		}
	}
	//Function to reset the stopwatch
	function reset(){
		window.clearInterval(interval);
		seconds = 0
		minutes = 0
		hours = 0
		document.getElementById("display").innerHTML = "00:00:00";
		document.getElementById("startStop").innerHTML = "START";
	}