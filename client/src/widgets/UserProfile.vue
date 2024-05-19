<template>
  <h1>Name: {{ user.name }}</h1>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import logger from '../../../express/utils/common/logger';

const user = ref();
const route = useRoute();
const { username } = route.params;

const getUser = async (username: string) => {
  try {
    const response = await axios.get(`/profile/${username}`);
    user.value = response.data.user;
  } catch (error) {
    logger.error('Ошибка при получении данных пользователя', error);
  }
};

onMounted(() => {
  getUser(username);
});
</script>

<style lang="scss">
@import '@/app/styles/main.scss';
</style>
