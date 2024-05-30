import { defineStore } from 'pinia';
import type { TUserDirection } from '@/shared/lib/types/userTypes';

interface RegistrationState {
  step: number;

  accountInfo: {
    username: string;
    email: string;
    password: string;
    passwordConfirm: string;
  };

  aboutYou: {
    bio: string;
    birthday: string;
    direction: TUserDirection;
  };

  additionally: {
    avatarURL: string;
  };
}

export const useRegistrationStore = defineStore('registration', {
  state: (): RegistrationState => ({
    step: 0,

    accountInfo: {
      username: '',
      email: '',
      password: '',
      passwordConfirm: '',
    },

    aboutYou: {
      bio: '',
      birthday: '',
      direction: 'Other',
    },

    additionally: {
      avatarURL: '',
    },
  }),

  actions: {
    nextStep() {
      if (this.step < 3) {
        this.step++;
      }
    },

    setStep(step: number) {
      this.step = step;
    },
  },
});
