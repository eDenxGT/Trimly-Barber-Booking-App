import { inject, injectable } from "tsyringe";
import { LoginUserDTO } from "@/shared/dtos/user.dto";
import { ILoginStrategy } from "./login-strategy.interface";
import { IBarberEntity } from "@/entities/models/barber.entity";
import { IBarberRepository } from "@/entities/repositoryInterfaces/barber/barber-repository.interface";
import { CustomError } from "@/entities/utils/custom.error";
import { ERROR_MESSAGES, HTTP_STATUS } from "@/shared/constants";
import { IBcrypt } from "@/frameworks/security/bcrypt.interface";

@injectable()
export class BarberLoginStrategy implements ILoginStrategy {
	constructor(
		@inject("IBarberRepository")
		private barberRepository: IBarberRepository,
		@inject("IPasswordBcrypt") private passwordBcrypt: IBcrypt
	) {}
	async login(user: LoginUserDTO): Promise<Partial<IBarberEntity>> {
		const barber = await this.barberRepository.findByEmail(user.email);
		if (!barber) {
			throw new CustomError(
				ERROR_MESSAGES.USER_NOT_FOUND,
				HTTP_STATUS.NOT_FOUND
			);
		}console.log(barber)
		if (barber.status !== "active") {
			throw new CustomError(
				ERROR_MESSAGES.BLOCKED,
				HTTP_STATUS.FORBIDDEN
			);
		}
		if (user.password) {
			const isPasswordMatch = await this.passwordBcrypt.compare(
				user.password,
				barber.password
			);
			if (!isPasswordMatch) {
				throw new CustomError(
					ERROR_MESSAGES.INVALID_CREDENTIALS,
					HTTP_STATUS.BAD_REQUEST
				);
			}
		}
		return barber;
	}
}
