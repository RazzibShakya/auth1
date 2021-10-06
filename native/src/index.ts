import { Google } from './Google';
import { Facebook } from './Facebook';
import { Auth } from './Auth';
import { Guest } from './Guest';
import { Apple } from './Apple';
import { UserType, Profile } from '@bhoos/auth-common';

export { Auth, UserType };
export type { Profile };

const auths: { [type: string]: Auth } = {
  [UserType.Guest]: new Guest(),
  [UserType.Facebook]: new Facebook(),
  [UserType.Google]: new Google(),
  [UserType.Apple]: new Apple(),
}

export function getAuth(type: UserType) {
  return auths[type];
}
