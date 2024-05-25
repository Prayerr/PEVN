<template>
  <VInput
    v-model="email"
    label="email"
    name="email"
    inputType="email"
    required
    :error="error"
    @blur="validateInput"
  />
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import VInput from '../Main/VInput.vue';
import inputEmailValidate from '@/shared/lib/utils/validation/emailValidation';

const email = ref<string>('');
const error = ref<string>('');

// Валидация
const validateInput = () => {
  error.value = inputEmailValidate(email.value);
};

watch(email, (newValue) => {
  error.value = inputEmailValidate(newValue);
});
</script>

<style lang="scss"></style>
