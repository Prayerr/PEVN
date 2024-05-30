<template>
  <VForm :buttonSubmitText="$t('next')" buttonClass="button-registration">
    <InputUsername />
    <InputEmail />
    <InputPassword />
    <InputPasswordConfirm />
  </VForm>
</template>

<script setup lang="ts">
import VForm from '@/shared/ui/Main/VForm.vue';
import InputUsername from '@/shared/ui/Inputs/InputUsername.vue';
import InputEmail from '@/shared/ui/Inputs/InputEmail.vue';
import InputPassword from '@/shared/ui/Inputs/InputPassword.vue';
import InputPasswordConfirm from '@/shared/ui/Inputs/InputPasswordConfirm.vue';
</script>

<style lang="scss">
@import '../../../../../app/styles/main.scss';

.button-registration {
  @include button-registration-submit;
}
</style>
