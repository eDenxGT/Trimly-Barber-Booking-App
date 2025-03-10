import { inject, injectable } from "tsyringe";
import { IForgotPasswordStrategy } from "./forgot-password-strategy.interface";
import { IClientRepository } from "@/entities/repositoryInterfaces/client/client-repository.interface";
import { CustomError } from "@/entities/utils/custom.error";
import { ERROR_MESSAGES, HTTP_STATUS } from "@/shared/constants";
import { ITokenService } from "@/entities/services/token-service.interface";
import { IRedisTokenRepository } from "@/entities/repositoryInterfaces/redis/redis-token-repository.interface";
import { IEmailService } from "@/entities/services/email-service.interface";
import { config } from "@/shared/config";

@injectable()
export class ClientForgotPasswordStrategy implements IForgotPasswordStrategy {
	constructor(
		@inject("IClientRepository")
		private clientRepository: IClientRepository,
		@inject("ITokenService") private tokenService: ITokenService,
		@inject("IRedisTokenRepository")
		private redisTokenRepository: IRedisTokenRepository,
		@inject("IEmailService") private emailService: IEmailService
	) {}
	async forgotPassword(email: string): Promise<void> {
		const client = await this.clientRepository.findByEmail(email);
		if (!client) {
			throw new CustomError(
				ERROR_MESSAGES.EMAIL_NOT_FOUND,
				HTTP_STATUS.NOT_FOUND
			);
		}
		const resetToken = this.tokenService.generateResetToken(email);

		try {
			await this.redisTokenRepository.storeResetToken(
				client.id ?? "",
				resetToken
			);
		} catch (error) {
			console.error("Failed to store reset token in Redis:", error);
			throw new CustomError(
				ERROR_MESSAGES.SERVER_ERROR,
				HTTP_STATUS.INTERNAL_SERVER_ERROR
			);
		}
		const resetUrl = new URL(
			`/reset-password/${resetToken}`,
			config.cors.ALLOWED_ORIGIN
		).toString();

		await this.emailService.sendResetEmail(
			email,
			"Trimly - Reset your password",
			resetUrl
		);
	}
}
