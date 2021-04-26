function start() {
  var button = document.querySelector('#buttonLoteria');
  button.addEventListener('click', handleClick);
}

function handleClick() {
  console.log('CLICK');
  var divNumbers = document.querySelector('#divNumbers');
  divNumbers.innerHTML = '';

  fetch('http://localhost:3001').then(function (response) {
    response.json().then(function (json) {
      //console.log(json);
      divNumbers.textContent = JSON.stringify(json, null, 2);
    });
  });
}

start();
