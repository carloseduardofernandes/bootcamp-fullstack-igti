import { promises as fs } from 'fs';

writeReadJson();

async function writeReadJson() {
  try {
    //Escrita com valores iniciais
    const arrayCarros = ['Gol', 'Palio', 'Uno'];
    const obj = {
      carros: arrayCarros,
    };
    await fs.writeFile('teste-json.json', JSON.stringify(obj));

    ///Fez a leitura do conteudo
    const data = JSON.parse(await fs.readFile('teste-json.json'));

    //Modificamos o conteudo
    data.carros.push('Sandero');

    //Sobrescrevemos o arquivo com conteudo
    await fs.writeFile('teste-json.json', JSON.stringify(data));
  } catch (error) {
    console.log(error);
  }
}
