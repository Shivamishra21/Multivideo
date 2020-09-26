const myVideo = document.getElementById("video");
const btnplay = document.getElementById("btnplay");
const btnpause = document.getElementById("btnpause");
const btnstop = document.getElementById("btnstop");
const btnnext = document.getElementById("btnnext");
const vidnum = document.getElementById("vidnum");
const timeout = document.getElementById("timeout");
let timer = null;

btnplay.addEventListener('click',vidAction);
btnpause.addEventListener('click',vidAction);
btnstop.addEventListener('click',vidAction);
btnnext.addEventListener('click',nextVideo);
myVideo.addEventListener('click',playPause);

const videos = ["production ID_3735544.mp4" ,"Slow Mo Video Of Flying Bees.mp4", "video.mp4", "white-lilies.mp4"];

vidPlaying = 0;
pause = 1;
play = 0;

function vidAction(event){
    console.log(event);
    console.log(event.target.id);
    switch(event.target.id){
        case "btnplay":
            {
               playvideo();
               timer = setInterval(update,100);
               break 
            }
        case "btnpause":
            {
                myVideo.pause();
                break;
            }
        case "btnstop":
            {
                myVideo.pause();
                myVideo.currentTime = 0;
                break;
            }
    }
}
function playvideo(){
    var x = myVideo.play();
    if (x !== undefined) {
        x.then(_ => {
          // Automatic playback started!
          // Show playing UI.
        })
        .catch(error => {
          // Auto-play was prevented
          // Show paused UI.
        });
      }
    timer = setInterval(update,100);
}
function update(){
    timeout.innerHTML = "Time: " + myTime(myVideo.currentTime) + "/" + myTime(myVideo.duration);
    
    myVideo.onended = function(){
        console.log("in update");
        setTimeout(function()
        {vidEnded()},2000)};
}

function myTime(time){
    var hr = ~~(time/3600);
    var min = ~~((time%3600)/60);
    var sec = time%60;
    var sec_min = "";
    if(hr>0){
        sec_min += "" + hr + ":" + (min<10?"0":"");
    }
    sec_min += ""+min+":"+ (sec>10?"0":"");
    sec_min += ""+ Math.round(sec);
    return sec_min;
}
function vidEnded(){
    // setTimeout(function(){myVideo.pause()},2000);
    clearInterval(timer);
    console.log("in function vidEnded")
    timeout.innerHTML = "Timer: 0";
    nextVideo();
    playvideo();
}
function nextVideo(){
    if(vidPlaying<3){
        vidPlaying++;
    }
    else{
        vidPlaying=0;
    }
    myVideo.src = videos[vidPlaying];
    vidnum.innerHTML = (vidPlaying +1) +"/4";
    playvideo();
}

function playPause(){
    if(pause===1){
        playvideo();
        // myVideo.play();
        play = 1;
        pause = 0
    }
    else{
        myVideo.pause();
        pause = 1;
        play = 0

    }
    console.log("in plYpAUSE")
}
