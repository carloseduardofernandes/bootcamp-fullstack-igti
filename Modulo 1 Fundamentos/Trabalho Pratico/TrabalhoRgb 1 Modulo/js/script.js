window.addEventListener('load', start);

var inputRangeRed;
var inputTextRed;

var inputRangeGreen;
var inputTextGreen;

var inputRangeBlue;
var inputTextBlue;

function start() {
  console.log('PÁGINA ESTA CARREGADA');

  inputRangeRed = document.querySelector('#inputRangeRed');
  inputTextRed = document.querySelector('#inputTextRed');
  inputRangeRed.addEventListener('change', setColorRed);

  inputRangeGreen = document.querySelector('#inputRangeGreen');
  inputTextGreen = document.querySelector('#inputTextGreen');
  inputRangeGreen.addEventListener('change', setColorGreen);

  inputRangeBlue = document.querySelector('#inputRangeBlue');
  inputTextBlue = document.querySelector('#inputTextBlue');
  inputRangeBlue.addEventListener('change', setColorBlue);
}

function setColorRed() {
  inputTextRed.value = parseInt(inputRangeRed.value, 10);
  colorDivRgb();
  console.log('event change vermelho');
}

function setColorGreen() {
  inputTextGreen.value = parseInt(inputRangeGreen.value, 10);
  colorDivRgb();
  console.log('event change verde');
}

function setColorBlue() {
  inputTextBlue.value = parseInt(inputRangeBlue.value, 10);
  colorDivRgb();
  console.log('event change azul');
}

function colorDivRgb() {
  var divRgb = document.querySelector('#divRgbColor');
  var newColor =
    'rgb(' +
    inputTextRed.value +
    ',' +
    inputTextGreen.value +
    ',' +
    inputTextBlue.value +
    ')';

  console.log('color é:' + newColor);
  divRgb.style.backgroundColor = newColor;
}
