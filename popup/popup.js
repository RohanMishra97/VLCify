var speed;
var play;
function init() {
  speed = document.getElementById('speed');
  play = document.querySelector('.pp');
  speed.addEventListener('change',speedChange);
  play.addEventListener('click',handlePlay);
}

function speedChange() {
  var msg = {
    from: 'popup',
    sval: speed.value,
    pval: 'flag'
  }

  var params = {
    active: true,
    currentWindow: true
  }

  // This searches for the active tabs in the current window
  chrome.tabs.query(params, gotTabs);
  // Now we've got the tabs
  function gotTabs(tabs) {
    // The first tab is the one you are on
    chrome.tabs.sendMessage(tabs[0].id, msg);//, messageBack);
  }
}
function handlePlay() {
  var msg = {
    from: 'popup',
    sval: 'flag',
    pval: play.classList.contains('glyphicon-play')
  }

  var params = {
    active: true,
    currentWindow: true
  }

  // This searches for the active tabs in the current window
  chrome.tabs.query(params, gotTabs);
  // Now we've got the tabs
  function gotTabs(tabs) {
    // The first tab is the one you are on
    chrome.tabs.sendMessage(tabs[0].id, msg);//, messageBack);
  }

  if(play.classList.contains('glyphicon-play')) {
    play.classList.remove('glyphicon-play');
    play.classList.add('glyphicon-pause');
  } else {
    play.classList.remove('glyphicon-pause');
    play.classList.add('glyphicon-play');
  }
}

//   // Whenever those interface elements change
//   // A message is sent to the content script
// function sendMessage() {
//   // Messages are just objects
//   var msg = {
//     from: 'popup',
//     color: col.value(),
//     size: slider.value()
//   }

//   // A tab has be selected for the message to be sent
//   var params = {
//     active: true,
//     currentWindow: true    
//   }
//   // This searches for the active tabs in the current window
//   chrome.tabs.query(params, gotTabs);

//   // Now we've got the tabs
//   function gotTabs(tabs) {
//     // The first tab is the one you are on
//     chrome.tabs.sendMessage(tabs[0].id, msg);//, messageBack);
//   }
// }
window.addEventListener('load',init)
