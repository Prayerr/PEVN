<template>
  <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const errorMessage = ref('');
</script>

<style lang="scss" scoped>
.error-message {
  text-align: center;
  font-size: 32px;
  color: #ff0000;
}
</style>
