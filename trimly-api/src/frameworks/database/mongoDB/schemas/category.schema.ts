import { Schema } from "mongoose";
import { ICategoryModel } from "../models/category.model";

export const categorySchema = new Schema<ICategoryModel>(
	{
		name: { type: String, required: true, unique: true },
		requestedBy: String,
		gender: {
			type: String,
			enum: ["Men", "Women", "Unisex"],
			required: true,
		},
		status: {
			type: String,
			enum: ["active", "blocked"],
			default: "active",
		},
	},
	{ timestamps: true }
);
