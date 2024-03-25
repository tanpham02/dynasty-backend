import { SALT } from '@app/constants';
import { genSalt, hash } from 'bcrypt';

const hashPassword = async (password: string) => {
  const salt = await genSalt(SALT);
  const pwAfterHash = await hash(password, salt);

  return pwAfterHash;
};

export default hashPassword;
