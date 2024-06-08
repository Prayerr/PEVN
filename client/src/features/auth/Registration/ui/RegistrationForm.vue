<template>
  <div class="registration-form"></div>
  <RegistrationStep2 />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { Component } from 'vue';
import RegistrationStep1 from './steps/RegistrationStep1.vue';
import RegistrationStep2 from './steps/RegistrationStep2.vue';
import RegistrationStep3 from './steps/RegistrationStep3.vue';
import useRegistrationStore from '../model/registrationStore';
import RegistrationStepIndicator from '@/features/auth/Registration/ui/RegistrationStepIndicator.vue';

const registrationStore = useRegistrationStore();

/* 
    <component :is="currentStepComponent" />
    <RegistrationStepIndicator />
*/

const stepComponents: Record<number, Component> = {
  0: RegistrationStep1,
  1: RegistrationStep2,
  2: RegistrationStep3,
};

const currentStepComponent = computed<Component>(
  () => stepComponents[registrationStore.step] || RegistrationStep1,
);
</script>

<style lang="scss">
@import '../../../../app/styles/main.scss';

.registration-form {
  background-color: var(--color__primary);
}
</style>
