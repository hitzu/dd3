import { Request, Response } from 'express';
import { generate } from '../services/token';
import { loginResponseSchema } from '../schemas';
import { validate } from '../services/validation';
import { userCommands } from '../orm/commands/user';
import { GeneralError } from '../classes/general-error';
import { User } from '../orm/entities/User';

export const swLogInFunction = {
  summary: 'nos permite logearnos en la app',
  tags: ['auth'],
  responses: {
    '200': {
      description: 'objeto con la informacion basica del usuario y el token'
    }
  },
  parameters: [
    {
      in: 'body',
      name: 'email',
      require: true
    },
    {
      in: 'body',
      name: 'password',
      require: true
    }
  ]
};

const logIn = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const userFound = await userCommands.getUserByEmail(email);

    if (!userFound.checkIfPasswordMatch(password)) {
      const customError = new GeneralError(
        new Error('incorrect password'),
        'incorrect password',
        401
      );
      throw customError;
    }

    const token = await generate(
      userFound.id,
      userFound.email,
      userFound.username
    );

    res.status(200).send({
      token,
      user: {
        id: userFound.id,
        email: userFound.email,
        username: userFound.username
      }
    });
  } catch (error) {
    console.log('error', error);
    res.status(500).send({ error: error.message });
  }
};

export { logIn };
