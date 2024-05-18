<template>
  <router-link to="/login" class="auth-redirect-button">IT.nxt_</router-link>
</template>

<script lang="ts"></script>

<style lang="scss">
@import '@/app/styles/main.scss';

.auth-redirect-button {
  font-weight: 600;
  color: $typography-dark-color;
  text-decoration: none;
  cursor: pointer;
  font-size: 48px;

  &:hover {
    @include gradient-animation-hover;
  }
}
</style>
