<template>
  <VInput
    v-model="passwordConfirm"
    inputType="password"
    :isRequired="true"
    :label="$t('passwordConfirm')"
    name="password confirm"
    required
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import VInput from '../Main/VInput.vue';

const passwordConfirm = ref<string>('');
</script>

<style lang="scss"></style>
