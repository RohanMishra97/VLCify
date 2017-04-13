var speed;
var play;
function init() {
  speed = document.getElementById('speed');
  play = document.querySelector('.pp');

  console.log(play);
  play.addEventListener('click',handlePlay);
}

function handlePlay() {
  if(play.classList.contains('glyphicon-play')) {
    play.classList.remove('glyphicon-play');
    play.classList.add('glyphicon-pause');
  } else {
    play.classList.remove('glyphicon-pause');
    play.classList.add('glyphicon-play');
  }
}
window.addEventListener('load',init)
