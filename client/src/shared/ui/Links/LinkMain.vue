<template>
  <VRouterLink link="/" linkClass="linkMain" linkText="IT.NXT" />
</template>

<script setup lang="ts">
import VRouterLink from '../Main/VRouterLink.vue';
</script>

<style lang="scss">
@import '../../../app/styles/main.scss';

.linkMain {
  font-weight: 900;
  font-size: var(--size__font-xl);
  color: var(--color__typography-light);

  &:hover {
    @include gradient-animation-hover;
  }
}
</style>
