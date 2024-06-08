<template>
  <VInput
    v-model="inputEmailValue"
    :error="error"
    inputType="email"
    :isRequired="true"
    :label="$t('email')"
    name="email"
    required
    @blur="validateInput"
  />
</template>

<script setup lang="ts">
import VInput from '../Main/VInput.vue';
import useInputValidation from '@/shared/lib/use/useInputValidate';
import inputEmailValidate from '@/shared/lib/utils/validation/emailValidation';

const inputEmailValue = defineModel<string>('inputEmailValue', { default: '' });

const { error, validateInput } = useInputValidation(
  inputEmailValue,
  inputEmailValidate,
);
</script>

<style lang="scss"></style>
