<template>
  <div class="wrapper">
    <LanguageSelector />
    <div class="login">
      <LoginForm />
      <div class="login__footer">
        <span class="login__footer-label">{{ $t('new') }}</span>
        <LinkCreateAccount />
      </div>
    </div>
    <div class="terms">
      <LinkTerms />
    </div>
    <div class="logo1">
      <LogoIcon />
    </div>
    <div class="logo2">
      <LogoIcon />
    </div>
  </div>
</template>

<script setup lang="ts">
import LoginForm from '@/features/auth/Login/LoginForm.vue';
import LinkCreateAccount from '@/shared/ui/Links/LinkCreateAccount.vue';
import LinkTerms from '@/shared/ui/Links/LinkTerms.vue';
import LogoIcon from '@/shared/ui/Icons/LogoIcon.vue';
import LanguageSelector from '@/features/languageSelector/languageSelector.vue';
</script>

<style lang="scss">
@import '../app/styles/main.scss';

.wrapper {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
  padding: 0 20px;
  height: 100vh;
  box-sizing: border-box;
  overflow: hidden;
  position: relative;

  .logo1 {
    z-index: -1;
    position: absolute;
    bottom: -20px;
    right: -130px;
    transform: rotate(-35deg);
  }

  .logo2 {
    z-index: -1;
    position: absolute;
    top: -20px;
    left: -130px;
    transform: rotate(125deg);
  }
}

.login {
  width: 100%;
  max-width: 680px;
  margin-top: 10%;

  .login__footer {
    display: flex;
    justify-content: space-between;
    padding: 3% 5%;
    flex-wrap: wrap;
    background-color: var(--color__primary);
    font-weight: 700;
    margin-top: 20px;
    border-radius: 40px;

    .login__footer-label {
      color: var(--color__typography-light);
      font-size: var(--size__font-medium);
    }
  }
}

.terms {
  margin-top: auto;
  text-align: center;
}
</style>
