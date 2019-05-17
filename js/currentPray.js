function convertTimeToUnix(time) {
  var now = new Date();
  var h = time.split(':')[0];
  var min = time.replace(/[a-z.ص.م]/gi, '').split(':')[1];
  var md = getModifier(time);
  var splittedNowStr = now.toDateString().split(' ');

  // convert str time to date object
  var ending = new Date(splittedNowStr[1] + ' ' + splittedNowStr[2] + ', ' + splittedNowStr[3] + ' ' + h + ':' + min.replace(' ', '') + ':00 ' + md);
  var unixTimeEnding = ending.getTime() / 1000;
  return unixTimeEnding;
}

function getModifier(time, locale = 'en') {
  var splittedTime = time.split(' ');
  var modifier = splittedTime[1];

  if (locale === 'en') {
    return modifier === 'ص' ? modifier.replace('ص', 'am') : modifier.replace('م', 'pm');
  } else {
    return modifier === 'am' ? modifier.replace('am', 'ص') : modifier.replace('pm', 'ص');
  }
}


function countDown(time, element) {
  var x = setInterval(function () {
    var now = new Date();
    var h = time.split(':')[0];
    var min = time.replace(/[a-z.ص.م]/gi, '').split(':')[1];
    var md = getModifier(time);
    var splittedNowStr = now.toDateString().split(' ');
    // convert str time to date object
    var ending = new Date(splittedNowStr[1] + ' ' + splittedNowStr[2] + ', ' + splittedNowStr[3] + ' ' + h + ':' + min.replace(' ', '') + ':00 ' + md);

    var distance = ending.getTime() - now.getTime();

    // Time calculations for days, hours, minutes and seconds
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    element.innerHTML = hours + ' : ' + minutes + ' : ' + (seconds + 2) + '<br>'
      + 'س : ' + 'د : ' + 'ث';

    if (distance < 0) {
      clearInterval(x);
      element.innerHTML = 'حان الان وقت الصلاة';
      setTimeout(function() {
        run();
      }, 1000 * 2)
    }
  }, 1000);
}

var currentPrayObject = {
  name: '',
  time: ''
};

function run() {
  for (i in list) {
    var prayUnix = convertTimeToUnix(times[list[i].toLowerCase()]);
    var now = new Date();
    var nowUnix = now.getTime() / 1000;
    var diff = prayUnix - nowUnix;
  
    if (diff <= 0) {
      continue;
    } else {
      currentPrayObject.name = listAr[i];
      currentPrayObject.time = times[list[i].toLowerCase()];
      break;
    }
  }
}

run();
var currentPrayCountDownElement = document.getElementById('current-pray-countdown');
countDown(currentPrayObject.time, currentPrayCountDownElement);

var currentPrayElement = document.getElementById('current-pray');
currentPrayElement.innerHTML = currentPrayObject.name;
