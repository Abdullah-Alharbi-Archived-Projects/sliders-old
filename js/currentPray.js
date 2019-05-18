function tConv24(time24) {
  var ts = time24;
  var H = +ts.substr(0, 2);
  var h = H % 12 || 12;
  h = h < 10 ? "0" + h : h;
  var ampm = H < 12 ? " AM" : " PM";
  ts = h + ts.substr(2, 3) + ampm;
  return ts;
}

function convertTimeToUnix(time) {
  var now = new Date();
  var h = time.split(":")[0];
  var min = time.replace(/[a-z.ص.م]/gi, "").split(":")[1];
  var md = getModifier(time);
  var splittedNowStr = now.toDateString().split(" ");

  // convert str time to date object
  var ending = new Date(
    splittedNowStr[1] +
      " " +
      splittedNowStr[2] +
      ", " +
      splittedNowStr[3] +
      " " +
      h +
      ":" +
      min.replace(" ", "") +
      ":00 " +
      md
  );
  var unixTimeEnding = ending.getTime() / 1000;
  return unixTimeEnding;
}

function getModifier(time, locale = "en") {
  var splittedTime = time.split(" ");
  var modifier = splittedTime[1];

  if (locale === "en") {
    return modifier === "ص"
      ? modifier.replace("ص", "am")
      : modifier.replace("م", "pm");
  } else {
    return modifier === "am"
      ? modifier.replace("am", "ص")
      : modifier.replace("pm", "ص");
  }
}

function countDown(time, element) {
  var x = setInterval(function() {
    var now = new Date();
    var h = time.split(":")[0];
    var min = time.replace(/[a-z.ص.م]/gi, "").split(":")[1];
    var md = getModifier(time);
    var splittedNowStr = now.toDateString().split(" ");
	var nowTimeStr = now.toTimeString();
	var nowH = parseInt(tConv24(nowTimeStr).split(':')[0]);
	var nowM = parseInt(tConv24(nowTimeStr).split(':')[1]);
	
	if (nowH >= h && nowM >= min && getModifier(tConv24(nowTimeStr)) === "PM") {
		splittedNowStr[2] = parseInt(splittedNowStr[2]) + 1;
	}
	
    // convert str time to date object
    var ending = new Date(
      splittedNowStr[1] +
        " " +
        splittedNowStr[2] +
        ", " +
        splittedNowStr[3] +
        " " +
        h +
        ":" +
        min.replace(" ", "") +
        ":00 " +
        md
    );

    var distance = ending.getTime() - now.getTime();

    // Time calculations for days, hours, minutes and seconds
    var hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
	var seconds = Math.floor(((distance + 9000) % (1000 * 60)) / 1000);
	
    element.innerHTML =
      hours +
      " : " +
      minutes +
      " : " +
      seconds;

    if (distance < 0) {
      clearInterval(x);
      element.innerHTML = 'حان الان وقت الصلاة';
      setTimeout(run, 1000 * 2);
    }
  }, 1000);
}

var currentPrayObject = {
  name: "الفجر",
  time: times[list[0].toLowerCase()]
};

function run() {
  for (i in list) {
    var now = new Date();
    var prayUnix = convertTimeToUnix(times[list[i].toLowerCase()]);
    var nowUnix = now.getTime() / 1000;
	var diff = prayUnix - nowUnix;
    var currentTimeL = tConv24(now.toTimeString()).split(":");
	var currentHour = currentTimeL[0];
	var currentMinutes = currentTimeL[1];

    if (diff <= 0) {
      continue;
    } else {
      currentPrayObject.name = listAr[i];
      currentPrayObject.time = times[list[i].toLowerCase()];
      break;
    }
  }
  
  console.log(currentPrayObject);
  var currentPrayCountDownElement = document.getElementById(
  "current-pray-countdown"
  );
  countDown(currentPrayObject.time, currentPrayCountDownElement);

  var currentPrayElement = document.getElementById("current-pray");
  currentPrayElement.innerHTML = currentPrayObject.name;
}

// updated!
run();

