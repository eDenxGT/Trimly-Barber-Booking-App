import { inject, injectable } from "tsyringe";
import { IAdminEntity } from "@/entities/models/admin.entity";
import { IBarberEntity } from "@/entities/models/barber.entity";
import { IClientEntity } from "@/entities/models/client.entity";
import { IAdminRepository } from "@/entities/repositoryInterfaces/admin/admin-repository.interface";
import { IBarberRepository } from "@/entities/repositoryInterfaces/barber/barber-repository.interface";
import { IClientRepository } from "@/entities/repositoryInterfaces/client/client-repository.interface";
import { IGetUserDetailsUseCase } from "@/entities/useCaseInterfaces/users/get-user-details-usecase.interface";
import { CustomError } from "@/entities/utils/custom.error";
import { ERROR_MESSAGES, HTTP_STATUS } from "@/shared/constants";

@injectable()
export class GetUserDetailsUseCase implements IGetUserDetailsUseCase {
	constructor(
		@inject("IClientRepository")
		private _clientRepository: IClientRepository,
		@inject("IBarberRepository")
		private _barberRepository: IBarberRepository,
		@inject("IAdminRepository") private _adminRepository: IAdminRepository
	) {}
	async execute({
		userEmail,
		userId,
		role,
	}: {
		userEmail?: string;
		userId?: string;
		role: string;
	}): Promise<IAdminEntity | IClientEntity | IBarberEntity | null> {
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
		if (userEmail) {
			const user = await repository.findByEmail(userEmail as string);
			if (!user) {
				throw new CustomError(
					ERROR_MESSAGES.USER_NOT_FOUND,
					HTTP_STATUS.NOT_FOUND
				);
			}
			return user;
		}
		if (userId) {
			const user = await repository.findByUserId(userId as string);
			if (!user) {
				throw new CustomError(
					ERROR_MESSAGES.USER_NOT_FOUND,
					HTTP_STATUS.NOT_FOUND
				);
			}
			return user;
		}

		return null;
	}
}
