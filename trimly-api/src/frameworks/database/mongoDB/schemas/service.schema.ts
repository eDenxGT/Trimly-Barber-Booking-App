import { Schema } from "mongoose";
import { IServiceModel } from "../models/service.model";

export const serviceSchema = new Schema<IServiceModel>(
	{
		name: { type: String, required: true },
		categoryId: { type: String, required: true },
		barberId: { type: String, required: true },
		price: { type: Number, required: true },
		duration: { type: Number, required: true },
		description: { type: String },
		status: {
			type: String,
			enum: ["pending", "approved", "rejected", "blocked"],
			default: "pending",
		},
	},
	{ timestamps: true }
);
