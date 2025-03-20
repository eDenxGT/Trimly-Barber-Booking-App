import { IBarberShopEntity } from "@/entities/models/barber-shop.entity";

export interface IShopRepository {
	save(data: Partial<IBarberShopEntity>): Promise<void>;
}
