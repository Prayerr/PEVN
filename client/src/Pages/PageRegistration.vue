<template>
  <AuthRedirectButton />
  <RegistrationForm />
</template>

<script setup lang="ts">
import RegistrationForm from '@/features/auth/RegistrationForm.vue';
import AuthRedirectButton from '@/shared/ui/Buttons/AuthRedirectButton.vue';
</script>

<style lang="scss">
body {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
