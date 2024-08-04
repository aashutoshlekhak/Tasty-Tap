import prisma from "../db/prisma.db";
import { IUser } from "../interface/user.interface";

export function createUser(user: IUser) {
  const {
    username,
    full_name,
    email,
    password,
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
      password,
      profile_picture,
      is_admin,
      address,
      contact,
    },
  });
}

export function findUserByEmail(email: string) {
  return prisma.user.findUnique({ where: { email } });
}

export function findUserByUsername(username: string) {
  return prisma.user.findUnique({ where: { username } });
}

//get all users
export function getAllUsers() {
  return prisma.user.findMany({
    select: {
      id: true, 
      username: true, 
      email: true, 
      full_name: true,
      profile_picture: true,
      contact: true,
      address: true,
    }
  });
}

//update user profile
export function updateUser(user: IUser, userEmail: string) {
  const { id, username, full_name, email, profile_picture, address, contact } =
    user;
  return prisma.user.update({
    where: { email: userEmail },
    data: {
      username,
      full_name,
      email,
      profile_picture,
      address,
      contact,
    },
  });
}

//delete account
export function deleteUser(email: string) {
  return prisma.user.delete({ where: { email } });
}
