import { v4 as uuid } from 'uuid';

export default async function generateUUID(): Promise<string> {
  return uuid();
}
