import React, { useEffect, useState } from 'react';
import { getNewTimestamp } from './healpers/dateTimeHelpers';

export default function App() {
  const [clickArray, setClickArray] = useState([]);

  useEffect(() => {
    document.title = clickArray.length;
  });

  const handleclick = () => {
    const newClickArray = Object.assign([], clickArray);
    newClickArray.push(getNewTimestamp());

    setClickArray(newClickArray);
  };

  return (
    <div>
      <h1>
        React e <em>hooks</em>
      </h1>
      <button onClick={handleclick}>Clique Aqui</button>
      <ul>
        {clickArray.map((item) => {
          return <li key={item}>{item}</li>;
        })}
      </ul>
    </div>
  );
}
