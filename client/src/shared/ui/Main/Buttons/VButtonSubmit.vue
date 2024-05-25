<template>
  <VButton
    :class="buttonClass"
    type="submit"
    :text="text"
    :disabled="isDisabled"
  />
</template>

<script setup lang="ts">
import VButton from './VButton.vue';
import type { TButtonSubmitClass } from '@/shared/lib/types/buttonTypes';

interface IButtonSubmit {
  text: string;
  isDisabled?: boolean;
  buttonClass: TButtonSubmitClass;
}

withDefaults(defineProps<IButtonSubmit>(), {
  text: 'submit',
  isDisabled: false,
});
</script>

<style lang="scss"></style>
