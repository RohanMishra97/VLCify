let video;
let body = document.querySelector('body');
let speed =1;
let time;
let href = window.location.href;

function pp(){
  //console.log("Play/Pause not working now.")
  if(video.paused) {
    setTimeout(function() {
      if(video.paused)
        video.play();
    },1000);
  }  else {
    setTimeout(()=>{
      if(!(video.paused))
        video.pause();
    },1000);
  }
}

function setSpeed(speed){
  //console.log("Speed feature not working now.")
  video.playbackRate = speed;
  console.log(`Playing at -${speed}x`);
}

function keyboard(e) {
  //console.log(e.keyCode)
  switch(e.keyCode){
   case 221:
     speed+= 0.3;
     setSpeed(speed);
     break;
   case 219:
     speed-=0.3;
     setSpeed(speed);
     break;
    case 37:
      time = video.currentTime;
      setTimeout(()=>{
        if(video.currentTime === (time+0.5)) {
          video.currentTime -= 5;
        }
      },500);//pp();
      break;
    case 39:
      time = video.currentTime;
      setTimeout(()=>{
        if(video.currentTime === (time+0.5)) {
          video.currentTime += 5;
        }
      },500);//pp();
      break;
  }

};
function selectVideo() {
  video = document.querySelector('video');
  if(video === null) {
    console.log("No Video Found.")
  }
  else {
    console.log("Video Found.")
    video.addEventListener('click',pp);
    body.addEventListener('keydown',keyboard);
  }
}
//TODO - Avoid Polling - Read onpopstate
setInterval(()=>{
  if(href !== window.location.href) {
    //console.log("href changed.");
    href = window.location.href;
    selectVideo();
  }
},1000)
