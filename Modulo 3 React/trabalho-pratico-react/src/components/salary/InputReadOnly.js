import React, { Component } from 'react';
import { formatNumber, formatCurrency } from './../../helpers/formatHelpers';

import css from './salary.module.css';

export default class InputReadOnly extends Component {
  handleFormatFieldValue = (valueInput, fullSalary) => {
    const percent = fullSalary
      ? `(${formatNumber(this.calculatePercent(fullSalary, valueInput))}%)`
      : '';
    return `${formatCurrency(valueInput)} ${percent}`;
  };

  calculatePercent = (fullSalary, value) => {
    return (value * 100) / fullSalary;
  };

  render() {
    const { description, valueInput, style, fullSalary } = this.props;
    return (
      <div className={`${css.flexCollumn} input-field col s12 m6 l3`}>
        <span className={css.spanTextSize}>{description}</span>
        <input
          id={`inputReadOnly_${description}`}
          style={style}
          readOnly={true}
          value={this.handleFormatFieldValue(valueInput, fullSalary)}
          type="text"
        />
      </div>
    );
  }
}
