import React from 'react';
import css from './counter.module.css';

/* destructuring o porps no proprio parametro({ onDecrement }) */
export default function Steps({ currentStep }) {
  return <span className={css.counterValue}>({currentStep})</span>;
}
