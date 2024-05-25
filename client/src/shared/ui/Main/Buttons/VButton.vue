<template>
  <button class="button">
    <span>{{ text }}</span>
  </button>
</template>

<script setup lang="ts">
interface VButtonProps {
  text: string;
}

defineProps<VButtonProps>();
</script>

<style lang="scss">
.button {
  cursor: pointer;
}
</style>
