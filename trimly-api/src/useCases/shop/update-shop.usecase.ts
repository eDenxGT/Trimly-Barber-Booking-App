import { inject, injectable } from "tsyringe";
import { IBarberShopEntity } from "@/entities/models/barber-shop.entity";
import { IUpdateShopUseCase } from "@/entities/useCaseInterfaces/shop/update-shop-usecase.interface";
import { IShopRepository } from "@/entities/repositoryInterfaces/shop/shop-repository.interface";

@injectable()
export class UpdateShopUseCase implements IUpdateShopUseCase {
	constructor(
		@inject("IShopRepository") private _shopRepository: IShopRepository
	) {}
	async execute(
		id: string,
		updateData: Partial<IBarberShopEntity>
	): Promise<IBarberShopEntity | null> {
		const barberShop = await this._shopRepository.findByIdAndUpdate(
			id,
			updateData
		);
		if (!barberShop) return null;
		
		return barberShop;
	}
}
