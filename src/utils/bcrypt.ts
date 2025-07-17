import * as bcrypt from 'bcrypt';

const SALT_ROUNDS = 10; // 越大越安全，但也越慢（推荐 10 ~ 12）

export const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, SALT_ROUNDS);
};

export const comparePassword = async (
  password: string,
  hashedPassword: string,
): Promise<boolean> => {
  return await bcrypt.compare(password, hashedPassword);
};
