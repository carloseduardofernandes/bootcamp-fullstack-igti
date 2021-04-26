import React from 'react';

/* destructuring o porps no proprio parametro({ onDecrement }) */
export default function DecrementButton({ onDecrement }) {
  const handleButtonClick = () => {
    onDecrement('-');
  };
  return (
    <button
      onClick={handleButtonClick}
      className="waves-effect waves-light btn red darken-4"
    >
      -
    </button>
  );
}
