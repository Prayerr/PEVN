<template>
  <VForm :buttonSubmitText="$t('next')" buttonClass="button-registration">
    <InputBio />
    <BirthdaySelector />
    <DropdownDirection />
  </VForm>
</template>

<script setup lang="ts">
import InputBio from '@/shared/ui/Inputs/InputBio.vue';
import DropdownDirection from '@/shared/ui/Dropdowns/DropdownDirection.vue';
import BirthdaySelector from '@/shared/ui/Selector/BirthdaySelector.vue';
</script>

<style lang="scss">
@import '../../../../../app/styles/main.scss';

.button-registration {
  @include button-registration-submit;
}
</style>
