export default function inputPasswordValidate(
  value: string,
  t: (key: string) => string,
) {
  if (!value) {
    return t('errors.passwordRequired');
  } else if (value.length < 6) return t('errors.passwordShort');

  return '';
}
