<template>
  <VRouterLink
    link="/forgot"
    linkText="forgot password"
    linkClass="linkForgotPassword"
  />
</template>

<script setup lang="ts">
import VRouterLink from '../Main/VRouterLink.vue';
</script>

<style lang="scss">
@import '../../../app/styles/main.scss';

.linkForgotPassword {
  font-weight: 700;
  margin-top: 20px;
  color: var(--color__typography-light);
  font-size: var(--size__font-medium);

  &:hover {
    @include link-hover;
  }
}
</style>
