<template>
  <VInput
    v-model="username"
    :label="$t('username')"
    name="username"
    inputType="text"
    :error="error"
    @blur="validateInput"
  />
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import VInput from '../Main/VInput.vue';
import inputUsernameValidate from '@/shared/lib/utils/validation/usernameValidation';

const username = ref<string>('');
const error = ref<string>('');
const { t } = useI18n();

// Валидация
const validateInput = () => {
  error.value = inputUsernameValidate(username.value, t);
};

watch(username, (newValue) => {
  error.value = inputUsernameValidate(newValue, t);
});
</script>

<style lang="scss"></style>
