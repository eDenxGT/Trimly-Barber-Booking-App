import { inject, injectable } from "tsyringe";
import { IForgotPasswordStrategy } from "./forgot-password-strategy.interface";
import { IClientRepository } from "@/entities/repositoryInterfaces/client/client-repository.interface";
import { CustomError } from "@/entities/utils/custom.error";
import { ERROR_MESSAGES, HTTP_STATUS } from "@/shared/constants";
import { ITokenService } from "@/entities/services/token-service.interface";

@injectable()
export class ClientForgotPasswordStrategy implements IForgotPasswordStrategy {
	constructor(
		@inject("IClientRepository")
		private clientRepository: IClientRepository,
		@inject("ITokenService") private tokenService: ITokenService
	) {}
	async forgotPassword(email: string): Promise<void> {
		const client = await this.clientRepository.findByEmail(email);
		if (!client) {
			throw new CustomError(
				ERROR_MESSAGES.EMAIL_NOT_FOUND,
				HTTP_STATUS.NOT_FOUND
			);
		}
      this.tokenService.
	}
}
