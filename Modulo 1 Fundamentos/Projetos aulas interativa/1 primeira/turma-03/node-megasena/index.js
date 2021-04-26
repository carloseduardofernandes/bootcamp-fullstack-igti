var express = require('express');
var app = express();

function getLotteryNumbers() {
  var numbers = [];

  while (numbers.length < 6) {
    var number = getRandomNumber();

    if (!numbers.includes(number)) {
      numbers.push(number);
    }
  }

  return numbers.sort(function (a, b) {
    return a - b;
    // if (a > b) {
    //   return 1;
    // }

    // if (a < b) {
    //   return -1;
    // }

    // return 0;
  });
}

function getRandomNumber() {
  return Math.max(1, Math.ceil(Math.random() * 60));
}

app.get('/', function (request, response) {
  var numbers = getLotteryNumbers();

  response.json({ numbers });
});

app.listen(3001, function () {
  console.log('Servidor inicado na porta 3001');
});
