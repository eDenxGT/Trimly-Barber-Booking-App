import { inject, injectable } from "tsyringe";
import { IUpdateUserDetailsUseCase } from "@/entities/useCaseInterfaces/users/update-user-details-usecase.interface";
import { IClientRepository } from "@/entities/repositoryInterfaces/client/client-repository.interface";
import { IBarberRepository } from "@/entities/repositoryInterfaces/barber/barber-repository.interface";
import { IAdminRepository } from "@/entities/repositoryInterfaces/admin/admin-repository.interface";
import { ERROR_MESSAGES, HTTP_STATUS } from "@/shared/constants";
import { CustomError } from "@/entities/utils/custom.error";
import { UserDTO } from "@/shared/dtos/user.dto";
import { IAdminEntity } from "@/entities/models/admin.entity";
import { IClientEntity } from "@/entities/models/client.entity";
import { IBarberEntity } from "@/entities/models/barber.entity";

@injectable()
export class UpdateUserDetailsUseCase implements IUpdateUserDetailsUseCase {
	constructor(
		@inject("IClientRepository")
		private _clientRepository: IClientRepository,
		@inject("IBarberRepository")
		private _barberRepository: IBarberRepository,
		@inject("IAdminRepository") private _adminRepository: IAdminRepository
	) {}
	async execute(
		userId: string,
		role: string,
		userDetails: Record<string, any>
	): Promise<IAdminEntity | IClientEntity | IBarberEntity | null> {
		let repository;

		if (role === "client") {
			repository = this._clientRepository;
		} else if (role === "barber") {
			repository = this._barberRepository;
		} else if (role === "admin") {
			repository = this._adminRepository;
		} else {
			throw new CustomError(
				ERROR_MESSAGES.INVALID_ROLE,
				HTTP_STATUS.BAD_REQUEST
			);
		}
		const user = await repository.findByIdAndUpdate(userId, userDetails);
		if (!user) {
			throw new CustomError(
				ERROR_MESSAGES.USER_NOT_FOUND,
				HTTP_STATUS.NOT_FOUND
			);
		}
		return user;
	}
}
