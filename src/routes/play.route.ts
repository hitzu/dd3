import Express from 'express';
import { getWord, swWordFunction } from '../controllers/play.controller';
const api = Express.Router();
import { validateSchema } from '../middlewares/validate-input-schema';
import { verifyToken } from '../middlewares/authenticator';
import { getCardResquestSchema } from '../schemas/index';

export const swPlayRouter = {
  '/play/word': {
    get: {
      ...swWordFunction
    }
  }
};

api.get(
  '/word',
  verifyToken(),
  validateSchema(getCardResquestSchema, 'query'),
  getWord
);

export default api;
