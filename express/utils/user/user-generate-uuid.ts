import { v4 as uuid } from 'uuid';
// МБ ФУНКЦ ВЫРАЖЕНИЯ
export default async function generateUUID(): Promise<string> {
  return uuid();
}
