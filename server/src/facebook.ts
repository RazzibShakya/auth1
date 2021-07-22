import fetch from 'node-fetch';
import { UserType } from '@bhoos/auth-common';
import { AuthUserProfile } from './type.js';

export async function facebookLogin(token: string): Promise<AuthUserProfile> {
  const url = `https://graph.facebook.com/v3.0/me?fields=id%2Cname%2Cemail%2Clocation{location}&access_token=${token}`;
  const res = await fetch(url);
  if (res.status !== 200) {
    throw new Error('Facebook login failed');
  }
  const user = await res.json();
  return {
    type: UserType.Facebook,
    typeId: user.id,
    name: user.name,
    email: user.email,
    picture: `https://graph.facebook.com/v5.0/${user.id}/picture?type=large`,
  };
}
