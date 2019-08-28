import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "config";

export interface AuthRequest extends Request {
  user: { id: string };
}

export interface DataStoredInToken {
  user: { id: string };
}

const auth = (req: AuthRequest, res: Response, next: NextFunction) => {
  // Get token from header
  const token = req.header("x-auth-token");

  // Check if there is no token
  if (!token) {
    return res.status(401).json({ errors: ["No token, authorization denied"] });
  }

  try {
    const decoded = jwt.verify(
      token,
      config.get("jwtSecret")
    ) as DataStoredInToken;

    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ errors: ["Token is not valid"] });
  }
};

module.exports = auth;
