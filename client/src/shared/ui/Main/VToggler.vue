<template>
  <button :class="['toggler', { 'toggler--active': isActive }]" @click="toggle">
    <div class="toggler__slider">
      <div class="toggler__circle"></div>
    </div>
  </button>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const isActive = ref(false);

const toggle = () => {
  isActive.value = !isActive.value;
};
</script>

<style lang="scss">
@import '../../../app/styles/main.scss';

.toggler {
  width: 60px;
  height: 30px;
  background-color: var(--color__primary);
  border: 2px solid var(--color__light);
  border-radius: 30px;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.3s ease;
  padding: 0;
  outline: none;
  border: none;

  &__slider {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    transition: justify-content 0.3s ease;
  }

  &__circle {
    width: 24px;
    height: 24px;
    background-color: var(--color__primary-light);
    border-radius: 50%;
    transition: transform 0.3s ease;
  }

  &--active {
    & .toggler__slider {
      justify-content: flex-end;
    }

    & .toggler__circle {
      background-color: #0e2d3d;
    }
  }
}
</style>
