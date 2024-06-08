<template>
  <div class="v-progress">
    <ul class="v-progress__steps">
      <li
        v-for="(step, index) in steps"
        :key="index"
        class="v-progress__step"
        :class="{ 'is-active': index < currentStepIndex }"
      />
    </ul>
    <span class="v-progress__current-label">{{ currentStepLabel }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface VProgressProps {
  steps: string[];
  currentStep: number;
}

const props = defineProps<VProgressProps>();

const steps = computed(() => props.steps);
const currentStepIndex = computed(() => props.currentStep);

const currentStepLabel = computed(
  () => steps.value[currentStepIndex.value - 1] || '',
);
</script>

<style lang="scss">
@import '../../../app/styles/main.scss';

.v-progress {
  display: flex;
  flex-direction: column;
  align-items: center;

  &__steps {
    display: flex;
    list-style: none;
    padding: 0;
    margin: 0;
  }

  &__step {
    display: flex;
    align-items: center;
    position: relative;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: transparent;
    border: 8px solid var(--color__light);
    margin: 0 5px;
  }

  &__current-label {
    color: var(--color__typography-light);
    font-size: var(--size__font-medium);
    font-weight: 600;
    margin-top: 10px;
  }

  .is-active {
    background-color: var(--color__light);
  }
}
</style>
