import express from 'express';
import { promises as fs } from 'fs';
import cors from 'cors';

const { readFile, writeFile } = fs;

const router = express.Router();

//1°
router.post('/', async (req, res, next) => {
  try {
    let grade = req.body;

    if (
      !grade.student ||
      !grade.subject ||
      !grade.type ||
      grade.value == null
    ) {
      throw new Error('Student, subject, type e value são obrigatórios.');
    }

    const data = JSON.parse(await readFile(global.fileName));

    grade = {
      id: data.nextId++,
      student: grade.student,
      subject: grade.subject,
      type: grade.type,
      value: grade.value,
      timestamp: new Date(),
    };

    data.grades.push(grade);

    await writeFile(global.fileName, JSON.stringify(data, null, 2));

    res.send(grade);

    logger.info(`POST /grade - ${JSON.stringify(grade)}`);
  } catch (err) {
    next(err);
  }
});

//2°
router.put('/', async (req, res, next) => {
  try {
    const grade = req.body;

    if (
      !grade.id ||
      !grade.student ||
      !grade.subject ||
      !grade.type ||
      grade.value == null
    ) {
      throw new Error('Id, student, subject, type e value são obrigatórios.');
    }

    const data = JSON.parse(await readFile(global.fileName));
    const index = data.grades.findIndex((a) => a.id == grade.id); //2== tanto string quando int

    if (index === -1) {
      throw new Error('Registro não encontrado:' + grade.id);
    }

    data.grades[index].student = grade.student;
    data.grades[index].subject = grade.subject;
    data.grades[index].type = grade.type;
    data.grades[index].value = grade.value;
    data.grades[index].timestamp = new Date();

    await writeFile(global.fileName, JSON.stringify(data, null, 2));

    res.send(grade);

    logger.info(`PUT /grade - ${JSON.stringify(grade)}`);
  } catch (err) {
    next(err);
  }
});

//3°
router.delete('/:id', async (req, res, next) => {
  try {
    let id = req.params.id;

    if (parseInt(id) == null) {
      throw new Error('Id ausente');
    }

    const data = JSON.parse(await readFile(global.fileName));
    data.grades = data.grades.filter((grade) => grade.id !== parseInt(id));
    await writeFile(global.fileName, JSON.stringify(data, null, 2));

    res.end();

    logger.info(`DELETE /grade/:id - ${id}`);
  } catch (err) {
    next(err);
  }
});

//4°
router.get('/:id', async (req, res, next) => {
  try {
    const data = JSON.parse(await readFile(global.fileName));
    const grade = data.grades.find(
      (grade) => grade.id == parseInt(req.params.id) //2== tanto string quando int
    );
    /*if (!grade) {
      throw new Error('Registro não encontrado!');
    }*/

    res.send(grade);
    logger.info('GET /grade/:id');
  } catch (err) {
    next(err);
  }
});

//5º 1° forma route params(http://localhost:3000/grade/getTotalGrade/teste/teste2)
//http://localhost:3000/grade/getTotalGrade/Loiane%20Groner/01%20-%20JavaScript
router.get('/getTotalGrade/:student/:subject', async (req, res, next) => {
  try {
    if (!req.params.student || !req.params.subject) {
      throw new Error('Student e subject são obrigatórios para a busca.');
    }
    const data = JSON.parse(await readFile(global.fileName));
    const grades = data.grades.filter((grade) => {
      return (
        grade.student === req.params.student &&
        grade.subject === req.params.subject
      );
    });

    let somaTotalGrades = grades.reduce((accumulator, element) => {
      return accumulator + element.value;
    }, 0);

    res.send(`Soma de notas total: ${somaTotalGrades}`);
    logger.info('GET getTotalGrade:student/:subject');
  } catch (err) {
    next(err);
  }
});

//5º 2° forma com query string(arrumar, pois chama o get id acima, passando
//getTotalGradeQueryString de parametro id, futuramente estudar como resolver)
router.get('/getTotalGradeQueryString', async (req, res, next) => {
  try {
    let params = req.query;

    if (!params.student || !params.subject) {
      throw new Error('Student e subject são obrigatórios para a busca.');
    }
    const data = JSON.parse(await readFile(global.fileName));
    const grades = data.grades.filter((grade) => {
      return (
        grade.student === params.student && grade.subject === params.subject
      );
    });

    let somaTotalGrades = grades.reduce((accumulator, element) => {
      return accumulator + element.value;
    }, 0);

    res.send(`Soma de notas total: ${somaTotalGrades}`);
    logger.info('GET getTotalGrade:student/:subject');
  } catch (err) {
    next(err);
  }
});

//5º 3° forma body params
//(arrumar, pois chama o get id acima, passando
//getTotalGradeQueryString de parametro id, futuramente estudar como resolver)
router.get('/getTotalGradeBodyParams', async (req, res, next) => {
  try {
    const params = req.body;

    if (!params.student || !params.subject) {
      throw new Error('Student e subject são obrigatórios para a busca.');
    }
    const data = JSON.parse(await readFile(global.fileName));
    const grades = data.grades.filter((grade) => {
      return (
        grade.student === params.student && grade.subject === params.subject
      );
    });

    let somaTotalGrades = grades.reduce((accumulator, element) => {
      return accumulator + element.value;
    }, 0);

    res.send(`Soma de notas total: ${somaTotalGrades}`);
    logger.info('GET getTotalGrade:student/:subject');
  } catch (err) {
    next(err);
  }
});

//6º route params(http://localhost:3000/grade/getMediaGrades/teste/teste2)
//http://localhost:3000/grade/getMediaGrades/01%20-%20JavaScript/F%C3%B3rum
router.get('/getMediaGrades/:subject/:type', async (req, res, next) => {
  try {
    if (!req.params.subject || !req.params.type) {
      throw new Error('subject e type são obrigatórios para a busca.');
    }
    const data = JSON.parse(await readFile(global.fileName));
    const grades = data.grades.filter((grade) => {
      return (
        grade.type === req.params.type && grade.subject === req.params.subject
      );
    });

    let somaTotalGrades = grades.reduce((prev, curr) => {
      return prev + curr.value;
    }, 0);

    res.send(`Média de notas: ${somaTotalGrades / grades.length}`);
    logger.info('GET /getMediaGrades/:subject/:type');
  } catch (err) {
    next(err);
  }
});

//7º route params(http://localhost:3000/grade/getTop3Grades/teste/teste2)
//http://localhost:3000/grade/getTop3Grades/01%20-%20JavaScript/Desafio
router.get('/getTop3Grades/:subject/:type', async (req, res, next) => {
  try {
    if (!req.params.subject || !req.params.type) {
      throw new Error('subject e type são obrigatórios para a busca.');
    }
    const data = JSON.parse(await readFile(global.fileName));
    const grades = data.grades.filter((grade) => {
      return (
        grade.type === req.params.type && grade.subject === req.params.subject
      );
    });

    let top3Grades = Array.from(grades)
      .sort((a, b) => {
        return parseFloat(b.value) - parseFloat(a.value);
      })
      .slice(0, 3);
    /*.map((grade) => {
        return {
          Student: grade.student,
          Subject: grade.subject,
          Type: grade.type,
          Value: grade.value,
        };
      });*/

    res.send(
      `Top 3 Maiores notas:</br></br> ${JSON.stringify(top3Grades, null, 2)}`
    );
    logger.info('GET /getTop3Grades/:subject/:type');
  } catch (err) {
    next(err);
  }
});

router.use((err, req, res, next) => {
  logger.error(`${req.method} ${req.baseUrl} - ${err.message}`);
  res.status(400).send({ error: err.message });
});

export default router;
