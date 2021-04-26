import readline from 'readline';
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

pergunta();

function pergunta() {
  rl.question('Digite um N°:', (numero) => {
    console.log(numero);

    if (numero === 'x') {
      console.log('Clicou em fechar!');
      rl.close();
    } else {
      pergunta();
    }
  });
}
