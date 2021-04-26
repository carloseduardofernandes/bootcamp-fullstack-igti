var express = require('express');
var cors = require('cors');
var app = express();
app.use(cors());

function getLotteryNumbers() {
  var numbers = [];

  while (numbers.length < 6) {
    var number = getRandomNumber(1, 60);

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

function getRandomNumber(from, to) {
  return Math.max(from, Math.ceil(Math.random() * to));
}

app.get('/', function (request, response) {
  var numbers = getLotteryNumbers();

  response.json({ numbers });
});

app.listen(3001, function () {
  console.log('Servidor iniciado na porta 3001');
});

console.log(getLotteryNumbers());
