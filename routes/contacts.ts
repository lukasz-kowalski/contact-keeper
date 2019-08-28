import express from "express";
import { check, validationResult } from "express-validator";
import { Request, Response } from "express-serve-static-core";
import User from "../models/User";
import { AuthRequest } from "../middleware/auth";
import Contact, { IContact } from "../models/Contact";
import { IDictionary } from "../types/interfaces";
const auth = require("../middleware/auth");
const router = express.Router();

declare module "express-serve-static-core" {
  interface Request {
    user: {
      id: string;
    };
  }
}

type Entry = [string, any];

// @route GET api/contacts
// @desc Get all users contacts
// @access Private

router.get("/", auth, async (req: Request, res: Response) => {
  try {
    const contacts: IContact[] | null = await Contact.find({
      user: req.user.id
    }).sort({
      date: -1
    });
    res.json(contacts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route POST api/contacts
// @desc Add new contact
// @access Private

router.post(
  "/",
  [
    auth,
    [
      check("name", "Name is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, phone, type } = req.body;

    try {
      const newContact = new Contact({
        name,
        email,
        phone,
        type,
        user: req.user.id
      });

      const contact = await newContact.save();

      res.json(contact);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ errors: ["Server Error"] });
    }
  }
);

// @route PUT api/contacts/:id
// @desc Update contact
// @access Private

router.put("/:id", auth, async (req: Request, res: Response) => {
  const bodyEtries = Object.entries(req.body);
  const contactFields: IDictionary = {};

  bodyEtries.forEach((entry: Entry) => {
    const [key, value]: Entry = entry;
    contactFields[key] = value;
  });

  try {
    let contact: IContact | null = await Contact.findById(req.params.id);

    if (!contact)
      return res.status(404).json({ errors: ["Contact not found"] });

    // Make sure user owns contact

    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ errors: ["Not authorized"] });
    }

    contact = await Contact.findByIdAndUpdate(
      req.params.id,
      {
        $set: contactFields
      },
      { new: true }
    );

    res.json(contact);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ errors: ["Server Error"] });
  }
});

// @route DELETE api/contacts/:id
// @desc Delete contact
// @access Private

router.delete("/:id", auth, async (req: Request, res: Response) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact)
      return res.status(404).json({ errors: ["Contact not found"] });

    // Make sure user owns contact

    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ errors: ["Not authorized"] });
    }

    await Contact.findByIdAndRemove(req.params.id);
    res.send("Contact removed");
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ errors: ["Server Error"] });
  }
});

module.exports = router;
