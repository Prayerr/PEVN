<template>
  <VForm
    :buttonSubmitText="$t('save')"
    buttonClass="button-registration"
    buttonFormType="submit"
    @submit="submitForm"
  >
    <span class="v-form__label">{{ $t('pleaseEnterYourAvatar') }}</span>
    <ButtonAvatarGenerate />
    <InputAvatarEdit />
    <LinkTerms class="v-form__terms" />
  </VForm>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import VForm from '@/shared/ui/Main/VForm.vue';
import LinkTerms from '@/shared/ui/Links/LinkTerms.vue';
import useRegistrationStore from '../../model/registrationStore';
import InputAvatarEdit from '@/shared/ui/Inputs/InputAvatarEdit.vue';

import ButtonAvatarGenerate from '@/features/avatarGenerator/ui/ButtonAvatarGenerate.vue';

const registrationStore = useRegistrationStore();

const avatarURL = ref<string>('');

function submitForm() {
  registrationStore.setAdditionally({
    avatarURL: avatarURL.value,
  });

  registrationStore.completeRegistration();
}
</script>

<style lang="scss">
@import '../../../../../app/styles/main.scss';

.button-registration {
  @include button-registration-submit;
}

.v-form__label {
  color: var(--color__typography-light);
  font-size: var(--size__font-medium);
  font-weight: 600;
}

.v-form__terms {
  color: var(--color__typography-light);
}
</style>
