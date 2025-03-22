import { IBarberShopEntity } from "@/entities/models/barber-shop.entity";
import { IPaginatedShops } from "@/entities/models/paginated/paginated-shops.entity";

export interface IShopRepository {
	save(data: Partial<IBarberShopEntity>): Promise<void>;
	find(filter: any, skip: number, limit: number): Promise<IPaginatedShops>;
	findByIdAndUpdate(
		id: any,
		updateData: Partial<IBarberShopEntity>
	): Promise<IBarberShopEntity | null>;
	findByBarberId(barberId: string): Promise<IBarberShopEntity | null>;
}
