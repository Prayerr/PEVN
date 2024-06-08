<template>
  <VInput
    v-model="inputUsernameValue"
    :error="error"
    inputType="text"
    :isRequired="true"
    :label="$t('username')"
    name="username"
    @blur="validateInput"
  />
</template>

<script setup lang="ts">
import { provide } from 'vue';
import VInput from '../Main/VInput.vue';
import useInputValidation from '@/shared/lib/use/useInputValidate';
import inputUsernameValidate from '@/shared/lib/utils/validation/usernameValidation';

const inputUsernameValue = defineModel<string>('inputUsernameValue', {
  default: '',
});

const { error, validateInput } = useInputValidation(
  inputUsernameValue,
  inputUsernameValidate,
);

provide('minMaxLength', { min: 3 });
</script>

<style lang="scss"></style>
