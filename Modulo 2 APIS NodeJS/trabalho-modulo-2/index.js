import { promises as fs } from 'fs';

/*1. Criar uma função que irá criar um arquivo JSON para cada estado representado no
arquivo Estados.json, e o seu conteúdo será um array das cidades pertencentes a
aquele estado, de acordo com o arquivo Cidades.json. O nome do arquivo deve ser
o UF do estado, por exemplo: MG.json.*/

async function createJsonCidadesByUf() {
  let cidades = JSON.parse(await fs.readFile('./jsons/Cidades.json', 'utf-8'));
  let estados = JSON.parse(await fs.readFile('./jsons/Estados.json', 'utf-8'));

  estados.forEach((estado) => {
    let cidadesUfAtual = Array.from(cidades).filter(
      (cidade) => cidade.Estado === estado.ID
    );

    fs.writeFile(
      './jsons/cidadesByUF/' + estado.Sigla + '.json',
      JSON.stringify(cidadesUfAtual)
    );
  });
}

/*2. Criar uma função que recebe como parâmetro o UF do estado, realize a leitura do
arquivo JSON correspondente e retorne a quantidade de cidades daquele estado.*/

async function qtdCidadesByUf(uf) {
  return Array.from(
    JSON.parse(
      await fs.readFile('./jsons/cidadesByUF/' + uf + '.json', 'utf-8')
    )
  ).length;
}

/*3 - 4 Criar um método que imprima no console um array com o UF 
dos cinco estados que mais/menor possuem cidades, seguidos
da quantidade, em ordem decrescente. Você pode usar a função criada no tópico 2. 
Exemplo de impressão: [“UF - 93”, “UF - 82”, “UF - 74”, “UF - 72”, “UF - 65”]
*/

async function cidadesUf(order) {
  let arrayEstadosCidades = [];
  let estados = JSON.parse(await fs.readFile('./jsons/Estados.json', 'utf-8'));

  for (const estado of estados) {
    let qtd = await qtdCidadesByUf(estado.Sigla);
    const data = { Uf: estado.Sigla, QtdCidades: qtd };
    arrayEstadosCidades.push(data);
  }

  if (order === 'desc') {
    arrayEstadosCidades = arrayEstadosCidades
      .sort(function (a, b) {
        return ('' + a.Nome).localeCompare(b.Nome);
      })
      .sort(function (a, b) {
        return parseInt(b.QtdCidades) - parseInt(a.QtdCidades);
      });
  } else if (order === 'asc') {
    arrayEstadosCidades = arrayEstadosCidades
      .sort(function (a, b) {
        return ('' + a.Nome).localeCompare(b.Nome);
      })
      .sort(function (a, b) {
        return parseInt(a.QtdCidades) - parseInt(b.QtdCidades);
      });
  }

  arrayEstadosCidades = arrayEstadosCidades
    .slice(0, 5)
    .sort(function (a, b) {
      return b.QtdCidades - a.QtdCidades;
    })
    .map((r) => {
      return `${r.Uf} - ${r.QtdCidades} `;
    });

  return arrayEstadosCidades;
}

/*5 - 6. Criar um método que imprima no console um array com a cidade de maior/menor nome de
cada estado, seguida de seu UF. Por exemplo: [“Nome da Cidade – UF”, “Nome da
Cidade – UF”, ...].*/

async function cidadesMaiorMenorNomesUf(param) {
  let arrayEstadosCidades = [];
  let cidades = JSON.parse(await fs.readFile('./jsons/Cidades.json', 'utf-8'));
  let estados = JSON.parse(await fs.readFile('./jsons/Estados.json', 'utf-8'));

  for (const estado of estados) {
    let cidadesUf = cidades.filter((cidade) => {
      return cidade.Estado === estado.ID;
    });

    if (param === 'maior') {
      cidadesUf = cidadesUf
        .sort(function (a, b) {
          return ('' + a.Nome).localeCompare(b.Nome);
        })
        .sort(function (a, b) {
          return parseInt(b.Nome.length) - parseInt(a.Nome.length);
        });
    } else if (param === 'menor') {
      cidadesUf = cidadesUf
        .sort(function (a, b) {
          return ('' + a.Nome).localeCompare(b.Nome);
        })
        .sort(function (a, b) {
          return parseInt(a.Nome.length) - parseInt(b.Nome.length);
        });
    }

    let nomeCidade = cidadesUf.slice(0, 1).map((r) => {
      return r.Nome;
    });

    const data = {
      NomeCidade: nomeCidade,
      Uf: estado.Sigla,
      TamanhoNome: String(nomeCidade).length,
    };

    arrayEstadosCidades.push(data);
  }

  arrayEstadosCidades = arrayEstadosCidades.map((r) => {
    return `${r.NomeCidade} - ${r.Uf} - Tamanho Nome: ${r.TamanhoNome} `;
  });

  return arrayEstadosCidades.slice(0, 5);
}

/*7 - 8. Criar um método que imprima no console a cidade de maior/menor
 nome entre todos os estados, seguido do seu UF. Exemplo: “Nome da Cidade - UF".*/

async function cidadesMaiorMenorNomesGeral(param) {
  let cidades = JSON.parse(await fs.readFile('./jsons/Cidades.json', 'utf-8'));
  let estados = JSON.parse(await fs.readFile('./jsons/Estados.json', 'utf-8'));

  let cidade = {};

  if (param === 'maior') {
    cidade = cidades
      .sort(function (a, b) {
        return ('' + a.Nome).localeCompare(b.Nome);
      })
      .sort(function (a, b) {
        return parseInt(b.Nome.length) - parseInt(a.Nome.length);
      })
      .slice(0, 1)
      .map((r) => {
        return { Nome: r.Nome, Estado: r.Estado };
      })[0];
  } else if (param === 'menor') {
    cidade = cidades
      .sort(function (a, b) {
        return ('' + a.Nome).localeCompare(b.Nome);
      })
      .sort(function (a, b) {
        return parseInt(a.Nome.length) - parseInt(b.Nome.length);
      })
      .slice(0, 1)
      .map((r) => {
        return { Nome: r.Nome, Estado: r.Estado };
      })[0];
  }

  let uf = estados.filter((f) => {
    return f.ID === cidade.Estado;
  })[0];

  return `${cidade.Nome} - ${uf.Sigla} - Tamanho Nome: ${
    String(cidade.Nome).length
  } `;
}

//1
//console.log('QUESTÃO 1');
//createJsonCidadesByUf();
//2-
/*console.log('QUESTÃO 2');
qtdCidadesByUf('SP').then((r) => {
  console.log(`Qtd cidades UF: 'SP' é : ${r}`);
});*/

//3-
/*console.log('QUESTÃO 3');
cidadesUf('desc').then((r) => {
  console.log('UFs com mais cidades: ' + JSON.stringify(r));
});*/

//4-
/*console.log('QUESTÃO 4');
cidadesUf('asc').then((r) => {
  console.log('UFs com menos cidades: ' + JSON.stringify(r));
});*/

//5-
/*console.log('QUESTÃO 5');
cidadesMaiorMenorNomesUf('maior').then((r) => {
  console.log('UFs com maiores nomes de cidades: ' + JSON.stringify(r));
});*/

//6-
/*console.log('QUESTÃO 6');
cidadesMaiorMenorNomesUf('menor').then((r) => {
  console.log('UFs com menores nomes de cidades: ' + JSON.stringify(r));
});//

//7-
/*console.log('QUESTÃO 7');
cidadesMaiorMenorNomesGeral('maior').then((r) => {
  console.log('UF com maior nome de cidade: ' + JSON.stringify(r));
});*/

//8
/*console.log('QUESTÃO 8');
cidadesMaiorMenorNomesGeral('menor').then((r) => {
  console.log('UF com menor nome de cidade: ' + JSON.stringify(r));
});*/
