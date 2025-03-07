import { inject, injectable } from "tsyringe";
import { IClientRepository } from "./../../entities/repositoryInterfaces/client/client-repository.interface";
import { IBlackListTokenUseCase } from "./../../entities/useCaseInterfaces/auth/blacklist-token-usecase.interface";
import { IRevokeRefreshTokenUseCase } from "./../../entities/useCaseInterfaces/auth/revoke-refresh-token-usecase.interface";
import { CustomRequest } from "./auth.middleware";
import { NextFunction, Response } from "express";
import { ERROR_MESSAGES, HTTP_STATUS } from "../../shared/constants";
import { clearAuthCookies } from "../../shared/utils/cookieHelper";

@injectable()
export class BlockStatusMiddleware {
	constructor(
		@inject("IClientRepository")
		private clientRepository: IClientRepository,
		@inject("IBlackListTokenUseCase")
		private blacklistTokenUseCase: IBlackListTokenUseCase,
		@inject("IRevokeRefreshTokenUseCase")
		private revokeTokenUseCase: IRevokeRefreshTokenUseCase
	) {}
	async checkStatus(req: CustomRequest, res: Response, next: NextFunction) {
		try {
			if (!req.user) {
				res.status(HTTP_STATUS.UNAUTHORIZED).json({
					status: "error",
					message: "Unauthorized: No user found in request",
				});
				return;
			}
			const { id, role } = req.user;
			let status: string | undefined = "active";
			if (role === "client") {
				const client = await this.clientRepository.findById(id);
				if (!client) {
					res.status(HTTP_STATUS.NOT_FOUND).json({
						success: false,
						message: "Client not found",
					});
					return;
				}
				status = client.status;
			} else {
				res.status(HTTP_STATUS.BAD_REQUEST).json({
					success: false,
					message: ERROR_MESSAGES.INVALID_ROLE,
				});
				return;
			}
			if (status !== "active") {
				await this.blacklistTokenUseCase.execute(req.user.access_token);

				await this.revokeTokenUseCase.execute(req.user.refresh_token);

				const accessTokenName = `${role}_access_token`;
				const refreshTokenName = `${role}_refresh_token`;
				clearAuthCookies(res, accessTokenName, refreshTokenName);
				res.status(HTTP_STATUS.FORBIDDEN).json({
					success: false,
					message: "Access denied: Your account has been blocked",
				});
				return;
			}
		} catch (error) {
			console.log("Block Status MiddleWare Error: ", error);
			res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
				success: false,
				message: "Internal server error while checking blocked status",
			});
			return;
		}
	}
}
