import { inject, injectable } from "tsyringe";
import { IRegisterStrategy } from "./register-strategies/register-strategy.interface";
import { IRegisterUserUseCase } from "../../entities/useCaseInterfaces/auth/register-usecase.interface";
import { UserDTO } from "../../shared/dtos/user.dto";
import { CustomError } from "../../entities/utils/custom.error";
import { ERROR_MESSAGES, HTTP_STATUS } from "../../shared/constants";

@injectable()
export class RegisterUserUseCase implements IRegisterUserUseCase {
	private strategies: Record<string, IRegisterStrategy>;
	constructor(
		@inject("ClientRegisterStrategy")
		private clientRegister: IRegisterStrategy,
		@inject("BarberRegisterStrategy")
		private barberRegister: IRegisterStrategy
	) {
		this.strategies = {
			client: this.clientRegister,
			barber: this.barberRegister
		};
	}

	async execute(user: UserDTO): Promise<void> {
		const strategy = this.strategies[user.role];
		if (!strategy) {
			throw new CustomError(
				ERROR_MESSAGES.INVALID_ROLE,
				HTTP_STATUS.FORBIDDEN
			);
		}
		await strategy.register(user);
	}
}
