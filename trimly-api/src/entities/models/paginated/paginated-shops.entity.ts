import { IBarberShopEntity } from "../barber-shop.entity";

export interface IPaginatedShops {
	shops: IBarberShopEntity[] | [];
	total: number;
}
