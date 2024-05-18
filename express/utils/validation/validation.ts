import { userSchema } from './schemas';
import { IUserDTO } from '../../interfaces/user.interface';
import localize from 'ajv-i18n';
import addFormats from 'ajv-formats';
import Ajv, { ErrorObject } from 'ajv';

const ajv = new Ajv();
addFormats(ajv);

// Компиляция JSON схемы
const compiledUserSchema = ajv.compile(userSchema);

// Префиксы для ошибок валидации
const errorMessagesMap: Map<string, string> = new Map([
  ['/name', 'Имя пользователя '],
  ['/email', 'Email '],
  ['/password', 'Пароль '],
  ['/avatar_url', 'URL аватара '],
  ['/bio', 'Поле о себе '],
]);

// Валидация пользователя
export function validateUserSchema(data: IUserDTO) {
  const isValid = compiledUserSchema(data);

  if (!isValid) {
    localize.ru(compiledUserSchema.errors);

    const errors = compiledUserSchema.errors?.map((error: ErrorObject) => {
      const errorMessagePrefix = errorMessagesMap.get(error.instancePath) || '';
      error.message = errorMessagePrefix + error.message;
      return error.message;
    });

    throw new Error(errors?.join(', ') || 'Ошибка валидации');
  }
}
