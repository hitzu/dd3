import { Joi } from '../services/validation';

export const getCardResquestSchema = Joi.object().keys({
  word: Joi.string()
    .required()
    .min(5)
    .max(5)
});

export const getCardResponseSchema = Joi.object().keys({});
