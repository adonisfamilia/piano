var context = new AudioContext();
var oscillator;
var mouseDown = 0;
var playing = 0;

function stop() {
  if (playing == 1) {
  	oscillator.stop(context.currentTime);
  	--playing;
  }
}

document.onmousedown = function() {
  ++mouseDown;
}

document.onmouseup = function() {
  stop();
  --mouseDown;
}

function play(freq, clicked) {
  if (mouseDown == 1) {
    stop();
  }
  if (mouseDown == 1 || clicked == true) {
    oscillator = context.createOscillator();
    oscillator.connect(context.destination);
    oscillator.type = 'sawtooth';
    oscillator.frequency.value = Number(freq);
    oscillator.start(context.currentTime);
    ++playing;
  }
}
