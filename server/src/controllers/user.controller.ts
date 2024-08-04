import { NextFunction, Request, Response } from "express";
import * as UserService from "../services/user.service";
import HttpStatusCodes from "http-status-codes";
import { AuthRequest } from "../interface/auth.interface";
import { IUser } from "../interface/user.interface";

export async function createUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const user = req.body;
    const localFilePath: any = req.files;
    user.profile_picture = localFilePath.profile_picture[0].path;
    await UserService.createUser({ ...user, is_admin: true });
    res
      .status(HttpStatusCodes.CREATED)
      .json({ message: "controller: User created successfully" });
  } catch (error) {
    next(error);
  }
}

export async function findUserByEmail(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const email = req.body.email;
    const user = await UserService.findUserByEmail(email);
    res.status(HttpStatusCodes.OK).json(user);
  } catch (error) {
    next(error);
  }
}

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const login = req.body;
    const token = await UserService.login(login);
    res.status(HttpStatusCodes.OK).json({ token });
  } catch (error: any) {
    next(error);
  }
}

export async function getAllUsers(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const users = await UserService.getAllUsers();
    res.status(HttpStatusCodes.OK).json(users);
  } catch (error) {
    next(error);
  }
}

export async function getUserById(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const id = parseInt(req.params.id);
    const user = await UserService.getUserById(id);
    res.status(HttpStatusCodes.OK).json(user);
  } catch (error) {
    next(error);
  }
}

export async function updateUser(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const user: IUser = req.body;
    const email = req.params.email;
    const localFilePath: any = req.files;
    user.profile_picture = localFilePath.profile_picture[0].path;
    const updatedUser = await UserService.updateUser(user, email);
    res.status(HttpStatusCodes.OK).json(updatedUser);
  } catch (error) {
    next(error);
  }
}

export async function deleteUser(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const email = req.user.email;
    const deletedUser = await UserService.deleteUser(email);
    res.status(HttpStatusCodes.OK).json(deletedUser);
  } catch (error) {
    next(error);
  }
}

export async function deleteUserById(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const id = parseInt(req.params.id);
    const deletedUser = await UserService.deleteUserById(id);
    res.status(HttpStatusCodes.OK).json(deletedUser);
  } catch (error) {
    next(error);
  }
}

export async function myProfile(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const email = req.user.email;
    const user = await UserService.findUserByEmail(email);
    res.status(HttpStatusCodes.OK).json(user);
  } catch (error) {
    next(error);
  }
}
