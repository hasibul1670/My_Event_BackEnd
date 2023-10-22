/* eslint-disable no-console */

import { User } from '../app/modules/users/user.model';
import { Venue } from '../app/modules/venue/venue.model';

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
export const generateVenueId = async (): Promise<string | undefined> => {
  try {
    const venueCount = await Venue.countDocuments();
    const incrementedId = (venueCount + 1).toString().padStart(5, '0');
    const newUserId = `V-${incrementedId}`;
    return newUserId;
  } catch (error) {
    console.error('Error while finding the last Venue:', error);
    throw error;
  }
};
