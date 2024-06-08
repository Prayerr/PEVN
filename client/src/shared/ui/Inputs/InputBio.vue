<template>
  <VInput
    v-model="inputBioValue"
    class="input-bio"
    inputType="text"
    :label="$t('bio')"
    name="bio"
  />
</template>

<script setup lang="ts">
import VInput from '../Main/VInput.vue';

const inputBioValue = defineModel('inputBioValue');
</script>

<style lang="scss">
.input-bio {
  .input__field {
    padding: 5% 0;
  }
}
</style>
