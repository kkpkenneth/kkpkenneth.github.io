let status = "stopped";
let status2 = "stopped";
let status3 = "stopped";
const place=["Bedroom", "Living room", "Kitchen", "Bathroom", "Basement", "Attic", "Garden", "Swimming pool", "Rainforest", "Ocean", "Desert", "Grassland", "Savanna", "Taiga", "Tundra"]
const game=["Special mission", "Walk the dog", "Watch a cowgirl movie", "Eat with a spoon", "Iron the clothes", "Order bento delivery", "Take a car ride", "Plant a lotus", "Do 69 sit ups or push ups", "Tidy up"]
const time=["5 min", "10 min", "15 min", "20 min", "25 min", "30 min", "35 min", "40 min", "45 min", "50 min", "55 min", "60 min", "70 min", "80 min", "90 min", "100 min", "120 min" ]
//Stopwatch function (logic to determine when to increment next value, etc.)
function stopWatch(){
//Display updated time values to user
    let randomIndex=Math.floor(Math.random()*place.length);
    document.getElementById("display").innerHTML =("value",place[randomIndex]);
}

function stopWatch2(){
//Display updated time values to user
    let randomIndex=Math.floor(Math.random()*game.length);
    document.getElementById("display2").innerHTML =("value",game[randomIndex]);
}

function stopWatch3(){
//Display updated time values to user
    let randomIndex=Math.floor(Math.random()*time.length);
    document.getElementById("display3").innerHTML =("value",time[randomIndex]);
}

function startStop(){

    if(status === "stopped"){

        interval = window.setInterval(stopWatch, 0);
        document.getElementById("startStop").innerHTML = "Stop Touching";
        playAudio();
        status = "started";
    }
    else{

        window.clearInterval(interval);
        document.getElementById("startStop").innerHTML = "Touch Again";
        status = "stopped";
    }
} 

function startStop2(){

    if(status2 === "stopped"){

        interval2 = window.setInterval(stopWatch2, 0);
        document.getElementById("startStop2").innerHTML = "Stop Touching";
        playAudio();
        status2 = "started";
    }
    else{

        window.clearInterval(interval2);
        document.getElementById("startStop2").innerHTML = "Touch Again";
        status2 = "stopped";
    }
} 

function startStop3(){

    if(status3 === "stopped"){

        interval3 = window.setInterval(stopWatch3, 0);
        document.getElementById("startStop3").innerHTML = "Stop Touching";
        playAudio();
        status3 = "started";
    }
    else{

        window.clearInterval(interval3);
        document.getElementById("startStop3").innerHTML = "Touch Again";
        status3 = "stopped";
    }
} 
function playAudio() { 
        var a = document.getElementById("myAudio");
           a.play();
        }
