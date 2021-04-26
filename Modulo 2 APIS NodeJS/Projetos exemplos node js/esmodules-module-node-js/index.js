//*PROJETO EXEMPLO DE EXPORTAÇÃO USANDO ES MODULES import*//

import op from './operacoes.js';
import mult from './operacoes2.js';
import { divisao, resto } from './exportacoesNomeadas.js';

console.log('Soma: ' + op.soma(2, 3));
console.log('Subtração: ' + op.subtracao(5, 3));
console.log('Multiplicação: ' + mult(3, 4));
console.log('Divisão: ' + divisao(10, 2));
console.log('Resto: ' + resto(7, 2));
