<template>
  <VProgress :currentStep="currentStep" :steps="translatedSteps" />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import useRegistrationStore from '@/features/auth/Registration/model/registrationStore';
import useTranslateItems from '@/shared/lib/use/useTranslateItems';
import VProgress from '@/shared/ui/Main/VProgress.vue';

const steps = [
  'registrationSteps.accountInfo',
  'registrationSteps.aboutYou',
  'registrationSteps.additionally',
];

const registrationStore = useRegistrationStore();
const translatedSteps = useTranslateItems(steps);

const currentStep = computed(() => registrationStore.step + 1);
</script>

<style lang="scss"></style>
