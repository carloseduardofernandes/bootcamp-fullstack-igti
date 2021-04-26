import express from 'express';
import winston from 'winston';
import gradesRouter from './routes/grades.js';
import { promises as fs } from 'fs';
import cors from 'cors';

//destructuring
const { readFile, writeFile } = fs;

global.fileName = './data/grades.json';

const { combine, timestamp, label, printf } = winston.format;
const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

global.logger = winston.createLogger({
  level: 'silly',
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'grades-api.log' }),
  ],
  format: combine(label({ label: 'grades-api' }), timestamp(), myFormat),
});

const app = express();
app.use(express.json());
app.use(cors());
app.use('/grade', gradesRouter);

app.listen(3000, async () => {
  try {
    await readFile(global.fileName);
    logger.info('API Grades Started!');
  } catch (err) {
    const initialJson = {
      nextId: 1,
      grades: [],
    };
    writeFile(global.fileName, JSON.stringify(initialJson))
      .then(() => {
        logger.info('API Started and File Created!');
      })
      .catch((err) => {
        logger.error(err);
      });
  }
});
