import { inject, injectable } from "tsyringe";
import { PaginatedUsers } from "@/entities/models/paginated-users.entity";
import { IGetAllUsersUseCase } from "@/entities/useCaseInterfaces/users/get-all-users-usecase.interface";
import { IClientRepository } from "@/entities/repositoryInterfaces/client/client-repository.interface";
import { IBarberRepository } from "@/entities/repositoryInterfaces/barber/barber-repository.interface";
import { CustomError } from "@/entities/utils/custom.error";
import { HTTP_STATUS } from "@/shared/constants";

@injectable()
export class GetAllUsersUseCase implements IGetAllUsersUseCase {
	constructor(
		@inject("IClientRepository")
		private clientRepository: IClientRepository,
		@inject("IBarberRepository") private barberRepository: IBarberRepository
	) {}
	async execute(
		userType: string,
		pageNumber: number,
		pageSize: number,
		searchTerm: string
	): Promise<PaginatedUsers> {
		let filter: any = {};
		if (userType) {
			filter.role = userType;
		}

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
		if (userType === "client") {
			const { user, total } = await this.clientRepository.find(
				filter,
				skip,
				limit
			);

			const response: PaginatedUsers = {
				user,
				total: Math.ceil(total / validPageSize),
			};

			return response;
		}
		if (userType === "barber") {
			const { user, total } = await this.barberRepository.find(
				filter,
				skip,
				limit
			);

			const response: PaginatedUsers = {
				user,
				total: Math.ceil(total / validPageSize),
			};

			return response;
		}

		throw new CustomError(
			"Invalid user type. Expected 'client' or 'vendor'.",
			HTTP_STATUS.BAD_REQUEST
		);
	}
}
