import { compare, hash } from 'bcrypt';

export async function hashPassword(password: string): Promise<string> {
  const saltOrRounds = 10;
  return hash(password, saltOrRounds);
}

export async function validatePassword(
  password: string,
  passwordHash: string,
): Promise<boolean> {
  return compare(password, passwordHash);
}
