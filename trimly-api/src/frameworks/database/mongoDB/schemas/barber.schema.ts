import { Schema } from "mongoose";
import { IBarberModel } from "../models/barber.model";
import { ROLES } from "@/shared/constants";

export const barberSchema = new Schema<IBarberModel>(
	{
		userId: { type: String, required: true },
		firstName: { type: String, required: true },
		lastName: { type: String },
		email: { type: String, required: true, unique: true },
		password: {
			type: String,
		},
		role: { type: String, enum: ROLES, required: true },
		googleId: { type: String },
		shopId: { type: String, default: null },
		isOwner: { type: Boolean, default: false },
		profileImage: { type: String },
		phoneNumber: {
			type: String,
		},
		status: { type: String, default: "active" },
	},
	{
		timestamps: true,
	}
);
