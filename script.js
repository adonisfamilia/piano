var context = new AudioContext();

var oscillator;

function play(freq) {
  	oscillator = context.createOscillator();
	oscillator.connect(context.destination);
	oscillator.type = 'sawtooth';
	oscillator.frequency.value = Number(freq);
	oscillator.start(context.currentTime);
}

function stop() {
	oscillator.stop(context.currentTime);
}
