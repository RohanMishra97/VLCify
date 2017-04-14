let video = document.querySelector('video');
let body = document.querySelector('body');
let speed =1;
let href = '';

function pp(e){
  if(e.cancelable) {
    //console.log('Propagation Stopped #8');
    e.stopImmediatePropagation();
  }
  if(video.paused) {
    video.play()
  }  else {
    video.pause()
  }
}

function setSpeed(speed){
  //console.log("Speed feature not working now.")
  video.playbackRate = speed;
  console.log(`Playing at -${speed}x`);
}

function keyboard(e) {
  //console.log(e.key)
  switch(e.key){
   case ']':
     speed+= 0.3;
     setSpeed(speed);
     break;
   case '[':
     speed-=0.3;
     setSpeed(speed);
     break;
    case "ArrowLeft":
      time = video.currentTime;
      setTimeout(()=>{
        if(video.currentTime === (time+0.5)) {
          video.currentTime -= 5;
        }
      },500);//pp();
      break;
    case "ArrowRight":
      time = video.currentTime;
      setTimeout(()=>{
        if(video.currentTime === (time+0.5)) {
          video.currentTime += 5;
        }
      },500);//pp();
      break; 
  }
}


function selectVideo() {
  video = document.querySelector('video');
  if(video !== null) {
    video.addEventListener('click',pp);
    body.addEventListener('keydown',keyboard);
  }
}
//TODO - Avoid Polling - Read onpopstate
setInterval(()=>{
  if(href !== window.location.href) {
    href = window.location.href;
    selectVideo();

  }

},1000)

chrome.runtime.onMessage.addListener(receiver);
function receiver(request, sender, sendResponse) {
  if(request.from === 'popup') {
    video = document.querySelector('video');
    if(video !== null) {
      if(request.pval !== 'flag') {
        video.click();
      } else if(request.sval !== 'flag') {
        setSpeed(request.sval);
      }
    }
  }
}


