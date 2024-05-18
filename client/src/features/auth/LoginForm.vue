<template>
  <section class="auth">
    <h1>login</h1>
    <form class="auth-form" @submit.prevent="loginUser">
      <label class="auth-form__label" for="email">email</label>
      <input
        v-model="user.email"
        class="auth-form__input"
        type="text"
        id="email"
        required
      />

      <label class="auth-form__label" for="password">password</label>
      <input
        v-model="user.password"
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
    <router-link to="/register" class="footer__link">Registration</router-link>
  </footer>

  <ErrorMessage :errorMessage="authError" />
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import httpClient from '@/shared/api';

const user = ref({
  email: '',
  password: '',
});

const authError = ref('');

const router = useRouter();

const loginUser = async () => {
  try {
    const response = await httpClient.post('/profile/login', {
      email: user.value.email,
      password: user.value.password,
    });

    if (response.status === 200) {
      router.push(`/profile/${response.data.user.name}`);
    }
  } catch (error: any) {
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

<style scoped lang="scss">
@import '@/app/styles/main.scss';

.auth {
  background-color: $primary-color;
  color: $typography-light-color;
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
  text-align: center;
  font-size: 48px;
  width: 260px;
  height: 75px;

  &:hover {
    @include button-animation-hover;
  }
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
  justify-content: center;
  align-items: center;
  padding: 15px;
  border-radius: 15px;
  background-color: $primary-color;

  .footer__link {
    @include button-style;
    text-align: center;
    text-decoration: none;
    font-size: 32px;
    width: 230px;
    height: 60px;
  }
}
</style>
