<template>
  <VInput
    v-model="inputPasswordValue"
    inputType="password"
    :isRequired="true"
    :label="$t('password')"
    name="password"
    required
  />
</template>

<script setup lang="ts">
import VInput from '../Main/VInput.vue';

const inputPasswordValue = defineModel<string>('inputPasswordValue', {
  default: '',
});
</script>

<style lang="scss"></style>
