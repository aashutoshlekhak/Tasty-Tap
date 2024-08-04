import { Ilogin, IUser } from "../interface/user.interface";
import * as UserModel from "../models/users.model";
import { uploadOnCloudinary } from "../utils/cloudinary.utils";
import bcrypt from "bcrypt";
import { generateAccessToken } from "../utils/generateToken.utils";
import {
  ConflictError,
  IncorrectPasswordError,
  InternalServerError,
  NotFoundError,
} from "../error/Errors";

export async function createUser(user: IUser) {
  const existingUser = await UserModel.findUserByEmail(user.email);
  if (existingUser) {
    throw new ConflictError(`User with email ${user.email} already exists`);
  }
  const existingUsername = await UserModel.findUserByUsername(user.username);
  if (existingUsername) {
    throw new ConflictError(
      `User with username ${user.username} already exists`
    );
  }

  try {
    const respose = await uploadOnCloudinary(user.profile_picture);
    const password_hash = await bcrypt.hash(user.password, 10);
    await UserModel.createUser({
      ...user,
      profile_picture: respose!.secure_url,
      password: password_hash,
    });
  } catch (error) {
    throw new InternalServerError("Error with database");
  }
}

export async function login(login: Ilogin) {
  try {
    const user = await UserModel.findUserByEmail(login.email);
    if (!user) {
      throw new NotFoundError(`User with email ${login.email} not found`);
    }
    const isMatch = await bcrypt.compare(login.password, user.password);
    if (!isMatch) {
      throw new IncorrectPasswordError("Incorrect password");
    }

    const accessToken = generateAccessToken({
      id: user.id,
      email: user.email,
      fullName: user.full_name,
    });
    return accessToken;
  } catch (error) {
    if (error instanceof NotFoundError) {
      throw new NotFoundError(error.message);
    }
    if (error instanceof IncorrectPasswordError) {
      throw new IncorrectPasswordError(error.message);
    }
    throw new InternalServerError("Error with database");
  }
}

export async function findUserByEmail(email: string) {
  try {
    const user = UserModel.findUserByEmail(email);
    return user;
  } catch (error) {
    throw new NotFoundError(`User with email ${email} not found: ${error}`);
  }
}

export async function getAllUsers() {
  const users = UserModel.getAllUsers();
  if (!users) {
    throw new NotFoundError("No users found");
  }
  return users;
}

export async function getUserById(id: number) {
  const user = UserModel.getUserById(id);
  if (!user) {
    throw new NotFoundError(`User with id ${id} not found`);
  }
  return user;
}

export async function updateUser(user: IUser, userEmail: string) {
  const existingUser = await UserModel.findUserByEmail(userEmail);
  if (!existingUser) {
    throw new NotFoundError(`User with email ${userEmail} not found`);
  }
  const respose = await uploadOnCloudinary(user.profile_picture);
  await UserModel.updateUser(
    { ...user, profile_picture: respose!.secure_url },
    userEmail
  );
}

export async function deleteUser(email: string) {
  const existingUser = await UserModel.findUserByEmail(email);
  if (!existingUser) {
    throw new NotFoundError(`User with email ${email} not found`);
  }
  await UserModel.deleteUser(email);
}

export async function deleteUserById(id: number) {
  const existingUser = await UserModel.getUserById(id);
  if (!existingUser) {
    throw new NotFoundError(`User with id ${id} not found`);
  }
  await UserModel.deleteUserById(id);
}
