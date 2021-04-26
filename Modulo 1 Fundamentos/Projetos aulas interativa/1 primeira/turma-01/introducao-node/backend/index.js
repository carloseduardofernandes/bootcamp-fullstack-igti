var express = require('express');
var cors = require('cors');
var app = express();
app.use(cors());

var lotteryNumbers = [];

function getNumber(from, to) {
  return Math.max(from, Math.ceil(Math.random() * to));
}

function generateLotteryNumbers() {
  lotteryNumbers = [];

  while (lotteryNumbers.length < 6) {
    var newNumber = getNumber(1, 60);

    if (!lotteryNumbers.includes(newNumber)) {
      lotteryNumbers.push(newNumber);
    }
  }

  lotteryNumbers.sort(function (a, b) {
    return a - b;
    // if (a < b) {
    //   return -1
    // }

    // if (a > b) {
    //   return 1;
    // }

    // return 0;
  });
}

app.get('/', function (request, response) {
  generateLotteryNumbers();
  response.json({ numbers: lotteryNumbers });
});

app.listen(3001, function () {
  console.log('Servidor iniciado na porta 3001');
});
