import { createId } from '@paralleldrive/cuid2';

export default async function generateUUID(): Promise<string> {
  return createId();
}
