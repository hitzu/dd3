import { Response } from 'express';
import { RequestCustom } from '../interfaces/start-options.interface';
import { generate } from '../services/token';
import { playCommands } from '../orm/commands/play';
import { reportCommands } from '../orm/commands/report';
import { GeneralError } from '../classes/general-error';
import { IPoints, IPointsValues } from '../interfaces/play.interface';

const getWord = async (req: RequestCustom, res: Response) => {
  try {
    const { word } = req.query;

    let currentWord = await playCommands.getCurrentWord();

    if (!currentWord) {
      currentWord = await playCommands.getRandomWord();
      if (currentWord) {
        await playCommands.updateWord(currentWord.id);
      } else {
        const customError = new GeneralError(
          new Error('no hay mas palabras'),
          'Error',
          400
        );
        throw customError;
      }
    }
    const wordS = currentWord.description;
    const wordU = word.toString();

    const params = { wordId: currentWord.id, userId: req.token.user_id };
    let report = await reportCommands.getOne(params);
    if (report) {
      report.opportunity = report.opportunity + 1;
      await reportCommands.update(report);
    } else {
      const paramsToInsert = { ...params, opportunity: 1 };
      report = await reportCommands.insert(paramsToInsert);
    }
    if (report.win) {
      const customError = new GeneralError(
        new Error('word completed'),
        'word completed',
        400
      );
      throw customError;
    } else if (report.opportunity <= 5) {
      const arrayCharacter = wordU.split('');
      const results: IPointsValues[] = arrayCharacter.map(char => {
        const responseTemplate: IPointsValues = {
          letter: char,
          value: null
        };

        const index = wordS.split('').reduce(function(a, e, i) {
          if (e === char) a.push(i);
          return a;
        }, []);

        if (!wordS.includes(char)) {
          responseTemplate.value = IPoints.NOINWORD;
        } else if (index.includes(wordU.indexOf(char))) {
          responseTemplate.value = IPoints.SAMEPLACE;
        } else {
          responseTemplate.value = IPoints.INWORD;
        }
        return responseTemplate;
      });

      if (results.every(result => result.value == 1)) {
        report.win = true;
        await reportCommands.update(report);
      }

      res.status(200).send({
        wordS,
        results
      });
    } else {
      const customError = new GeneralError(
        new Error('max number attends'),
        'max number attends',
        400
      );
      throw customError;
    }
  } catch (error) {
    res.status(error.code).send(error);
  }
};

export { getWord };
