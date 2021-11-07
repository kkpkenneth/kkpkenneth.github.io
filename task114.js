//Define vars to hold time values
let seconds = 0;
let minutes = 0;
let hours = 0;
//Define vars to hold "display" value
let displaySeconds = 0;
let displayMinutes = 0;
let displayHours = 0;
//Define var to hold stopwatch status
let status = "stopped";
//Stopwatch function (logic to determine when to increment next value, etc.)
function stopWatch(){
//Display updated time values to user
    document.getElementById("display").innerHTML =Math.floor(Math.random()*1001);
}
function startStop(){

    if(status === "stopped"){

        //Start the stopwatch (by calling the setInterval() function)
        interval = window.setInterval(stopWatch, 0);
        document.getElementById("startStop").innerHTML = "Stop Generating";
        status = "started";

    }
    else{

        window.clearInterval(interval);
        document.getElementById("startStop").innerHTML = "Start Again";
        status = "stopped";

    }

}