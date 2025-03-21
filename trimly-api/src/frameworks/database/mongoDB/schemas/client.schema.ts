import { Schema } from "mongoose";
import { IClientModel } from "../models/client.model";
import { ROLES } from "@/shared/constants";

export const clientSchema = new Schema<IClientModel>(
	{
		userId: { type: String, required: true },
		firstName: { type: String, required: true },
		lastName: { type: String },
		email: { type: String, required: true, unique: true },
		password: {
			type: String,
		},
		role: { type: String, enum: ROLES, required: true },
		profileImage: { type: String },
		phoneNumber: {
			type: String,
		},
		googleId: { type: String },
		status: { type: String, default: "active" },
		location: {
			name: { type: String, required: false },
			latitude: { type: Number, required: false },
			longitude: { type: Number, required: false },
		},
	},
	{
		timestamps: true,
	}
);
