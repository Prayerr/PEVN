import { emailRegex } from '../../common/regexes';

export default function inputEmailValidate(
  value: string,
  t: (key: string) => string,
) {
  if (!value) {
    return t('errors.emailRequired');
  } else if (!emailRegex.test(value)) return t('errors.emailInvalid');

  return '';
}
