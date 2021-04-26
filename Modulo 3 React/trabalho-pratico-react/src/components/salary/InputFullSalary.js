import React, { Component } from 'react';

import css from './salary.module.css';

export default class InputFullSalary extends Component {
  handleInputChange = (event) => {
    const newFullSalary = +event.target.value;

    this.props.onChangeFullSalary(newFullSalary);
  };

  render() {
    const { fullSalary } = this.props;
    return (
      <div className={`input-field col s12`}>
        <span className={`${css.spanTextSize}`}>Salário bruto</span>
        <input
          id="inputSalarioBruto"
          autoFocus
          value={fullSalary}
          placeholder="Digite o salário bruto"
          type="number"
          min={1000}
          step={100}
          onChange={this.handleInputChange}
        />
      </div>
    );
  }
}
