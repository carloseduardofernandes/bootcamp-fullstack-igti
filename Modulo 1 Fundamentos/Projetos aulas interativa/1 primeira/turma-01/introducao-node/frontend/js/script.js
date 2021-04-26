//window.addEventListener('load', start);

function start() {
  var button = document.querySelector('#buttonGenerate');
  button.addEventListener('click', handleButtonClick);
}

function handleButtonClick() {
  var div = document.querySelector('#numbers');
  div.innerHTML = '';

  fetch('http://localhost:3001').then(function (resource) {
    return resource.json().then(function (json) {
      var span = document.createElement('span');
      span.textContent = JSON.stringify(json);
      div.appendChild(span);
    });
  });
}

start();
