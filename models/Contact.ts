import mongoose, { Schema, Document } from "mongoose";

export interface IContact extends Document {
  name: string;
  email: string;
  phone: string;
  type: string;
  user: string;
}

const ContactSchema: Schema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
  },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  type: { type: String, default: "personal" },
  date: { type: Date, default: Date.now }
});

export default mongoose.model<IContact>("contact", ContactSchema);
