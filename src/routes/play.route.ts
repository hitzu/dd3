import Express from 'express';
import { getWord } from '../controllers/play.controller';
const api = Express.Router();
import { validateSchema } from '../middlewares/validate-input-schema';
import { verifyToken } from '../middlewares/authenticator';
import { getCardResquestSchema } from '../schemas/index';

api.get(
  '/word',
  verifyToken(),
  validateSchema(getCardResquestSchema, 'query'),
  getWord
);

export default api;
