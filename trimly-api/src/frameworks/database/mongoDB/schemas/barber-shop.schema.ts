import { Schema } from "mongoose";

export const barberShopSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		owner: {
			type: String,
			required: true,
		},
		barbers: [{ type: String }],
		paymentMode: {
			type: String,
			enum: ["shop_wallet", "direct_payment"],
			default: "wallet",
		},
		address: {
			street: { type: String },
			city: { type: String },
			state: { type: String },
			country: { type: String },
			zipCode: { type: String, required: true },
			location: {
				latitude: { type: Number, required: true },
				longitude: { type: Number, required: true },
			},
		},
		commissionPercentage: {
			type: Number,
			default: 10,
		},
		walletBalance: {
			type: Number,
			default: 0,
		},
		barberEarnings: {
			type: Map,
			of: Number,
			default: {},
		},
		openingHours: {
			type: [
				{
					day: { type: String, required: true },
					open: { type: String },
					close: { type: String },
					closed: { type: Boolean, default: false },
				},
			],
			default: [
				{ day: "Monday", open: "9:00 AM", close: "9:00 PM" },
				{ day: "Tuesday", open: "9:00 AM", close: "9:00 PM" },
				{ day: "Wednesday", open: "9:00 AM", close: "9:00 PM" },
				{ day: "Thursday", open: "9:00 AM", close: "9:00 PM" },
				{ day: "Friday", open: "9:00 AM", close: "9:00 PM" },
				{ day: "Saturday", open: "9:00 AM", close: "9:00 PM" },
				{ day: "Sunday", closed: true },
			],
		},
		createdBy: { type: String, required: true },
		approvedBy: { type: String },
	},
	{ timestamps: true }
);
