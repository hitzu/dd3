import Express from 'express';
const api = Express.Router();
import {
  getWordMetrics,
  getUserMetrics,
  getTopUserMetrics
} from '../controllers/report.controller';
import { verifyToken } from '../middlewares/authenticator';
import { validateSchema } from '../middlewares/validate-input-schema';
import { getUserMetricsResponseSchema } from '../schemas/index';

api.get('/word', verifyToken(), getWordMetrics);

api.get(
  '/user',
  verifyToken(),
  validateSchema(getUserMetricsResponseSchema, 'query'),
  getUserMetrics
);

api.get('/top-user', verifyToken(), getTopUserMetrics);

export default api;
