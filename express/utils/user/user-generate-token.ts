import jwt from 'jsonwebtoken';
import crypto from 'crypto';

export default async function generateToken(
  userId: string,
  email: string,
): Promise<string> {
  const secretKey: string = crypto.randomBytes(32).toString('base64');

  const payload: { userId: string; email: string } = { userId, email };

  return jwt.sign(payload, secretKey);
}
