import { injectable } from "tsyringe";
import { IBarberShopEntity } from "@/entities/models/barber-shop.entity";
import { IShopRepository } from "@/entities/repositoryInterfaces/shop/shop-repository.interface";
import { BarberShopModel } from "@/frameworks/database/mongoDB/models/barber-shop.model";

@injectable()
export class ShopRepository implements IShopRepository {
	async save(data: Partial<IBarberShopEntity>): Promise<void> {
		await BarberShopModel.create(data);
	}
}
