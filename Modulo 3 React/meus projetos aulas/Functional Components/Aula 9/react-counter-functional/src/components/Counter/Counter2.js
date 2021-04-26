import React from 'react';

import DecrementButton from './DecrementButton';
import IncrementButton from './IncrementButton';
import Steps from './Steps';
import Value from './Value';

import css from './counter.module.css';

export default function Counter2(props) {
  const { countValue, currentStep, onCount } = props;

  const handleButtonClick = (clickType) => {
    onCount(clickType);
  };

  return (
    <div className={css.counterContainer}>
      <DecrementButton onDecrement={handleButtonClick} />
      <Value value={countValue} />
      <IncrementButton onIncrement={handleButtonClick} />
      <Steps currentStep={currentStep} />
    </div>
  );
}
