import config from '../../../config';
import { IUser } from './user.interface';
import { User } from './user.model';
import generateUserId from './user.utills';

const createUser = async (user: IUser): Promise<IUser | null> => {
  const id = await generateUserId();
  user.id = id as string;
  // giving a default password
  if (!user.password) {
    user.password = config.default_password as string;
  }

  const createdUser = await User.create(user);

  if (!createUser) {
    throw new Error('Failed to create user!');
  }
  return createdUser;
};

export const userService = {
  createUser,
};
