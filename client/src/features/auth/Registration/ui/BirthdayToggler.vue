<template>
  <VButton :text="$t('birthday')" @click="toggleBirthday" />
</template>

<script setup lang="ts">
import VButton from '@/shared/ui/Main/Buttons/VButton.vue';

const togglerValue = defineModel<boolean>();

function toggleBirthday() {
  togglerValue.value = !togglerValue.value;
}
</script>

<style lang="scss">
@import '../../../../app/styles/main.scss';

.button {
  color: var(--color__typography-light);
  font-weight: 600;
  border: none;
  background-color: transparent;

  &__text {
    font-size: var(--size__font-medium);
  }
}
</style>
