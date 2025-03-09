import { Schema } from "mongoose";
import { IClientModel } from "../models/client.model";
import { ROLES } from "@/shared/constants";

export const clientSchema = new Schema<IClientModel>(
  {
    clientId: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ROLES, required: true },
    profileImage: { type: String },
    phoneNumber: { type: String, required: true },
    status: { type: String, default: "active" },
  },
  {
    timestamps: true,
  }
);
