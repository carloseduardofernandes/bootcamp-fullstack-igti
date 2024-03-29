import React, { Component } from 'react';

import css from './counter.module.css';
import DecrementButton from './DecrementButton';
import IncrementButton from './IncrementButton';
import Steps from './Steps';
import Value from './Value';

export default class Counter extends Component {
  constructor() {
    super();

    /* INICIALIZA STATE */
    this.state = {
      currentCounter: 2,
      steps: 0,
    };
  }

  handleButtonClick = (clickType) => {
    const { currentCounter, steps } = this.state;

    /* NÃO PODE SETAR STATE DIRETO, USAR SETSTATE */
    this.setState(
      {
        currentCounter:
          clickType === '+' ? currentCounter + 1 : currentCounter - 1,
        steps: steps + 1,
      },
      () => {
        //console.log('EXECUTOU O SETSTATE +');
      }
    );

    /* SE PRECISAR EXECUTAR ALGO, SOMENTE APOS O  setState, 
    USAR FUNCAO CALLBACK DO setState, EXEMPLO ACIMA */
  };

  render() {
    const { currentCounter, steps } = this.state;
    return (
      <div className={css.counterContainer}>
        <DecrementButton onDecrement={this.handleButtonClick} />
        <Value value={currentCounter} />
        <IncrementButton onIncrement={this.handleButtonClick} />
        <Steps currentStep={steps} />
        {/* Tagg img precisa obrigatoriamente fechar <img src="./img/teste.png" />
        Class css usa-se className
        <h2 className="minha-classe">Exemplo de JSX</h2> */}
      </div>
    );
  }
}
