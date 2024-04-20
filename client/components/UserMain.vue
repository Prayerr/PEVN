<template>
  <div>
    <h1>Your profile</h1>
    <h2>NAME: {{ user.username }}</h2>
    <h2>EMAIL: {{ user.email }}</h2>
    <button @click="logout">Logout</button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';
import axios from 'axios';

const user = ref({
  username: '',
  email: '',
});
const router = useRouter();

const fetchUserProfile = async () => {
  try {
    const response = await axios.get('/profile');
    user.value.username = response.data.username;
    user.value.email = response.data.email;
  } catch (error) {
    console.error('Ошибка при получении профиля:', error);
  }
};

const logout = async () => {
  try {
    await axios.post('/profile/logout');
    router.push('/login');
  } catch (error) {
    console.error('Ошибка при выходе:', error);
  }
};

onMounted(fetchUserProfile);
</script>

<style lang="scss">
@import '../src/styles/global.scss';
</style>
