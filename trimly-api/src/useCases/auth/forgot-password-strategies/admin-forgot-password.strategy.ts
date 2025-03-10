import { inject, injectable } from "tsyringe";
import { IForgotPasswordStrategy } from "./forgot-password-strategy.interface";
import { CustomError } from "@/entities/utils/custom.error";
import { ERROR_MESSAGES, HTTP_STATUS } from "@/shared/constants";
import { ITokenService } from "@/entities/services/token-service.interface";
import { IRedisTokenRepository } from "@/entities/repositoryInterfaces/redis/redis-token-repository.interface";
import { IEmailService } from "@/entities/services/email-service.interface";
import { config } from "@/shared/config";
import { IAdminRepository } from "@/entities/repositoryInterfaces/admin/admin-repository.interface";

@injectable()
export class AdminForgotPasswordStrategy implements IForgotPasswordStrategy {
	constructor(
		@inject("IAdminRepository")
		private adminRepository: IAdminRepository,
		@inject("ITokenService") private tokenService: ITokenService,
		@inject("IRedisTokenRepository")
		private redisTokenRepository: IRedisTokenRepository,
		@inject("IEmailService") private emailService: IEmailService
	) {}
	async forgotPassword(email: string): Promise<void> {
		const admin = await this.adminRepository.findByEmail(email);
		if (!admin) {
			throw new CustomError(
				ERROR_MESSAGES.EMAIL_NOT_FOUND,
				HTTP_STATUS.NOT_FOUND
			);
		}
		const resetToken = this.tokenService.generateResetToken(email);

		try {
			await this.redisTokenRepository.storeResetToken(
				admin.id ?? "",
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
			`/admin/reset-password/${resetToken}`,
			config.cors.ALLOWED_ORIGIN
		).toString();

		await this.emailService.sendResetEmail(
			email,
			"Trimly - Reset your password",
			resetUrl
		);
	}
}
