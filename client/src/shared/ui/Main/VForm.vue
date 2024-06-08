<template>
  <form ref="formElement" class="form" @submit.prevent="handlerSubmit">
    <LinkMain />
    <slot></slot>
    <VButton
      :class="buttonClass"
      :text="buttonSubmitText"
      :type="buttonFormType"
      @click="handlerButtonClick"
    />
    <slot name="after-button-submit"></slot>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import VButton from './Buttons/VButton.vue';
import LinkMain from '../Links/LinkMain.vue';
import type { TButtonType } from '@/shared/lib/types/buttonTypes';

interface IVForm {
  buttonSubmitText?: string;
  buttonClass: string;
  buttonFormType: TButtonType;
}

withDefaults(defineProps<IVForm>(), {
  buttonSubmitText: '',
});

const emit = defineEmits(['submit', 'buttonClick']);

const formElement = ref<HTMLFormElement | null>(null);

function handlerSubmit(event: Event) {
  emit('submit', event);
}

function handlerButtonClick(event: Event) {
  if (formElement.value?.reportValidity()) {
    emit('buttonClick', event);
  }
}
</script>

<style lang="scss">
@import '../../../app/styles/main.scss';

.form {
  background-color: var(--color__primary);
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 40px;
  padding: 10px 25px;
}
</style>
