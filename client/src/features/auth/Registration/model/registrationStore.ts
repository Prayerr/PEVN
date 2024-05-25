import { defineStore } from 'pinia';
import { TUserDirection } from '@/shared/lib/types/userTypes';

interface RegistrationState {
  step: number;

  accountInfo: {
    username: string;
    email: string;
    password: string;
    passwordConfirm: string;

    aboutYou: {
      bio: string;
      birthday: string;
      direction: TUserDirection;
    };

    additionally: {
      avatarURL: string;
    };
  };
}

export const useRegistrationStore = defineStore('registration');
