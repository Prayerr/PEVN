<template>
  <VForm
    :buttonSubmitText="$t('continue')"
    buttonClass="button-registration"
    buttonFormType="button"
    @buttonClick="submitForm"
  >
    <InputBio v-model="bio" />
    <BirthdayToggler v-model="birthdayToggle" />
    <BirthdaySelector v-if="birthdayToggle" v-model="birthdayDate" />
    <DropdownDirection v-model="direction" />
  </VForm>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { TUserDirection } from '@/shared/lib';
import useRegistrationStore from '../../model/registrationStore';
import VForm from '@/shared/ui/Main/VForm.vue';
import InputBio from '@/shared/ui/Inputs/InputBio.vue';
import BirthdayToggler from '../BirthdayToggler.vue';
import BirthdaySelector from '@/shared/ui/Selector/BirthdaySelector.vue';
import DropdownDirection from '@/shared/ui/Dropdowns/DropdownDirection.vue';

const bio = ref<string>('');
const birthdayDate = ref<Date>();
const birthdayToggle = ref<boolean>(false);
const direction = ref<TUserDirection>();

const registrationStore = useRegistrationStore();

function submitForm() {
  registrationStore.setAboutYou({
    bio: bio.value,
    birthday: birthdayDate.value,
    direction: direction.value,
  });

  registrationStore.nextStep();
}
</script>

<style lang="scss">
@import '../../../../../app/styles/main.scss';

.button-registration {
  @include button-registration-submit;
}
</style>
