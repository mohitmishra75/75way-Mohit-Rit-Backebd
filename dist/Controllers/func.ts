import { Request, Response } from "express";

export const func = (req: Request, res: Response): void => {
  res.send("hello world");
};
