import { usernameRegex } from '../../common/regexes';

export default function inputUsernameValidate(value: string) {
  if (!value) {
    return 'Имя пользователя обязательно';
  } else if (!usernameRegex.test(value))
    return 'Введите корректное имя пользователя';
  else if (value.length < 3) return 'Имя пользователя слишком короткое';

  return '';
}
