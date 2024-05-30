<template>
  <div class="registration-form">
    <RegistrationStep1 />
    <RegistrationStep2 />
    <RegistrationStepIndicator />
  </div>
</template>

<script setup lang="ts">
import RegistrationStep1 from './steps/RegistrationStep1.vue';
import RegistrationStep2 from './steps/RegistrationStep2.vue';
import RegistrationStepIndicator from '@/shared/ui/Progress/RegistrationStepIndicator.vue';
</script>

<style lang="scss">
@import '../../../../app/styles/main.scss';

.registration-form {
  background-color: var(--color__primary);
}
</style>
