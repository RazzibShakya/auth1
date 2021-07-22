import { Profile } from '@bhoos/auth-common';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type Identity = {
  id: string,
  token: string,
  profile: null | Profile, // A profile is available only in case of offline authentications
};

function profileKey(id: string) {
  return `profile-${id}`;
}

export abstract class Auth {
  abstract getIdentity(): Promise<Identity>;
  abstract logout(): Promise<void>;

  static async getProfile(id: string) {
    const k = await AsyncStorage.getItem(profileKey(id));
    if (!k) return null;
    try {
      return JSON.parse(k) as Profile;
    } catch (err) {
      console.warn(`Error loading profile ${id}`, err);
      return null;
    }
  }

  static async saveProfile(profile: Profile) {
    await AsyncStorage.setItem(profileKey(profile.id), JSON.stringify(profile));
  }
}
