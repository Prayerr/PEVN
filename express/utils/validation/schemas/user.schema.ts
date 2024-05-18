import { JSONSchemaType } from 'ajv';
import { IUserDTO } from '../../../interfaces/user.interface';

// JSON схема для пользователя
export const userSchema: JSONSchemaType<IUserDTO> = {
  type: 'object',

  properties: {
    name: { type: 'string', minLength: 3, maxLength: 16 },
    email: { type: 'string', format: 'email', maxLength: 64 },
    password: { type: 'string', minLength: 6, maxLength: 32 },
    bio: { type: 'string', maxLength: 255, nullable: true },
    avatarURL: {
      type: 'string',
      maxLength: 255,
      nullable: true,
    },
    userId: { type: 'string', nullable: true },
    registrationDate: { type: 'string', format: 'date-time', nullable: true },
  },

  required: ['name', 'email', 'password'],
};
