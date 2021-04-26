import React, { Component } from 'react';
import InputFullSalary from './components/salary/InputFullSalary';
import InputReadOnly from './components/salary/InputReadOnly';
import ProportionBarSalary from './components/salary/ProportionBarSalary';

import css from './components/salary/salary.module.css';
import { calculateSalaryFrom } from './helpers/salary';

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      fullSalary: 1000,
    };
  }

  calculatePercent = (fullSalary, value) => {
    return ((value * 100) / fullSalary).toFixed(2);
  };

  handleChangeFullSalary = (newFullSalary) => {
    this.setState({
      fullSalary: newFullSalary,
    });
  };

  render() {
    const { fullSalary } = this.state;
    const {
      baseINSS,
      discountINSS,
      baseIRPF,
      discountIRPF,
      netSalary,
    } = calculateSalaryFrom(fullSalary);

    const percentINSS = this.calculatePercent(fullSalary, discountINSS);
    const percentIRPF = this.calculatePercent(fullSalary, discountIRPF);
    const percentNetSalary = this.calculatePercent(fullSalary, netSalary);

    return (
      <div className="container">
        <h1 style={styles.centeredTitle}>React Salário</h1>

        <div className="row">
          <InputFullSalary
            fullSalary={fullSalary}
            onChangeFullSalary={this.handleChangeFullSalary}
          />
        </div>
        <div className={css.flexRow}>
          <div className="row">
            <InputReadOnly
              style={styles.inputTextBold}
              description="Base INSS"
              valueInput={baseINSS}
            />
          </div>
          <div className="row">
            <InputReadOnly
              style={styles.inputDescontoInss}
              description="Desconto INSS"
              valueInput={discountINSS}
              fullSalary={fullSalary}
            />
          </div>
          <div className="row">
            <InputReadOnly
              style={styles.inputTextBold}
              description="Base IRPF"
              valueInput={baseIRPF}
            />
          </div>
          <div className="row">
            <InputReadOnly
              style={styles.inputDescontoIrpf}
              description="Desconto IRPF"
              valueInput={discountIRPF}
              fullSalary={fullSalary}
            />
          </div>
          <div className="row">
            <InputReadOnly
              style={styles.inputDescontoSalarioLiquido}
              description="Salário liquido"
              valueInput={netSalary}
              fullSalary={fullSalary}
            />
          </div>
        </div>
        <ProportionBarSalary
          inss={percentINSS}
          irpf={percentIRPF}
          netSalary={percentNetSalary}
          colorINSS="orange"
          colorIRPF="red"
          colorNetSalary="green"
        />
      </div>
    );
  }
}

const styles = {
  centeredTitle: {
    textAlign: 'center',
  },
  inputTextBold: {
    fontWeight: 'bold',
  },
  inputDescontoInss: {
    color: '#e67e22',
    fontWeight: 'bold',
  },
  inputDescontoIrpf: {
    color: '#c0392b',
    fontWeight: 'bold',
  },
  inputDescontoSalarioLiquido: {
    color: '#16a085',
    fontWeight: 'bold',
  },
};
