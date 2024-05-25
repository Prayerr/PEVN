<template>
  <VInput v-model="bio" label="bio" name="bio" inputType="text" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import VInput from '../Main/VInput.vue';

const bio = ref<string>('');
</script>

<style lang="scss"></style>
