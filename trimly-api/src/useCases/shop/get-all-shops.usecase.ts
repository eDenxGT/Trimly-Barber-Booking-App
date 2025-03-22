import { inject, injectable } from "tsyringe";
import { IPaginatedShops } from "@/entities/models/paginated/paginated-shops.entity";
import { IGetAllShopsUseCase } from "@/entities/useCaseInterfaces/shop/get-all-shops-usecase.interface";
import { IShopRepository } from "@/entities/repositoryInterfaces/shop/shop-repository.interface";

@injectable()
export class GetAllShopsUseCase implements IGetAllShopsUseCase {
	constructor(
		@inject("IShopRepository") private _shopRepository: IShopRepository
	) {}
	async execute(
		forType: string,
		pageNumber: number,
		pageSize: number,
		searchTerm: string
	): Promise<IPaginatedShops> {
		let filter: any = {};
		if (searchTerm) {
			filter.$or = [
				{ firstName: { $regex: searchTerm, $options: "i" } },
				{ lastName: { $regex: searchTerm, $options: "i" } },
				{ email: { $regex: searchTerm, $options: "i" } },
			];
		}
		const validPageNumber = Math.max(1, pageNumber || 1);
		const validPageSize = Math.max(1, pageSize || 10);
		const skip = (validPageNumber - 1) * validPageSize;
		const limit = validPageSize;

      const { shops, total } = await this._shopRepository.find(
         {
             ...filter,
             status: forType === "non-active" ? { $ne: "active" } : "active"
         },
         skip,
         limit,
     );

		const response: IPaginatedShops = {
			shops,
			total: Math.ceil(total / validPageSize),
		};

		return response;
	}
}
