import { Joi } from '../services/validation';

export const getUserMetricsResponseSchema = Joi.object().keys({
  userId: Joi.number().required()
});
