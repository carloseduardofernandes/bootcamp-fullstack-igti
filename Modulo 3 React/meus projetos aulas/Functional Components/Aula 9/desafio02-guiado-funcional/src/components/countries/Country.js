import React from 'react';

import css from './countries.module.css';

export default function Country({ country }) {
  const { name, flag } = country;

  return (
    <div className={`${css.border} ${css.country}`}>
      <img alt={name} className={css.flag} src={flag} />
      <span className={css.countryName}>{name}</span>
    </div>
  );
}
