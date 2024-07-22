export interface IUser {
  id?: number;
  username: string;
  email: string;
  full_name: string;
  profile_picture: string;
  password: string;
  is_admin: boolean;
  address: string;
  contact: string;
}

export type Ilogin = Pick<IUser, "email" | "password">;
