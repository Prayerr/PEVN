import { useI18n } from 'vue-i18n';
import { computed } from 'vue';

export default function (items: string[]) {
  const { t } = useI18n();
  const translatedItems = computed<string[]>(() => items.map((key) => t(key)));

  return translatedItems;
}
