import { body } from 'express-validator';

export const userValidationRules = [
  body('name', 'Короткое имя').isLength({ min: 3 }),
  body('password', 'Короткий пароль').isLength({ min: 5 }),
  body('email', 'Неверный формат электронной почты').isEmail(),
];

export const postValidationRules = [];
