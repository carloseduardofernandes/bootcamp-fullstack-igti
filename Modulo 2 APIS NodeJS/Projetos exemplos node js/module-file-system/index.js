/*import fs from 'fs';
//utilizando callbacks(recomendado node js)
console.log('1');
fs.writeFile('teste.txt', 'bla bla bla', function (err) {
  console.log('2');
  if (err) {
    console.log('Erro ao salvar o arquivo:' + err);
  } else {
    console.log('Arquivo criado com sucesso!');

    fs.appendFile('teste.txt', '\n teste append file.', function (err) {
      if (err) {
        console.log('Erro ao dar append.');
      } else {
        fs.readFile('teste.txt', 'utf-8', function (err, data) {
          if (err) {
            console.log('Erro ao ler o arquivo:' + err);
          } else {
            console.log('lido com sucesso:' + data);
          }
        });
      }
    });
  }
});
console.log('3');

//utilizando e forma sincrona(nao recomendada node js, pois trava e fica esperando)
try {
  console.log('Executando em async');
  console.log('1 async');
  fs.writeFileSync('teste.txt', 'bla bla bla async');
  console.log('2 async');
  const data = fs.readFileSync('teste.txt', 'utf-8');
  console.log('data' + data);
  console.log('3 async');
} catch (error) {
  console.log('Error:' + error);
}
*/
//importando com promisses
/*
console.log('USANDO PROMISSES');
import { promises as fs } from 'fs';

fs.writeFile('teste.txt', 'bla bla bla promisses')
  .then(() => {
    fs.appendFile('teste.txt', '\nappend file promisses')
      .then(() => {
        fs.readFile('teste.txt', 'utf-8')
          .then((resp) => {
            console.log(resp);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  })
  .catch((err) => {
    console.log(err);
  });
  */
import { promises as fs } from 'fs';

init();

async function init() {
  try {
    await fs.writeFile('teste.txt', 'bla bla bla promisses');
    await fs.appendFile('teste.txt', '\nappend file promisses');
    const data = await fs.readFile('teste.txt', 'utf-8');
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}
