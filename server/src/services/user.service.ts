import { Ilogin, IUser } from "../interface/user.interface";
import * as UserModel from "../models/users.model";
import { ApiError } from "../utils/ApiError.utils";
import { uploadOnCloudinary } from "../utils/cloudinary.utils";
import bcrypt from "bcrypt";
import { generateAccessToken } from "../utils/generateToken.utils";

export async function createUser(user: IUser) {
  try {
    const respose = await uploadOnCloudinary(user.profile_picture);
    const password_hash = await bcrypt.hash(user.password, 10);
    await UserModel.createUser({
      ...user,
      profile_picture: respose!.secure_url,
      password: password_hash,
    });
  } catch (error) {
    console.log(error);
    throw new ApiError(500, "Unable to create user");
  }
}

export async function login(login: Ilogin) {
  const user = await UserModel.findUserByEmail(login.email);
  if (!user) {
    throw new ApiError(400, "User does not exist");
  }
  const isMatch = await bcrypt.compare(login.password, user.password);
  if (!isMatch) {
    throw new ApiError(500, "Incorrect password");
  }

  const accessToken = generateAccessToken({
    id: user.id,
    email: user.email,
    fullName: user.full_name,
  });
  return accessToken;
}

export async function findUserByEmail(email: string) {
  return await UserModel.findUserByEmail(email);
}
