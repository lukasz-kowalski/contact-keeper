import express, { Request, Response } from "express";
import connectDB from "./config/db";

const app = express();

// Connect Database

connectDB();

// Init Middleware

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.json({ msg: "Welcome to the ContactKeeper API" });
});

app.use("/api/auth", require("./routes/auth"));
app.use("/api/contacts", require("./routes/contacts"));
app.use("/api/users", require("./routes/users"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
