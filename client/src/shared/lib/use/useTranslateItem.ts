import { useI18n } from 'vue-i18n';

export default function useTranslateItem(key: string): string {
  const { t } = useI18n();
  return t(key);
}
