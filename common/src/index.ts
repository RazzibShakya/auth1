export enum UserType {
  Guest = 'guest',
  Google = 'google',
  Facebook = 'fb',
  Apple = 'apple',
  WinZO = 'winzo',
};

export type Profile = {
  id: string,
  type: UserType,
  name: string,
  picture?: number | string | {
    uri: string,
  },
  email?: string,
};
