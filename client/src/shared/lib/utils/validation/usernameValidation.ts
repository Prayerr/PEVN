import { usernameRegex } from '../../common/regexes';

export default function inputUsernameValidate(
  value: string,
  t: (key: string) => string,
) {
  if (!value) {
    return t('errors.usernameRequired');
  } else if (!usernameRegex.test(value)) return t('errors.usernameInvalid');
  else if (value.length < 3) return t('errors.usernameShort');

  return '';
}
