<template>
  <VInput
    v-model="email"
    :label="$t('email')"
    name="email"
    inputType="email"
    required
    :error="error"
    @blur="validateInput"
  />
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { ref, watch } from 'vue';
import VInput from '../Main/VInput.vue';
import inputEmailValidate from '@/shared/lib/utils/validation/emailValidation';

const email = ref<string>('');
const error = ref<string>('');

const { t } = useI18n();

const validateInput = () => {
  error.value = inputEmailValidate(email.value, t);
};

watch(email, (newValue) => {
  error.value = inputEmailValidate(newValue, t);
});
</script>

<style lang="scss"></style>
