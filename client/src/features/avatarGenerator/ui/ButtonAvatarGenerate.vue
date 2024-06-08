<template>
  <VButton text="generate" @click="generateAvatar" />
</template>

<script setup lang="ts">
import VButton from '@/shared/ui/Main/Buttons/VButton.vue';
</script>

<style lang="scss">
@import '../../../app/styles/main.scss';

.button {
  border: 5px solid var(--color__button-border);
  padding: 1%;
  border-radius: 100px;
}
</style>
