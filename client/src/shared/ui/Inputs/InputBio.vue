<template>
  <VInput
    v-model="bio"
    :label="$t('bio')"
    name="bio"
    inputType="text"
    class="input-bio"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import VInput from '../Main/VInput.vue';

const bio = ref<string>('');
</script>

<style lang="scss">
.input-bio {
  .input__field {
    padding: 5% 0;
  }
}
</style>
