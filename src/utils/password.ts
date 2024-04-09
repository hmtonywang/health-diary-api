import { pbkdf2, randomBytes } from 'crypto';

export const hashPassword = (
  password: string,
  salt: string,
): Promise<string> => {
  return new Promise((resolve, reject) => {
    pbkdf2(password, salt, 100000, 50, 'sha512', (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result.toString('hex'));
      }
    });
  });
};

export const createSalt = (size: number = 16): string => {
  return randomBytes(size).toString('hex');
};
