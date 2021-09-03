song="";
leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;
scorelefttWrist=0;
scorerighttWrist=0;
function preload() {
    song = loadSound("music.mp3");
}
function play() {
    song.play();
    song.setVloume(1);
    song.rate(1);
}


function setup() {
    canvas= createCanvas(300,300);
    canvas.center();
    video=createrCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}
function gotPoses(results) {
    if(results.length > 0){
        console.log(results);
        scorelefttWrist = results[0].pose.keypoints[9].score;
        scorerighttWrist = results[0].pose.keypoints[10].score;
        console.log("scorerightWrist = " + scorerighttWrist);
        console.log("scorelefttWrist = " + scorelefttWrist);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX=" + leftWristX + "leftWristY=" + leftWristY);
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX=" + rightWristX + "rightWristY=" + rightWristY);
    }
}
function modelLoaded() {
    console.log("poseNet is intialaized!");
}
function draw() {
    image(video,0 ,0 , 600, 500);
    fill("#FF000");
    stroke("#FF000")
    if (scorerightWrist > 0.2) {
        circle(rightWristX,rightWristY,20);
        if (rightWristY > 0 && rightWristY <= 100) {
            document.getElementById("speed").innerHTML="speed = 0.5x";
            song.rate(0.5);
        }
         else if (rightWristY > 100 && rightWristY <=200) {
             document.getElementById("speed").innerHTML="speed = 1x";
             song.rate(1);
         }
         else if (rightWristY > 200 && rightWristY <=300) {
             document.getElementById("speed").innerHTML="speed = 1.5x";
             song.rate(1.5);
         }
         else if (rightWristY > 300 && rightWristY <=400) {
             document.getElementById("speed").innerHTML="speed = 2x";
             song.rate(2);
         }
         else if(rightWristY > 400 && rightWristY <=500) {
            document.getElementById("speed").innerHTML="speed = 2.5x";
            song.rate(2.5);
         }
            
        
    }
    if(scorelefttWrist > 0.2){
    circle(leftWristX,leftWristY,20);
    InNumberletWristY=Number(leftWristY);
    remove_decimals= floor(InNumberletWristY);
    volume = remove_decimals/500;
    document.getElementById("volume").innerHTML="volume= " + volume;
    song.setVolume(volume);
  
}
}
