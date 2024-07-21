import { IUser } from "../interface/user.interface";
import * as UserModel from "../models/users.model";
import { ApiError } from "../utils/ApiError.utils";
import { uploadOnCloudinary } from "../utils/cloudinary.utils";

export async function createUser(user: IUser) {
  try {
    const respose =  await uploadOnCloudinary(user.profile_picture);
    await UserModel.createUser({...user, profile_picture: respose!.secure_url});
  } catch (error) {
    console.log(error);
    throw new ApiError(500, "Unable to create user");
  }
}
