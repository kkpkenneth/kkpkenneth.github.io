let status = "stopped";
const sports=["3x3 Basketball", "Alpine Skiing", "Snooker", "Archery", "Biathlon", "Billiard", "Artistic Swimming", "Bobsleigh", "Gaming (E-sport)", "Athletics", "Cross Country Skiing", "Bowling", "Badminton", "Curling", "Lawn bowling"                           ]
//Stopwatch function (logic to determine when to increment next value, etc.)
function stopWatch(){
//Display updated time values to user
    let randomIndex=Math.floor(Math.random()*sports.length);
    document.getElementById("display").innerHTML =("value",sports[randomIndex]);
}
function startStop(){

    if(status === "stopped"){

        interval = window.setInterval(stopWatch, 0);
        document.getElementById("startStop").innerHTML = "Stop Generating";
        playAudio();
        status = "started";
    }
    else{

        window.clearInterval(interval);
        document.getElementById("startStop").innerHTML = "Start Again";
        pauseAudio();
        status = "stopped";
    }
} 
function playAudio() { 
        var a = document.getElementById("myAudio");
            a.play();
        }
function pauseAudio() { 
        var a = document.getElementById("myAudio");
            a.pause();
        }