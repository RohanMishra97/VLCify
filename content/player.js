let video = document.querySelector('video');
let body = document.querySelector('body');
let speed =1;
let href = '';

//Sends Messages to Popup.
function messagePopup(a,b) {
  chrome.runtime.sendMessage({pval: a,sval: b,from: 'content'},function(response){
    console.log("Popup says- ",response.status);
  });
}
//pp() handles Play and Pause
function pp(e){
  messagePopup(video.paused,video.playbackRate)
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
//setSpeed() sets video Speed to Speed
function setSpeed(speed){
  //console.log("Speed feature not working now.")
  video.playbackRate = speed;
  console.log(`Playing at ${speed}x`);
  messagePopup(!video.paused,video.playbackRate)
}
//Handles all keyboard shortcuts
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
//Selects video from HTML page.
function selectVideo() {
  video = document.querySelector('video');
  if(video !== null) {
    video.addEventListener('click',pp);
    body.addEventListener('keydown',keyboard);
  }
}
//Receives messages from Popup.
function receiver(request,sender,sendResponse) {
  if(request.from === "popup") {
    video = document.querySelector('video');
    if(video!=null) {
      if(request.getval) {
        sendResponse({sval:video.playbackRate,pval:!video.paused,status:"Set Initial Values"})
      } else {
        if(request.pval === video.paused) {
          if(video.paused) {
            video.play()
          }  else {
            video.pause()
          }
          sendResponse({status:"Play/Pause done."})
        }
        if(request.sval !== video.playbackRate) {
          video.playbackRate = request.sval;
          console.log(`Playing at ${request.sval}x`);
          sendResponse({status:"Speed set."})
        }
      }
    }
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
