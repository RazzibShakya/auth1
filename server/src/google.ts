import { OAuth2Client } from 'google-auth-library';
import { UserType } from '@bhoos/auth-common';
import { AuthUserProfile } from './type.js';

const CLIENT_ID = process.env.GOOGLE_AUTH_CLIENT_ID;
const client = new OAuth2Client(CLIENT_ID);

export async function googleLogin(token: string): Promise<AuthUserProfile> {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: CLIENT_ID,
  });

  const payload = ticket.getPayload();
  const userId = payload['sub'];

  return {
    type: UserType.Google,
    typeId: userId,
    name: payload.name,
    picture: payload.picture,
    email: payload.email,
  };
}
