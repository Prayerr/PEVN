<template>
  <VRouterLink
    link="/registration"
    :linkText="$t('createAccount')"
    linkClass="linkRegistration"
  />
</template>

<script setup lang="ts">
import VRouterLink from '../Main/VRouterLink.vue';
</script>

<style lang="scss">
@import '../../../app/styles/main.scss';

.linkRegistration {
  font-size: var(--size__font-medium);
  color: var(--color__accepted);
  font-weight: 900;
}
</style>
