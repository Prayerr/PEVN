<template>
  <VForm
    :buttonSubmitText="$t('continue')"
    buttonClass="button-registration"
    buttonFormType="button"
    @buttonClick="submitForm"
  >
    <InputUsername v-model="username" />
    <InputEmail v-model="email" />
    <InputPassword v-model="password" />
    <InputPasswordConfirm v-model="passwordConfirm" />
  </VForm>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import VForm from '@/shared/ui/Main/VForm.vue';
import useRegistrationStore from '../../model/registrationStore';
import InputUsername from '@/shared/ui/Inputs/InputUsername.vue';
import InputEmail from '@/shared/ui/Inputs/InputEmail.vue';
import InputPassword from '@/shared/ui/Inputs/InputPassword.vue';
import InputPasswordConfirm from '@/shared/ui/Inputs/InputPasswordConfirm.vue';

const registrationStore = useRegistrationStore();

const username = ref<string>('');
const email = ref<string>('');
const password = ref<string>('');
const passwordConfirm = ref<string>('');

function submitForm() {
  registrationStore.setAccountInfo({
    username: username.value,
    email: email.value,
    password: password.value,
    passwordConfirm: passwordConfirm.value,
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
