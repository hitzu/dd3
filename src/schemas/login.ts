import { Joi } from '../services/validation';

export const loginResquestSchema = Joi.object().keys({
  email: Joi.string().required(),
  password: Joi.string().optional()
});

export const loginResponseSchema = Joi.object().keys({
  token: Joi.string().required()
});
