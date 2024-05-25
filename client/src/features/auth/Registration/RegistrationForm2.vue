<template>
  <VForm buttonSubmitText="next" buttonClass="button-registration">
    <InputBio />
  </VForm>
</template>

<script setup lang="ts">
import VForm from '@/shared/ui/Main/VForm.vue';
import InputBio from '@/shared/ui/Inputs/InputBio.vue';
</script>

<style lang="scss">
@import '../../../app/styles/main.scss';

.button-registration {
  @include button-registration-submit;
}
</style>
