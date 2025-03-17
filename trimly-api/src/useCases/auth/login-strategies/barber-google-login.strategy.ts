import { inject, injectable } from "tsyringe";
import { ILoginStrategy } from "./login-strategy.interface";
import { IUserEntity } from "@/entities/models/user.entity";
import { LoginUserDTO } from "@/shared/dtos/user.dto";
import { ERROR_MESSAGES, HTTP_STATUS } from "@/shared/constants";
import { CustomError } from "@/entities/utils/custom.error";
import { IBarberRepository } from "@/entities/repositoryInterfaces/barber/barber-repository.interface";

@injectable()
export class BarberGoogleLoginStrategy implements ILoginStrategy {
	constructor(
		@inject("IBarberRepository") private barberRepository: IBarberRepository
	) {}
	async login(user: LoginUserDTO): Promise<Partial<IUserEntity>> {
		const barber = await this.barberRepository.findByEmail(user.email);
		if (barber) {
			if (barber.status !== "active") {
				throw new CustomError(
					ERROR_MESSAGES.BLOCKED,
					HTTP_STATUS.FORBIDDEN
				);
			}
		}

		return barber as Partial<IUserEntity>;
	}
}
