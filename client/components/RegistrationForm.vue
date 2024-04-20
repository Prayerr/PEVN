/* TODO: ДОДЕЛАТЬ ВЕЗДЕ ОБРАБОТКУ ОШИБОК (ну то есть вывод ошибок на фронте),
ПОФИКСИТЬ КОД */
<template>
  <section class="registration">
    <header>
      <h1 class="registration__title">Register</h1>
      <h2 class="registration__subtitle">
        Want to become part of the community? Fill in the details
      </h2>
    </header>
    <form class="registration-form" @submit.prevent="submitForm">
      <label class="registration-form__label" for="name">name</label>
      <input
        v-model="user.name"
        class="registration-form__input"
        type="text"
        id="name"
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

      <label class="registration-form__label" for="confirm-password">
        confirm password
      </label>
      <input
        v-model="user.confirmPassword"
        @input="checkPasswordMatch"
        class="registration-form__input"
        type="password"
        id="confirm-password"
        required
      />

      <p v-if="passwordsDoNotMatch" class="error-message">
        Пароли не совпадают
      </p>
      <p v-if="registrationError" class="error-message">
        {{ registrationError }}
      </p>

      <input type="checkbox" id="terms-checkbox" required />
      <label for="terms-checkbox" class="registration-form__checkbox-label">
        I agree with the
        <span class="registration-form__terms-link">
          <a href="link">terms</a>
        </span>
        of use of the service
      </label>

      <button type="submit" class="registration-form__button">done</button>

      <footer>
        <router-link to="/auth">I already have an account</router-link>
      </footer>
    </form>
  </section>
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
      router.push('/profile');
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
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  border: 5px $primary-color dotted;
}

.registration-form__terms-link {
  font-weight: bold;
  a {
    text-decoration: none;
  }
}

.error-message {
  color: red;
}

.registration-form__label,
.registration-form__checkbox-label {
  color: $primary-color;
  font-size: $form-font-size;
}

.registration-form__button {
  color: $primary-color;
}

.registration-form__input {
  border: 3px solid $primary-color;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
  width: 100%;
}

.registration-form__button {
  border: 3px solid $primary-color;
  border-radius: 5px;
  width: 100px;
  height: 276px;
}
</style>
