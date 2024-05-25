<template>
  <form class="form">
    <LinkMain />
    <slot></slot>
    <VButtonSubmit :text="buttonSubmitText" :buttonClass="buttonClass" />
    <slot name="after-button-submit"></slot>
  </form>
</template>

<script setup lang="ts">
import VButtonSubmit from './Buttons/VButtonSubmit.vue';
import LinkMain from '../Links/LinkMain.vue';
import type { TButtonSubmitClass } from '@/shared/lib/types/buttonTypes';

interface IVForm {
  buttonSubmitText?: string;
  buttonClass: TButtonSubmitClass;
}

withDefaults(defineProps<IVForm>(), {
  buttonSubmitText: '',
});
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
