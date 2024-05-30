<template>
  <VForm :buttonSubmitText="$t('login')" buttonClass="button-login">
    <span class="form__text">{{ $t('signIn') }}</span>
    <InputEmail />
    <InputPassword />
    <template #after-button-submit>
      <LinkForgotPassword />
    </template>
  </VForm>
</template>

<script setup lang="ts">
import VForm from '@/shared/ui/Main/VForm.vue';
import InputEmail from '@/shared/ui/Inputs/InputEmail.vue';
import InputPassword from '@/shared/ui/Inputs/InputPassword.vue';
import LinkForgotPassword from '@/shared/ui/Links/LinkForgotPassword.vue';
</script>

<style lang="scss">
@import '../../../app/styles/main.scss';

.button-login {
  border: 10px solid var(--color__accepted);
  color: var(--color__accepted);
  background-color: transparent;
  border-radius: 100px;
  padding: 0 10%;

  span {
    font-size: var(--size__font-large);
    font-weight: 900;
  }
}

.form__text {
  color: var(--color__typography-light);
  font-size: var(--size__font-medium);
  font-weight: 700;
}
</style>
