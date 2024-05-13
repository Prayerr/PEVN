<template>
  <AuthRedirectButtonVue />
  <section class="auth">
    <h1>login</h1>
    <form class="auth-form" @submit.prevent="login">
      <label class="auth-form__label" for="email">email</label>
      <input
        v-model="email"
        class="auth-form__input"
        type="text"
        id="email"
        required
      />

      <label class="auth-form__label" for="password">password</label>
      <input
        v-model="password"
        class="auth-form__input"
        type="password"
        id="password"
        required
      />

      <button class="auth-form__button" type="submit">login</button>
      <router-link to="/forgot" class="auth-form__link">
        forgot password?
      </router-link>
    </form>
  </section>

  <footer>
    <router-link to="/register" class="footer__link">no account?</router-link>
    <button class="footer__register">Register</button>
  </footer>

  <InputWithLabel
    label="email"
    v-model="email"
    inputType="text"
    input-id="email"
    labelClass="auth-form__label"
    required
  />

  <p v-if="authError" class="error-message">{{ authError }}</p>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import axios from 'axios';
import AuthRedirectButtonVue from './AuthRedirectButton.vue';

const email = ref('');
const password = ref('');
const authError = ref('');

const router = useRouter();

const login = async () => {
  try {
    const response = await axios.post('/profile/login', {
      email: email.value,
      password: password.value,
    });

    if (response.status === 200) {
      router.push(`/profile/${response.data.user.name}`);
    }
  } catch (error) {
    if (error.response.status === 404) {
      authError.value = 'Пользователь не найден';
    } else if (error.response.status === 401) {
      authError.value = 'Неправильный пароль или имя пользователя';
    } else {
      authError.value = 'Ошибка при входе';
    }
    console.error('Ошибка при входе:', error);
  }
};
</script>

<style lang="scss">
@import '../src/styles/global.scss';

body {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 700px;
  font-weight: 600;
}

.auth {
  background-color: $primary-color;
  color: $primary-color-text;
  border-radius: 15px;
  padding: 20px;
  width: 645px;

  h1 {
    margin: 0;
    margin-bottom: 10px;
    letter-spacing: 0.05em;
    font-size: 44px;
  }
}

.auth-form {
  display: flex;
  flex-direction: column;
}

.auth-form__button {
  @include button-style;
  margin: 0 auto;
  display: block;
  width: 260px;
  height: 75px;
}

.auth-form__link {
  text-decoration: none;
  cursor: pointer;
  color: inherit;
  font-size: 32px;
  margin-top: 20px;
  text-align: center;
}

.error-message {
  text-align: center;
  font-size: 32px;
  color: #ff0000;
}

.auth-form__label {
  font-size: $form-font-size;
}

.auth-form__input {
  @include input-style;
}

footer {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  border-radius: 15px;
  background-color: $primary-color;

  .footer__link {
    color: $primary-color-text;
    text-decoration: none;
    cursor: pointer;
    font-size: 32px;
  }

  .footer__register {
    border: 5px solid #ffffff;
    font-size: 32px;
    color: $primary-color-text;
    background-color: $primary-color;
    border-radius: 20px;
    width: 230px;
    height: 60px;
  }
}
</style>
