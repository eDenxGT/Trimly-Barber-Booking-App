import { IBarberShopEntity } from "@/entities/models/barber-shop.entity";

export interface IRegisterShopUseCase {
	execute(data: Partial<IBarberShopEntity>): Promise<void>;
}
