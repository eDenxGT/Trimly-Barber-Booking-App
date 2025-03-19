import { IBarberShopEntity } from "@/entities/models/barber-shop.entity";
import { model, ObjectId } from "mongoose";
import { barberShopSchema } from "../schemas/barber-shop.schema";

export interface IBarberShopModel
	extends Omit<IBarberShopEntity, "id">,
		Document {
	_id: ObjectId;
}

export const BarberShopModel = model<IBarberShopModel>(
	"BarberShop",
	barberShopSchema
);
