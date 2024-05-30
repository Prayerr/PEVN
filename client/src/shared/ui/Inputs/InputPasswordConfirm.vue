<template>
  <VInput
    v-model="passwordConfirm"
    :label="$t('passwordConfirm')"
    name="password confirm"
    inputType="password"
    required
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import VInput from '../Main/VInput.vue';

const passwordConfirm = ref<string>('');
</script>

<style lang="scss"></style>
