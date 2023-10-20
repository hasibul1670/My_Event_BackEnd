/* eslint-disable no-console */

import { User } from '../app/modules/users/user.model';

export const generateUserId = async (
  data: string
): Promise<string | undefined> => {
  try {
    const userCount = await User.countDocuments({ role: data });
    const incrementedId = (userCount + 1).toString().padStart(5, '0');
    let newUserId;
    if (data === 'user') {
      newUserId = `U-${incrementedId}`;
    } else if (data === 'admin') {
      newUserId = `A-${incrementedId}`;
    } else {
      newUserId = `V-${incrementedId}`;
    }

    return newUserId;
  } catch (error) {
    console.error('Error while finding the last user:', error);
    throw error;
  }
};
