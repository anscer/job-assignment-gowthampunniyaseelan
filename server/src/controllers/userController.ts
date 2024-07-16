import { Request, Response } from "express";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import { User, IUser } from "../models/userModel";

export const register = async (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, password } = req.body;

  try {
    const user: IUser = new User({ username, password });
    await user.save();
    res.status(201).send({ username });
  } catch (error: any) {
    console.log(error.message);

    res.status(500).send({ error: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).send({ message: "Invalid username or password" });
    }

    const token = jwt.sign({ id: user._id }, "123", { expiresIn: "1h" });
    res.send({ token });
  } catch (error: any) {
    res.status(500).send({ error: error.message });
  }
};
