import { inject, injectable } from "tsyringe";
import { IBarberShopEntity } from "@/entities/models/barber-shop.entity";
import { IRegisterShopUseCase } from "@/entities/useCaseInterfaces/shop/register-shop-usecase.interface";
import { generateUniqueId } from "@/frameworks/security/uniqueuid.bcrypt";
import { IShopRepository } from "@/entities/repositoryInterfaces/shop/shop-repository.interface";
import { CustomError } from "@/entities/utils/custom.error";
import { ERROR_MESSAGES, HTTP_STATUS } from "@/shared/constants";

@injectable()
export class RegisterShopUseCase implements IRegisterShopUseCase {
	constructor(
		@inject("IShopRepository") private _shopRepository: IShopRepository
	) {}
	async execute(data: Partial<IBarberShopEntity>): Promise<void> {
		const barberShop = await this._shopRepository.findByBarberId(
			data.owner as string
		);
		if (barberShop) {
			if (barberShop.status === "pending") {
				throw new CustomError(
					ERROR_MESSAGES.SHOP_UNDER_VERIFICATION,
					HTTP_STATUS.BAD_REQUEST
				);
			} else {
				throw new CustomError(
					ERROR_MESSAGES.SHOP_EXISTS,
					HTTP_STATUS.BAD_REQUEST
				);
			}
		}
		data.shopId = generateUniqueId("barber-shop");
		await this._shopRepository.save(data);
	}
}
