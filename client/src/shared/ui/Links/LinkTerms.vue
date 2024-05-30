<template>
  <VRouterLink link="/terms" :linkText="$t('terms')" linkClass="linkTerms" />
</template>

<script setup lang="ts">
import VRouterLink from '../Main/VRouterLink.vue';
</script>

<style lang="scss">
@import '../../../app/styles/main.scss';

.linkTerms {
  font-weight: 900;
  font-size: var(--size__font-large);
  color: var(--color__typography-black);
}
</style>
