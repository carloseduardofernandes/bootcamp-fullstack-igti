import React, { Component } from 'react';

import css from './countries.module.css';

export default class Country extends Component {
  render() {
    const country = this.props.country;
    const { name, flag } = country;

    return (
      <div className={`${css.border} ${css.country}`}>
        <img alt={name} className={css.flag} src={flag} />
        <span className={css.countryName}>{name}</span>
      </div>
    );
  }
}
