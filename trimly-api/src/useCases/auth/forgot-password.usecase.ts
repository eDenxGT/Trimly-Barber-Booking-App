import { inject, injectable } from "tsyringe";
import { IForgotPasswordUseCase } from "@/entities/useCaseInterfaces/auth/forgot-password-usecase.interface";
import { IForgotPasswordStrategy } from "./forgot-password-strategies/forgot-password-strategy.interface";
import { CustomError } from "@/entities/utils/custom.error";
import { ERROR_MESSAGES, HTTP_STATUS } from "@/shared/constants";

@injectable()
export class ForgotPasswordUseCase implements IForgotPasswordUseCase {
	private strategies: Record<string, IForgotPasswordStrategy>;
	constructor(
		@inject("ClientForgotPasswordStrategy")
		private clientForgotPassword: IForgotPasswordStrategy
	) {
		this.strategies = {
			client: clientForgotPassword,
		};
	}
	async execute({
		email,
		role,
	}: {
		email: string;
		role: string;
	}): Promise<void> {
		const strategy = this.strategies[role];
		if (!strategy) {
			throw new CustomError(
				ERROR_MESSAGES.INVALID_ROLE,
				HTTP_STATUS.FORBIDDEN
			);
		}
		await strategy.forgotPassword(email);
	}
}
