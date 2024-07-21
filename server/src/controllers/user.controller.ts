import { Request, Response } from "express";
import * as UserService from "../services/user.service";

export async function createUser(req: Request, res: Response) {
  const user = req.body;
  const localFilePath: any = req.files;
  user.profile_picture = localFilePath.profile_picture[0].path;
  await UserService.createUser({...user, is_admin: true});
  res.status(201).json({ message: "User created successfully" });
}
