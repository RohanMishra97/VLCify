var speed;
var play;
function requestContentScript() {
  chrome.tabs.query({active:true,currentWindow:true},function(tabs){
    chrome.tabs.sendMessage(tabs[0].id,{getval:true,pval:play.classList.contains('glyphicon-play'),sval:speed.value,from:'popup'},function(response){
      console.log(response);
      changePlayButton(response.pval);
      speed.value = response.sval;
    })
  });
}
function init() {
  speed = document.getElementById('speed');
  play = document.querySelector('.pp');
  speed.addEventListener('change',speedChange);
  play.addEventListener('click',handlePlay);
  setTimeout(requestContentScript,500);
}
function messageContentScript() {
  chrome.tabs.query({active:true,currentWindow:true},function(tabs){
    chrome.tabs.sendMessage(tabs[0].id,{getval:false,pval:play.classList.contains('glyphicon-play'),sval:speed.value,from:'popup'},function(response){
      console.log("Content Script says- ",response.status);
    })
  });
}
function speedChange() {
  console.log("Change Speed to ",speed.value);
  messageContentScript();
}
function changePlayButton(playing) {
  if(playing) {
    play.classList.remove('glyphicon-pause');
    play.classList.add('glyphicon-play');
  } else {
    play.classList.remove('glyphicon-play');
    play.classList.add('glyphicon-pause');
  }
}
function handlePlay() {
  console.log("Play/Pause");
  changePlayButton(!play.classList.contains('glyphicon-play'));
  messageContentScript();
}
function isglyphplay() {
  return play.classList.contains('glyphicon-play');
}
function receiver(request,sender,sendResponse) {
  if(request.from === "content") {
    if(speed.value !== request.sval) {
      speed.value = request.sval;
      sendResponse({status:"Speed set."});
    } else if(isglyphplay !== request.pval) {
      changePlayButton(request.pval);
      sendResponse({status:"Play/Pause set."})
    }
  }
}

window.addEventListener('load',init)
chrome.runtime.onMessage.addListener(receiver);
