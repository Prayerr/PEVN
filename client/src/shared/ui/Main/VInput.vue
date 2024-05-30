<template>
  <div class="input">
    <label v-if="label" :for="name" class="input__label">{{ label }}</label>
    <input
      class="input__field"
      ref="input"
      :value="modelValue"
      :type="inputType"
      :name="name"
      :disabled="isDisabled"
      autocomplete="off"
      @input="onInput"
      @blur="onBlur"
    />
    <small v-if="error" class="input__error">{{ error }}</small>
  </div>
</template>

<script setup lang="ts">
import type { TInputType } from '@/shared/lib';

interface IVInput {
  modelValue?: string;
  label?: string;
  inputType?: TInputType;
  name?: string;
  isDisabled?: boolean;
  error?: string;
}

const props = withDefaults(defineProps<IVInput>(), {
  inputType: 'text',
});

const emit = defineEmits(['update:modelValue', 'blur']);

// Обработчик ввода
const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', target.value);
};

const onBlur = () => {
  emit('blur', props.modelValue);
};
</script>

<style lang="scss">
@import '../../../app/styles/main.scss';

.input {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 10px;

  .input__label {
    color: var(--color__typography-light);
    font-size: var(--size__font-input);
    font-weight: 700;
  }

  .input__field {
    border: 5px solid var(--color__input-border);
    background-color: var(--color__primary);
    color: var(--color__typography-light);
    border-radius: 15px;
    padding: 12px;

    &:hover,
    &:focus {
      @include input-hover;
    }
  }

  .input__error {
    color: var(--color__error);
  }
}
</style>
