import { Schema } from "mongoose";
import { IBarberShopModel } from "../models/barber-shop.model";

export const barberShopSchema = new Schema<IBarberShopModel>(
	{
		shopId: {
			type: String,
			required: true,
		},
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
			default: "shop_wallet",
		},
		description: { type: String },
		email: { type: String },
		contactNumber: { type: String },
		bannerImage: String,
		logoImage: String,
		address: {
			display: { type: String },
			street: { type: String },
			city: { type: String },
			state: { type: String },
			country: { type: String },
			zipCode: { type: String },
			location: {
				latitude: { type: Number, required: true },
				longitude: { type: Number, required: true },
			},
		},
		status: {
			type: String,
			enum: ["active", "pending", "blocked"],
			default: "pending",
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
		amenities: {
			wifi: { type: Boolean },
			parking: { type: Boolean },
		},
		daysOpen: [{ type: String }],
		openingTime: { type: String },
		closingTime: { type: String },
		createdBy: { type: String, required: true },
		approvedBy: { type: String },
	},
	{ timestamps: true }
);
