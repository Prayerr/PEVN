<template>
  <VInput
    v-model="password"
    :label="$t('password')"
    name="password"
    inputType="password"
    required
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import VInput from '../Main/VInput.vue';

const password = ref<string>('');
</script>

<style lang="scss"></style>
