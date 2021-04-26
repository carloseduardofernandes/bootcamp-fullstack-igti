import ev from './events.js';

ev.on('testEvent', (obj) => {
  console.log('OUVIU TB ' + obj);
});

ev.emit('testEvent', 'DADOS PASSAR');
