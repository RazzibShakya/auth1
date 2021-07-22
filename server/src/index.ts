import { UserType } from '@bhoos/auth-common';
import { facebookLogin } from './facebook.js';
import { guestLogin } from './guest.js';
import { googleLogin } from './google.js';
import { AuthUserProfile } from './type.js';

export const authProviders: {
  [type: string]: (token: string) => Promise<AuthUserProfile>
} = {
  [UserType.Guest]: guestLogin,
  [UserType.Facebook]: facebookLogin,
  [UserType.Google]: googleLogin,
}
