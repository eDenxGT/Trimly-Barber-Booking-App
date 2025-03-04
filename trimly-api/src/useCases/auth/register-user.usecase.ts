import { inject, injectable } from "tsyringe";
import { IRegisterStrategy } from "./register-strategies/register-strategy.interface";
import { IRegisterUserUseCase } from "../../entities/useCaseInterfaces/auth/register-usecase.interface";
import { UserDTO } from "../../shared/dtos/user.dto";
import { CustomError } from "../../entities/utils/custom.error";
import { HTTP_STATUS } from "../../shared/constants";

@injectable()
export class RegisterUserUseCase implements IRegisterUserUseCase {
	private strategies: Record<string, IRegisterStrategy>;
	constructor(
		@inject("ClientRegisterStrategy")
		private clientRegister: IRegisterStrategy
	) {
		this.strategies = {
			client: this.clientRegister,
		};
	}

	async execute(user: UserDTO): Promise<void> {
		const strategy = this.strategies[user.role];
		if (!strategy) {
			throw new CustomError("Invalid user role", HTTP_STATUS.FORBIDDEN);
		}
		await strategy.register(user);
	}
}
