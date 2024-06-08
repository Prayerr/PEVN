import type { Ref } from 'vue';
import { ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';

interface ValidationFunction {
  (value: string, t: any): string;
}

export default function useInputValidation(
  inputValue: Ref<string>,
  validationFunction: ValidationFunction,
) {
  const error = ref<string>('');
  const { t } = useI18n();

  const validateInput = () => {
    error.value = validationFunction(inputValue.value, t);
  };

  watch(inputValue, (newValue) => {
    error.value = validationFunction(newValue, t);
  });

  return {
    error,
    validateInput,
  };
}
