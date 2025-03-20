import { inject, injectable } from "tsyringe";
import { IBarberShopEntity } from "@/entities/models/barber-shop.entity";
import { IRegisterShopUseCase } from "@/entities/useCaseInterfaces/shop/register-shop-usecase.interface";
import { generateUniqueId } from "@/frameworks/security/uniqueuid.bcrypt";
import { IShopRepository } from "@/entities/repositoryInterfaces/shop/shop-repository.interface";

@injectable()
export class RegisterShopUseCase implements IRegisterShopUseCase {
   constructor(
      @inject("IShopRepository") private shopRepository: IShopRepository
   ) {}
	async execute(data: Partial<IBarberShopEntity>): Promise<void> {
      console.log(data)
      data.shopId = generateUniqueId("barber-shop")
      await this.shopRepository.save(data)
   }
}
