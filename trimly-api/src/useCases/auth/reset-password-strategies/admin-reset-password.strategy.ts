import { inject, injectable } from "tsyringe";
import { IAdminRepository } from "@/entities/repositoryInterfaces/admin/admin-repository.interface";
import { ITokenService } from "@/entities/services/token-service.interface";
import { IRedisTokenRepository } from "@/entities/repositoryInterfaces/redis/redis-token-repository.interface";
import { IBcrypt } from "@/frameworks/security/bcrypt.interface";
import { ResetTokenPayload } from "@/interfaceAdapters/services/jwt.service";
import { CustomError } from "@/entities/utils/custom.error";
import { ERROR_MESSAGES, HTTP_STATUS } from "@/shared/constants";
import { IResetPasswordStrategy } from "./reset-password-strategy.interface";

@injectable()
export class AdminResetPasswordStrategy implements IResetPasswordStrategy {
	constructor(
		@inject("IAdminRepository")
		private adminRepository: IAdminRepository,
		@inject("ITokenService") private tokenService: ITokenService,
		@inject("IRedisTokenRepository")
		private redisTokenRepository: IRedisTokenRepository,
		@inject("IPasswordBcrypt") private passwordBcrypt: IBcrypt
	) {}
	async resetPassword(password: string, token: string): Promise<void> {
		const payload = this.tokenService.verifyResetToken(
			token
		) as ResetTokenPayload;
		if (!payload || !payload.email) {
			throw new CustomError(
				ERROR_MESSAGES.INVALID_TOKEN,
				HTTP_STATUS.BAD_REQUEST
			);
		}
		const email = payload.email;
		const admin = await this.adminRepository.findByEmail(email);

		if (!admin) {
			throw new CustomError(
				ERROR_MESSAGES.USER_NOT_FOUND,
				HTTP_STATUS.NOT_FOUND
			);
		}

		const tokenValid = await this.redisTokenRepository.verifyResetToken(
			admin.id ?? "",
			token
		);

		if (!tokenValid) {
			throw new CustomError(
				ERROR_MESSAGES.INVALID_TOKEN,
				HTTP_STATUS.BAD_REQUEST
			);
		}

		const isSamePasswordAsOld = await this.passwordBcrypt.compare(
			password,
			admin.password
		);
		if (isSamePasswordAsOld) {
			throw new CustomError(
				ERROR_MESSAGES.SAME_CURR_NEW_PASSWORD,
				HTTP_STATUS.BAD_REQUEST
			);
		}

		const hashedPassword = await this.passwordBcrypt.hash(password);

		await this.adminRepository.updateByEmail(email, {
			password: hashedPassword,
		});

		await this.redisTokenRepository.deleteResetToken(admin.id ?? "");
	}
}
