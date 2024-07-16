import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return res.status(401).send({ error: "Authentication required" });
  }

  try {
    const decoded = jwt.verify(token, "123");
    req.user = decoded;
    next();
  } catch (e) {
    res.status(401).send({ error: "Invalid token" });
  }
};

export default authMiddleware;
