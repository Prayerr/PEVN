<template>
  <AuthRedirectButton />
  <LoginForm />
</template>

<script setup lang="ts">
import LoginForm from '../features/auth/LoginForm/LoginForm.vue';
import AuthRedirectButton from '../shared/ui/Buttons/AuthRedirectButton.vue';
</script>

<style lang="scss">
body {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 700px;
  font-weight: 600;
}
</style>
