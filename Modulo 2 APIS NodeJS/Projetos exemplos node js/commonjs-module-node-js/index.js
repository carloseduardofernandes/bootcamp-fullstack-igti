//*PROJETO EXEMPLO DE EXPORTAÇÃO USANDO COMMON JS REQUIRE*//

const op = require('./operacoes.js');
const multiplicacao = require('./operacoes2.js');

console.log('Soma: ' + op.soma(2, 3));
console.log('Subtração: ' + op.subtracao(5, 3));
console.log('Multiplicação: ' + multiplicacao(3, 4));
