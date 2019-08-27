import express, { Request, Response } from "express";
const router = express.Router();

// @route POST api/users
// @desc Register a user
// @access Public

router.post("/", (req: Request, res: Response) => {
  res.send("Register a user");
});
module.exports = router;
