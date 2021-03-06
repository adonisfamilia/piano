var context = new AudioContext();
var oscillator;
var mouseDown = 0;
var playing = 0;
var lastKey;
var currInsTable;

function loadJSON(file, callback) {
  var xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open('GET', file, true);
  xobj.onreadystatechange = function () {
    if (xobj.readyState == 4 && xobj.status == "200") {

      callback(xobj.responseText);
    }
  };
  xobj.send(null);
}

function load(index) {
  loadJSON("tables.json", function(response) {
    var json = JSON.parse(response);
    changeIns(index, json)
  });
}

load(0);

function changeIns(index, json) {
  var real = new Float32Array(json.table[Number(index)].real);
  var imag = new Float32Array(json.table[Number(index)].imag);
  currInsTable = context.createPeriodicWave(real, imag);
}

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
    oscillator.setPeriodicWave(currInsTable);
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
