import { Request, Response } from "express";
import * as UserService from "../services/user.service";

export async function createUser(req: Request, res: Response) {
  const user = req.body;
  const localFilePath: any = req.files;
  user.profile_picture = localFilePath.profile_picture[0].path;
  await UserService.createUser({ ...user, is_admin: true });
  res.status(201).json({ message: "User created successfully" });
}

export async function findUserByEmail(req: Request, res: Response) {
  const email = req.body.email;
  const user = await UserService.findUserByEmail(email);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.status(200).json(user);
}

export async function login(req: Request, res: Response) {
  try {
    const login = req.body;
    const token = await UserService.login(login);
    res.status(200).json({ accessToken: token });
  } catch (error: any) {
    res.status(400).json(error);
  }
}
