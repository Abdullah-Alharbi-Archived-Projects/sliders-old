// Javascript is used to set the clock to your computer time.

var currentSec = getSecondsToday();

var sec = (currentSec / 60) % 1;
var minutes = (currentSec / 3600) % 1;
var hours = (currentSec / 43200) % 1;

setTime(60 * sec, "second");
setTime(3600 * minutes, "minute");
setTime(43200 * hours, "hour");

function setTime(left, hand) {
  document.querySelector('.clock__' + hand).style.animationDelay = '' + left * -1 + 's';
}

function getSecondsToday() {
  let now = new Date();

  let today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  let diff = now - today; 
  return Math.round(diff / 1000);
}

const indicatorsNumber = 60;
const clockElement = document.querySelector('.clock');

for (let i = 0; i < indicatorsNumber; i++) {
  const indicatorSection = document.createElement('section');
  indicatorSection.setAttribute('class', 'clock__indicator');
  clockElement.appendChild(indicatorSection);
}
