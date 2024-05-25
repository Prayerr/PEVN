<template>
  <VInput
    v-model="username"
    label="username"
    name="username"
    inputType="text"
    :error="error"
    @blur="validateInput"
  />
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import VInput from '../Main/VInput.vue';
import inputUsernameValidate from '@/shared/lib/utils/validation/usernameValidation';

const username = ref<string>('');
const error = ref<string>('');

// Валидация
const validateInput = () => {
  error.value = inputUsernameValidate(username.value);
};

watch(username, (newValue) => {
  error.value = inputUsernameValidate(newValue);
});
</script>

<style lang="scss"></style>
