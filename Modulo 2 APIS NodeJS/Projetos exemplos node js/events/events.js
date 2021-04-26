import { EventEmitter } from 'events';

const eventEmmiter = new EventEmitter();

eventEmmiter.on('testEvent', (obj) => {
  console.log('obj=' + obj);
});

export default eventEmmiter;
