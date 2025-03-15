import { Schema } from "mongoose";
import { IBarberModel } from "../models/barber.model";
import { ROLES } from "@/shared/constants";

export const barberSchema = new Schema<IBarberModel>(
	{
		userId: { type: String, required: true },
		firstName: { type: String, required: true },
		lastName: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		role: { type: String, enum: ROLES, required: true },
		shopId: { type: String, default: null },
      isOwner: {type: Boolean, default: false},
		profileImage: { type: String },
		phoneNumber: { type: String, required: true },
		status: { type: String, default: "active" },
	},
	{
		timestamps: true,
	}
);
