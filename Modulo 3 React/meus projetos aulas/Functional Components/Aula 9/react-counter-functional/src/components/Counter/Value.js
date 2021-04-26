import React from 'react';
import css from './counter.module.css';

/* destructuring o porps no proprio parametro({ onDecrement }) */
export default function Value({ value }) {
  return <span className={css.counterValue}>{value}</span>;
}
