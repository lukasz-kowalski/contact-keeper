import express, { Request, Response } from "express";
const router = express.Router();

// @route GET api/auth
// @desc Get logged in user
// @access Private

router.get("/", (req: Request, res: Response) => {
  res.send("Get logged in user");
});

// @route POST api/auth
// @desc Auth user & get token
// @access Public

router.post("/", (req: Request, res: Response) => {
  res.send("Login user");
});

module.exports = router;
