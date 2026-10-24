<!DOCTYPE html>
<html>
<head>
<title>Time And Date</title>
<link rel="icon" href="Images/Time.png" type="image/png" sizes="16x16">
<h2>Check the time now⏲</h2>
</head>
<body>

<style>
#clock{
width: 900px;
margin:100px;
text-align: center;
font-size: 100px
}
html{background-color: #0FF0C9;
text-align: center;
padding: 200px;
}
</style>

<div id="clock"></div>

<script type="text/javascript">
setInterval(displayclock,500 );
function displayclock(){
var time = new Date();
var hrs = time.getHours();
var min= time.getMinutes();
var sec= time.getSeconds();
if (hrs>12) {
hrs=hrs-12;
}

if (hrs=0) {
hrs=12;
}

document.getElementById("clock").innerHTML=hrs+':'min+':'+sec+'  '+en;
}

</script>


</body>
</html>
