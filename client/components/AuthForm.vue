<template>
  <section class="auth">
    <header>
      <h1>Welcome back</h1>
      <h2>Enter your details to access your account</h2>
    </header>
    <form class="auth-form" @submit.prevent="login">
      <label class="auth-form__label" for="email-username">
        email / username
      </label>
      <input
        v-model="email"
        class="auth-form__input"
        type="text"
        id="email-username"
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

      <label for="remember-checkbox">
        <span>Remember me?</span>
        <input type="checkbox" id="remember-checkbox" />
      </label>
      <footer>
        <a href="forgot">Forgot password?</a>
        <router-link to="/register">Don't have your own account?</router-link>
      </footer>
      <button type="submit">Login</button>
    </form>
  </section>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import axios from 'axios';

const email = ref('');
const password = ref('');

const router = useRouter();

const login = async () => {
  try {
    const response = await axios.post('/profile/login', {
      email: email.value,
      password: password.value,
    });

    if (response.status === 200) {
      router.push('/profile');
    }
  } catch (error) {
    console.error('Ошибка при входе:', error);
  }
};
</script>

<style lang="scss">
@import '../src/styles/global.scss';
body {
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 700px;
}

.auth {
  border: 2px dashed $primary-color;
  padding: 20px;
  width: 645px;
}

.auth header {
  text-align: center;
  margin-bottom: 20px;
}

.auth header h1 {
  font-size: 48px;
}

.auth header h2 {
  font-size: 24px;
}

.auth-form {
  display: flex;
  flex-direction: column;
}

.auth-form__label {
  font-size: $form-font-size;
  color: $primary-color;
  margin-bottom: 10px;
}

.auth-form__input {
  border: 2px solid $primary-color;
  padding: 10px;
  font-size: $form-font-size;
  margin-bottom: 20px;
}

.auth footer {
  text-align: center;
}

.auth footer a {
  margin: 0 10px;
}
</style>
