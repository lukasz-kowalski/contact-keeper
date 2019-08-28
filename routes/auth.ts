import express, { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "config";
import { check, validationResult } from "express-validator";
import User, { IUser } from "../models/User";
const authMiddleware = require("../middleware/auth");

const router = express.Router();

declare module "express-serve-static-core" {
  interface Request {
    user: {
      id: string;
    };
  }
}

// @route GET api/auth
// @desc Get logged in user
// @access Private

router.get("/", authMiddleware, async (req: Request, res: Response) => {
  try {
    const user: IUser | null = await User.findById(req.user.id).select(
      "-password"
    );
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ errors: ["Server error"] });
  }
});

// @route POST api/auth
// @desc Auth user & get token
// @access Public

router.post(
  "/",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists()
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user: IUser | null = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ errors: ["Invalid credentials"] });
      }

      const isMatch: boolean = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ errors: ["Invalid credentials"] });
      }

      const payload = {
        user: { id: user.id }
      };

      const options = {
        expiresIn: 3600
      };

      const callback = (err: Error, token: string) => {
        if (err) throw err;

        res.json({ token });
      };

      jwt.sign(payload, config.get("jwtSecret"), options, callback);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ errors: ["Server Error"] });
    }
  }
);

module.exports = router;
