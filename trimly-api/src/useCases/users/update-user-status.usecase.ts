import { inject, injectable } from "tsyringe";
import { ERROR_MESSAGES, HTTP_STATUS } from "../../shared/constants";
import client from "../../frameworks/cache/redis.client";
import { IClientRepository } from "@/entities/repositoryInterfaces/client/client-repository.interface";
import { IBarberRepository } from "@/entities/repositoryInterfaces/barber/barber-repository.interface";
import { IUpdateUserStatusUseCase } from "@/entities/useCaseInterfaces/users/update-user-status-usecase.interface";
import { CustomError } from "@/entities/utils/custom.error";

@injectable()
export class UpdateUserStatusUseCase implements IUpdateUserStatusUseCase {
	constructor(
		@inject("IClientRepository")
		private clientRepository: IClientRepository,
		@inject("IBarberRepository") private barberRepository: IBarberRepository
	) {}
	async execute(userType: string, userId: any): Promise<void> {
		if (userType === "client") {
			const user = await this.clientRepository.findById(userId);

			if (!user) {
				throw new CustomError(
					ERROR_MESSAGES.USER_NOT_FOUND,
					HTTP_STATUS.NOT_FOUND
				);
			}

			const newStatus = user.status === "active" ? "blocked" : "active";

			await this.clientRepository.findByIdAndUpdateStatus(
				userId,
				newStatus
			);
		} else if (userType === "barber") {
			const user = await this.barberRepository.findById(userId);

			if (!user) {
				throw new CustomError(
					ERROR_MESSAGES.USER_NOT_FOUND,
					HTTP_STATUS.NOT_FOUND
				);
			}

			const newStatus = user.status === "active" ? "blocked" : "active";

			await this.barberRepository.findByIdAndUpdateStatus(
				userId,
				newStatus
			);
		}
	}
}
