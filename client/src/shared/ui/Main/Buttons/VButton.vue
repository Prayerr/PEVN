<template>
  <button
    :class="['button', { 'button-disable': isDisabled }]"
    :disabled="isDisabled"
    :type="type"
    @click="handlerClick"
  >
    <span class="button__text">{{ text }}</span>
  </button>
</template>

<script setup lang="ts">
import type { TButtonType } from '@/shared/lib';

interface VButtonProps {
  text: string;
  isDisabled?: boolean;
  type: TButtonType;
}

withDefaults(defineProps<VButtonProps>(), {
  isDisabled: false,
  type: 'button',
});

const emit = defineEmits(['click']);

function handlerClick(event: Event) {
  emit('click', event);
}
</script>

<style lang="scss">
@import '../../../../app/styles/main.scss';

.button {
  cursor: pointer;

  &.button-disable {
    border-color: var(--color__disabled-light);
    cursor: auto;

    .button__text {
      color: var(--color__disabled-light);
    }
  }
}
</style>
