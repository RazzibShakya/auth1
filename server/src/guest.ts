import { UserType } from '@bhoos/auth-common';
import { AuthUserProfile } from './type.js';

const GUEST_LOGIN_PARSER_TOKEN = process.env.GUEST_LOGIN_PARSER_TOKEN;

export async function guestLogin(token: string): Promise<AuthUserProfile> {
  const k = JSON.parse(token);
  return {
    type: UserType.Guest,
    typeId: k.id,
    name: k.name,
    picture: k.picture,
  }
}
