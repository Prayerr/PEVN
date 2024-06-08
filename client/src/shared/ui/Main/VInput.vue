<template>
  <div class="input">
    <label
      v-if="label"
      :class="['input__label', { 'input__label-error': error }]"
      :for="name"
    >
      {{ label }}
    </label>
    <input
      v-model="modelValue"
      autocomplete="off"
      :class="['input__field', { 'input__field-error': error }]"
      :disabled="isDisabled"
      :maxlength="maxLength"
      :minlength="minLength"
      :name="name"
      :required="isRequired"
      :type="inputType"
      @blur="onBlur"
    />
    <small v-if="error" class="input__error">{{ error }}</small>
  </div>
</template>

<script setup lang="ts">
import { inject } from 'vue';
import type { TInputType } from '@/shared/lib';

interface IVInput {
  label?: string;
  inputType?: TInputType;
  name?: string;
  isDisabled?: boolean;
  isRequired?: boolean;
  error?: string;
}

defineProps<IVInput>();

const modelValue = defineModel<string>('modelValue', { default: '' });

const emit = defineEmits(['blur']);

const onBlur = () => {
  emit('blur', modelValue.value);
};

const minMaxLength = inject<{ min: number; max: number }>('minMaxLength', {
  min: 0,
  max: 64,
});

const minLength = minMaxLength.min;
const maxLength = minMaxLength.max;
</script>

<style lang="scss">
@import '../../../app/styles/main.scss';

.input {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 10px;

  &__label {
    color: var(--color__typography-light);
    font-size: var(--size__font-input);
    font-weight: 700;

    &-error {
      color: var(--color__input-border-error);
    }
  }

  &__field {
    border: 5px solid var(--color__input-border);
    background-color: var(--color__input-background);
    color: var(--color__typography-light);
    font-weight: 600;
    border-radius: 15px;
    padding: 12px;
    transition:
      background-color 0.2s ease-in-out,
      border-color 0.2s ease-in-out;

    &:hover {
      @include input-hover;
      outline: none;
    }

    &:focus {
      @include input-focus;
      outline: none;
    }

    &-error {
      @include input-error;

      &:hover,
      &:focus {
        background-color: var(--color__input-background-error);
        border-color: var(--color__input-border-error);
      }
    }
  }

  &__error {
    font-weight: 500;
    color: var(--color__error);
  }
}
</style>
