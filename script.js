var context = new AudioContext();

var oscillator;

var mouseDown = 0;

document.onmousedown = function() {
  ++mouseDown;
}

document.onmouseup = function() {
  oscillator.stop(context.currentTime);
  --mouseDown;
}

function play(freq, clicked) {
  if (mouseDown == 1) {
    oscillator.stop(context.currentTime);
  }
  if (mouseDown == 1 || clicked == true) {
    oscillator = context.createOscillator();
    oscillator.connect(context.destination);
    oscillator.type = 'sawtooth';
    oscillator.frequency.value = Number(freq);
    oscillator.start(context.currentTime);
  }
}
