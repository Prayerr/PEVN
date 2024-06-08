import { defineStore } from 'pinia';
import type { TUserDirection } from '@/shared/lib/types/userTypes';

interface RegistrationStore {
  step: number;

  accountInfo: {
    username: string;
    email: string;
    password: string;
    passwordConfirm: string;
  };

  aboutYou: {
    bio: string;
    birthday: Date;
    direction: TUserDirection;
  };

  additionally: {
    avatarURL: string;
  };
}

const useRegistrationStore = defineStore('registration', {
  state: (): RegistrationStore => ({
    step: 0,

    accountInfo: {
      username: '',
      email: '',
      password: '',
      passwordConfirm: '',
    },

    aboutYou: {
      bio: '',
      birthday: new Date(2000, 0, 1),
      direction: 'Other',
    },

    additionally: {
      avatarURL: '',
    },
  }),

  actions: {
    nextStep() {
      if (this.step < 2) {
        this.step += 1;
      }
    },

    setStep(step: number) {
      this.step = step;
    },

    setAccountInfo(data: Partial<RegistrationStore['accountInfo']>) {
      this.accountInfo = { ...this.accountInfo, ...data };
    },

    setAboutYou(data: Partial<RegistrationStore['aboutYou']>) {
      this.aboutYou = { ...this.aboutYou, ...data };
    },

    setAdditionally(data: Partial<RegistrationStore['additionally']>) {
      this.additionally = { ...this.additionally, ...data };
    },

    completeRegistration() {
      console.log('Конец регистрации ( dev)');
    },
  },
});

export default useRegistrationStore;
