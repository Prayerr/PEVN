import bcrypt from 'bcrypt';

export default async function hashPassword(password: string): Promise<string> {
  if (!process.env.SALT_ROUNDS) {
    throw new Error('Не удалось найти переменную окружения SALT_ROUNDS');
  }

  const saltRounds: number = parseInt(process.env.SALT_ROUNDS);

  return await bcrypt.hashSync(password, saltRounds);
}
