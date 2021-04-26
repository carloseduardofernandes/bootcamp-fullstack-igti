window.addEventListener('load', start);

let allNames = [];
let filteredNames = [];

let tabUsers = null;
let tabStatistics = null;

let numberFormat = null;

function start() {
  tabUsers = document.querySelector('#tabUsers');
  tabStatistics = document.querySelector('#tabStatistics');

  preventFormSubmit();
  activateInput();

  numberFormat = Intl.NumberFormat('pt-BR');
  fetchNames();
}

async function fetchNames() {
  const res = await fetch(
    'https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo'
  );
  const json = await res.json();

  allNames = json.results.map((user) => {
    const { picture, name, gender, dob } = user;

    return {
      img: picture.thumbnail,
      name: name.first + ' ' + name.last,
      gender: gender,
      age: dob.age,
    };
  });
}

function preventFormSubmit() {
  function handleSubmit(event) {
    event.preventDefault();

    let inputName = getInput();

    let currentName = inputName.value.trim();

    if (currentName === '') {
      return;
    }

    search(currentName);
  }

  let form = document.querySelector('form');
  form.addEventListener('submit', handleSubmit);
}

function activateInput() {
  function handleKeyup(event) {
    if (event.key !== 'Enter') {
      return;
    }

    let currentName = event.target.value.trim();

    if (currentName === '') {
      return;
    }
    search(currentName);
  }

  let inputName = getInput();
  inputName.addEventListener('keyup', handleKeyup);
  inputName.focus();
}

function getInput() {
  return document.querySelector('#inputBusca');
}

function search(busca) {
  filteredNames = allNames.filter((element) =>
    element.name.toLowerCase().includes(busca.toLowerCase())
  );

  filteredNames.sort((a, b) => {
    return a.name.localeCompare(b.name);
  });

  render();
}

function render() {
  renderUsers();
  renderStat();
}

function renderUsers() {
  let usersHTML = '';
  usersHTML += `Resultados: ${totalFiltered()} usuários(s) encontrado(s)<br/>`;

  usersHTML += '<ul class="list-group">';
  filteredNames.forEach((element) => {
    usersHTML += `<li class="list-group-item">`;
    usersHTML += `<img style="border-radius: 50%;" src="${element.img}">`;
    usersHTML += ` ${element.name}, ${element.age}, ${
      element.gender === 'female'
        ? 'Feminino'
        : element.gender === 'male'
        ? 'Masculino'
        : ''
    }</img></li>`;
  });
  usersHTML += '</ul>';

  tabUsers.innerHTML = usersHTML;
}

function renderStat() {
  let statisticsHTML = 'Estatísticas <br/>';

  statisticsHTML += `Sexo Masculino: ${countMale()}<br/>`;
  statisticsHTML += `Sexo Feminino: ${countFemale()}<br/>`;
  statisticsHTML += `Soma das idades: ${numberFormat.format(sumAges())}<br/>`;
  statisticsHTML += `Média das idades: ${numberFormat.format(
    mediaAges().toFixed(2)
  )}<br/>`;

  tabStatistics.innerHTML = statisticsHTML;
}

function totalFiltered() {
  return filteredNames.length;
}
function countMale() {
  return filteredNames.filter((element) => {
    return element.gender.toLowerCase() === 'male';
  }).length;
}

function countFemale() {
  return filteredNames.filter((element) => {
    return element.gender.toLowerCase() === 'female';
  }).length;
}

function sumAges() {
  return filteredNames.reduce(
    (accumulator, element) => accumulator + element.age,
    0
  );
}

function mediaAges() {
  return sumAges() / totalFiltered();
}
