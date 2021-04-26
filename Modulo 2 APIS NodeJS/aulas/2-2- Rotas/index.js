import express from 'express';

//cria instancia do express
const app = express();

//'avisa express que vamos usar json no body'
app.use(express.json());

//all
app.all('/testAll', (req, res) => {
  //retorna que metodo http foin invocado(get,post etc)
  res.send(req.method);
});

//caracteres especiais
app.get('/teste?', (_, res) => {
  //? torna opcional o parametro, rota sera acionada ao passar
  //ou não o parametro
  res.send('/teste?');
});

//caracter + faz com que aceite requisicao com qnts z quiser no exemplo
///buzzzzzzzzzz+  infinitos z(inutil)
app.get('/buzz+', (_, res) => {
  res.send('/buzz+');
});

//* caracter curinga, aceita qualquer palavra no lugar do *
app.get('/one*Blue', (req, res) => {
  let curinga = req.params;
  res.send(req.path);
});

//indica que a string entre parenteses, é tratada como unidade
app.post('/test(ing)?', (req, res) => {
  //podemos passar parametros via body no post
  console.log(req.body);
  res.send('/test(ing)?');
});

//regular expressions
//exem: tudo que finalizar com red ele vai esponder/
//exemplo: carRed, pencilRed
app.get(/.*Red$/, (req, res) => {
  res.send('/.*Red$/');
});

//parametros na rota
app.get('/testParam/:id/:a?', (req, res) => {
  res.send(req.params.id + ' ' + req.params.a);
});

//parametros via query
app.get('/testQuery', (req, res) => {
  res.send(req.query);
});

//next, chamando varias funcoes seguidas
app.get(
  '/testMultipleHandlers',
  (req, res, next) => {
    console.log('Callback 1');
    next();
  },
  (req, res) => {
    console.log('Callback 2');
    res.end();
  }
);

//next com array
const callback1 = (req, res, next) => {
  console.log('Callback 1');
  next();
};

function callback2(req, res, next) {
  console.log('Callback 2');
  //next();
  res.end();
}

const callback3 = (req, res) => {
  console.log('Callback 3');
  res.end();
};

//next, chamando varias funcoes seguidas passando no array
app.get('/testMultipleHandlersArray', [callback1, callback2, callback3]);

//route agrupa rotas e trata por tipos http
app
  .route('/testRoute')
  .get((req, res) => {
    res.send('/testRoute GET');
  })
  .post((req, res) => {
    res.send('/testRoute POST');
  })
  .delete((req, res) => {
    res.send('/testRoute DELETE');
  });

app.listen(3000, () => {
  console.log('API Started!');
});
