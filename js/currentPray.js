function getPrayTimeByStr(times, pray) {
  for (i in listAr) {
    if (listAr[i] === pray)
      return stime(times[list[i].toLowerCase()]);
  }
  return null;
}

function getPraysByModifier(times, modifier) {
  var prays = [];
  for (i in listAr) {
    var prayTimeL = stime(times[list[i].toLowerCase()]);
    var prayStr = listAr[i];
    if (getModifier(prayTimeL) === modifier) prays.push({ prayStr: prayStr, time: prayTimeL });
  }
  return prays;
}

function getCurrentTime(date = new Date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
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

function getNextPray(times, list, index) {
  if (times.length > index) {
    return times[list[++index].toLowerCase()];
  } else {
    return times[list[0].toLowerCase()];
  }
}

function countDown(time, element) {
  if (typeof time === 'undefined') {
    start();
  }
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
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)) - 1;
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    element.innerHTML = hours + ' : ' + minutes + ' : ' + (seconds + 2) + '<br>'
      + 'س : ' + 'د : ' + 'ث';

    if (distance < 0) {
      clearInterval(x);
      element.innerHTML = 'حان الان وقت الصلاة';
      start();
    }
  }, 1000);
}

var currentPrayObject = {};
function start() {
  var currentTime = getCurrentTime();
  var currentPraysByModifier = getPraysByModifier(times, currentModifier);
  var currentModifier = getModifier(currentTime);
  var currentHour = currentTime.split(':')[0];
  
  for (i in list) {
    var splittedStr = times[list[i].toLowerCase()].split(' ');
    var splittedTime = splittedStr[0].split(':');
    var currentPrayHour = splittedTime[0];
    var currentPrayMinutes = splittedTime[1];
    var currentModifierL = splittedStr[1];
    var nextPray = getNextPray(times, list, i);
    var splittedNextPrayStr = nextPray.split(' ');
    var splittedNextPrayTime = splittedNextPrayStr[0].split(':');
    var nextPrayHour = splittedNextPrayTime[0];
    var nextPrayMinute = splittedNextPrayTime[1];
  
    if (currentHour > currentPrayHour && currentModifier === 'pm' || currentHour < nextPrayHour && currentModifier === 'am') {
      currentPrayObject.nextPrayStr = 'الفجر';
      currentPrayObject.nextPrayTime = getPrayTimeByStr(times, currentPrayObject.nextPrayStr);
    } else if (currentHour >= currentPrayHour && currentHour <= nextPrayHour && currentModifier === 'am') {
      currentPrayObject.nextPrayStr = 'الإشراق';
      currentPrayObject.nextPrayTime = getPrayTimeByStr(times, currentPrayObject.nextPrayStr);
    } else if (currentHour >= currentPrayHour && currentHour <= nextPrayHour && currentModifier === 'am') {
      currentPrayObject.nextPrayStr = 'الظهر';
      currentPrayObject.nextPrayTime = getPrayTimeByStr(times, currentPrayObject.nextPrayStr);
    } else if (currentHour <= currentPrayHour && currentHour <= nextPrayHour && currentModifier === 'pm') {
      currentPrayObject.nextPrayStr = 'العصر';
      currentPrayObject.nextPrayTime = getPrayTimeByStr(times, currentPrayObject.nextPrayStr);
    } else if (currentHour >= currentPrayHour && currentHour <= nextPrayHour && currentModifier === 'pm') {
      currentPrayObject.nextPrayStr = 'المغرب';
      currentPrayObject.nextPrayTime = getPrayTimeByStr(times, currentPrayObject.nextPrayStr);
    } else if (currentHour >= currentPrayHour && currentHour <= nextPrayHour && currentModifier === 'pm') {
      currentPrayObject.nextPrayStr = 'العشاء';
      currentPrayObject.nextPrayTime = getPrayTimeByStr(times, currentPrayObject.nextPrayStr);
    }
  }
}

start();
var currentPrayCountDownElement = document.getElementById('current-pray-countdown');
countDown(currentPrayObject.nextPrayTime, currentPrayCountDownElement);

var currentPrayElement = document.getElementById('current-pray');
currentPrayElement.innerHTML = currentPrayObject.nextPrayStr;
