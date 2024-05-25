<template>
  <div class="container">
    <div class="wrapper">
      <LoginForm />
    </div>
    <LinkTerms class="terms" />
    <LogoIcon class="logo" />
  </div>
</template>

<script setup lang="ts">
import LoginForm from '@/features/auth/LoginForm.vue';
import LinkTerms from '@/shared/ui/Links/LinkTerms.vue';
import LogoIcon from '@/shared/ui/Icons/LogoIcon.vue';
</script>

<style lang="scss">
.container {
  display: grid;
  grid-template-rows: 1fr auto;
  height: 100vh;
  position: relative;
  overflow: hidden;
}

.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  grid-row: 1;
  z-index: 2;
}

.terms {
  display: flex;
  justify-content: center;
  align-items: center;
  grid-row: 2;
}

.logo {
  position: absolute;
  bottom: 10px;
  right: -135px;
  transform: rotate(-35deg);
  z-index: 1;
}
</style>
