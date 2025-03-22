import { IBarberShopEntity } from "@/entities/models/barber-shop.entity";

export interface IUpdateShopUseCase {
	execute(id: string, updateData: Partial<IBarberShopEntity>): Promise<IBarberShopEntity | null>;
}
