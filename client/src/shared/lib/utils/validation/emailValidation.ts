import { emailRegex } from '../../common/regexes';

export default function inputEmailValidate(value: string) {
  if (!value) {
    return 'Электронная почта обязательна';
  } else if (!emailRegex.test(value))
    return 'Введите корректную электронную почту';

  return '';
}
