var context = new AudioContext();
var oscillator;
var mouseDown = 0;
var playing = 0;
var lastKey;

function stop() {
  if (playing == 1) {
  	oscillator.stop(context.currentTime);
	switch(lastKey.className.animVal) {
	  case "white": lastKey.style.fill = "white"; break;
	  case "black": lastKey.style.fill = "black"; break;
	  default: lastKey.style.fill = "blue";
	}
  	--playing;
	return;
  }
  switch(lastKey.className.animVal) {
    case "white": lastKey.style.fill = "white"; break;
    case "black": lastKey.style.fill = "black"; break;
    default: lastKey.style.fill = "blue";
  }

}

document.onmousedown = function() {
  ++mouseDown;
}

document.onmouseup = function() {
  stop();
  --mouseDown;
}

function play(freq, clicked, id) {
  var key = document.getElementById(id);
  lastKey = key;
  if (mouseDown == 1) {
    stop();
  }
  if (mouseDown == 1 || clicked == true) {
    oscillator = context.createOscillator();
    oscillator.connect(context.destination);
    oscillator.type = 'sawtooth';
    oscillator.frequency.value = Number(freq);
    oscillator.start(context.currentTime);
    switch(key.className.animVal) {
      case "white": key.style.fill = "#BBDDBB"; break;
      case "black": key.style.fill = "#224422"; break;
      default: key.style.fill = "red";
    }
    ++playing;
    return;
  }
  switch(key.className.animVal) {
    case "white": key.style.fill = "#DDFFDD"; break;
    case "black": key.style.fill = "#446644"; break;
    default: key.style.fill = "red";
  }
}
