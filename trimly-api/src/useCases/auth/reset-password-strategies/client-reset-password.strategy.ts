import { inject, injectable } from "tsyringe";
import { IResetPasswordStrategy } from "./reset-password-strategy.interface";
import { IClientRepository } from "@/entities/repositoryInterfaces/client/client-repository.interface";
import { ITokenService } from "@/entities/services/token-service.interface";
import { IRedisTokenRepository } from "@/entities/repositoryInterfaces/redis/redis-token-repository.interface";
import { CustomError } from "@/entities/utils/custom.error";
import { ERROR_MESSAGES, HTTP_STATUS } from "@/shared/constants";
import { IBcrypt } from "@/frameworks/security/bcrypt.interface";
import { ResetTokenPayload } from "@/interfaceAdapters/services/jwt.service";

@injectable()
export class ClientResetPasswordStrategy implements IResetPasswordStrategy {
	constructor(
		@inject("IClientRepository")
		private clientRepository: IClientRepository,
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
		const client = await this.clientRepository.findByEmail(email);

		if (!client) {
			throw new CustomError(
				ERROR_MESSAGES.USER_NOT_FOUND,
				HTTP_STATUS.NOT_FOUND
			);
		}

		const tokenValid = await this.redisTokenRepository.verifyResetToken(
			client.id ?? "",
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
			client.password
		);
		if (isSamePasswordAsOld) {
			throw new CustomError(
				ERROR_MESSAGES.SAME_CURR_NEW_PASSWORD,
				HTTP_STATUS.BAD_REQUEST
			);
		}

		const hashedPassword = await this.passwordBcrypt.hash(password);

		await this.clientRepository.updateByEmail(email, {
			password: hashedPassword,
		});

		await this.redisTokenRepository.deleteResetToken(client.id ?? "");
	}
}
