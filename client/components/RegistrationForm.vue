<template>
  <section class="registration">
    <header>
      <h1 class="registration__title">Register</h1>
    </header>
    <form class="registration-form" @submit.prevent="submitForm">
      <label class="registration-form__label" for="username">username</label>
      <input
        v-model="user.name"
        class="registration-form__input"
        type="text"
        id="username"
        required
      />

      <label class="registration-form__label" for="email">email</label>
      <input
        v-model="user.email"
        class="registration-form__input"
        type="email"
        id="email"
        required
      />

      <label class="registration-form__label" for="password">password</label>
      <input
        v-model="user.password"
        @input="checkPasswordMatch"
        class="registration-form__input"
        type="password"
        id="password"
        required
      />

      <label class="registration-form__label" for="password-confirm">
        password confirm
      </label>
      <input
        v-model="user.confirmPassword"
        @input="checkPasswordMatch"
        class="registration-form__input"
        type="password"
        id="password-confirm"
        required
      />

      <button type="submit" class="registration-form__button">confirm</button>

      <p v-if="passwordsDoNotMatch" class="registration-form__error">
        Пароли не совпадают
      </p>

      <p v-if="registrationError" class="registration-form__error">
        {{ registrationError }}
      </p>
    </form>
  </section>

  <footer>
    <label for="terms-checkbox" class="registration-form__checkbox-label">
      I agree with the
      <span class="registration-form__terms-link">
        <a href="link">terms</a>
      </span>
      of use of the service
    </label>
    <input type="checkbox" id="terms-checkbox" required />
  </footer>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import axios from 'axios';

const user = ref({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
});

const registrationError = ref('');
const passwordsDoNotMatch = ref(false);
const router = useRouter();

const checkPasswordMatch = () => {
  passwordsDoNotMatch.value =
    user.value.password !== user.value.confirmPassword;
};

const submitForm = async () => {
  try {
    if (user.value.password !== user.value.confirmPassword) {
      passwordsDoNotMatch.value = true;
      return;
    }

    passwordsDoNotMatch.value = false;

    const response = await axios.post('/profile/register', {
      name: user.value.name,
      email: user.value.email,
      password: user.value.password,
      confirmPassword: user.value.confirmPassword,
    });

    if (response.status === 200) {
      router.push(`/profile/${user.value.name}`);
    }

    console.log(response.data.message);
  } catch (error) {
    if (error.response.status === 409) {
      registrationError.value = error.response.data.error;
    } else {
      console.error('Ошибка при регистрации:', error);
    }
  }
};
</script>

<style lang="scss">
@import '../src/styles/global.scss';

.registration {
  background-color: $primary-color;
  color: $primary-color-text;
  max-width: 725px;
  height: 600px;
  border-radius: 15px;
  padding: 20px;

  h1 {
    margin: 0;
    margin-bottom: 10px;
    letter-spacing: 0.05em;
    font-size: 44px;
  }
}

.registration-form {
  display: flex;
  flex-direction: column;
  height: 100%;

  .registration-form__label {
    font-size: $form-font-size;
  }

  .registration-form__input {
    @include input-style;
    box-sizing: border-box;
    width: 100%;
  }

  .registration-form__button {
    @include button-style;
    width: 50%;
    height: 85px;
    align-self: flex-start;
  }
}

footer {
  margin-top: 10px;
  padding: 15px;
  border-radius: 15px;
  background-color: $primary-color;

  .registration-form__checkbox-label {
    color: $primary-color-text;
    font-size: 28px;
  }

  a {
    font-size: 28px;
    color: $primary-color-text;
    text-decoration: none;
    cursor: pointer;
  }
}
</style>
