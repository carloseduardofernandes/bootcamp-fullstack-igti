import React from 'react';

function App() {
  // const redState = React.useState('0');
  // const redValue = redState[0];
  // const setRedValue = redState[1];
  const [red, setRed] = React.useState('0');
  const [green, setGreen] = React.useState('100');
  const [blue, setBlue] = React.useState('255');

  return (
    <div className='container'>
      <h1>React cores</h1>

      <div>
        <label className='flex'>
          <span style={{ width: '100px' }}>Vermelho:</span>
          <input
            type='range'
            min='0'
            max='255'
            value={red}
            onChange={(event) => setRed(event.target.value)}
          />
        </label>
      </div>

      <div>
        <label className='flex'>
          <span style={{ width: '100px' }}>Verde:</span>
          <input
            type='range'
            min='0'
            max='255'
            value={green}
            onChange={(event) => setGreen(event.target.value)}
          />
        </label>
      </div>

      <div>
        <label className='flex'>
          <span style={{ width: '100px' }}>Azul:</span>
          <input
            type='range'
            min='0'
            max='255'
            value={blue}
            onChange={(event) => setBlue(event.target.value)}
          />
        </label>
      </div>

      <div
        className='square'
        style={{ backgroundColor: `rgb(${red}, ${green}, ${blue})` }}
      ></div>
    </div>
  );
}

export default App;
