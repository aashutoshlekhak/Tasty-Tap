export interface IUser {
  id?: number;
  username: string;
  email: string;
  full_name: string;
  profile_picture: string;
  password_hash: string;
  is_admin: boolean;
  address: string;
  contact: string;
}
