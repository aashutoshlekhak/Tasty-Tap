import prisma from "../db/prisma.db";
import { IUser } from "../interface/user.interface";

export function createUser(user: IUser) {
  const {
    username,
    full_name,
    email,
    password_hash,
    profile_picture,
    is_admin,
    address,
    contact,
  } = user;
  return prisma.user.create({
    data: {
      username,
      full_name,
      email,
      password_hash,
      profile_picture,
      is_admin,
      address,
      contact,
    },
  });
}
