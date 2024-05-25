export default function inputPasswordValidate(value: string) {
  if (!value) {
    return 'Пароль обязателен';
  }

  return '';
}
