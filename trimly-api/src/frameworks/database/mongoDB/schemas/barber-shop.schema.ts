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
			enum: ["wallet", "direct"],
			default: "wallet",
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
	},
	{ timestamps: true }
);
