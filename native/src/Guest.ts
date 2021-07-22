import { Auth } from './Auth';
import { nanoid } from 'nanoid/non-secure';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Profile, UserType } from '@bhoos/auth-common';

function randomName() {
  return `G-${Math.floor(Math.random() * 9000000 + 1000000)}`;
}

function randomPicture() {
  return Math.floor(Math.random() * 8);
}

const GUEST_STORAGE_KEY = '__GUEST_ID__';

export class Guest extends Auth {
  async getIdentity() {
    let guestId = await AsyncStorage.getItem(GUEST_STORAGE_KEY);
    let profile: Profile | null = null;

    // Try to get a profile
    if (guestId) {
      profile = await Auth.getProfile(guestId);
      if (!profile || profile.type !== UserType.Guest) {
        // Looks like the guest account has already been connected to other account
        // Create a new guest account
        profile = null;
      }
    }

    if (!profile) {
      // This would be the place where we initiate a guest input UI
      // Generate a new profile
      guestId = nanoid(24);
      profile = {
        id: guestId,
        type: UserType.Guest,
        name: randomName(),
        picture: randomPicture(),
      };
      await Auth.saveProfile(profile);
      await AsyncStorage.setItem(GUEST_STORAGE_KEY, guestId);
    }

    return {
      id: profile.id,
      token: JSON.stringify(profile),
      profile,
    };
  }

  async logout() {
    // Guest logout doesn't need anything to be done on
    // client side as well as server side
  }
}