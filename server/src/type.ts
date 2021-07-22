import { UserType } from "@bhoos/auth-common";

export type AuthUserProfile = {
  type: UserType,
  typeId: string,
  name: string,
  picture?: number | string,
  email?: string,
};
