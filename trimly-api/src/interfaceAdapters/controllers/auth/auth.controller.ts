import { inject, injectable } from "tsyringe";
import { IAuthController } from "@/entities/controllerInterfaces/auth-controller.interface";
import { IGoogleUseCase } from "@/entities/useCaseInterfaces/auth/google-usecase";
import { IGenerateTokenUseCase } from "@/entities/useCaseInterfaces/auth/generate-token-usecase.interface";
import { setAuthCookies } from "@/shared/utils/cookieHelper";
import { HTTP_STATUS, SUCCESS_MESSAGES } from "@/shared/constants";
import { handleErrorResponse } from "@/shared/utils/errorHandler";

@injectable()
export class AuthController implements IAuthController {
	constructor(
		@inject("IGoogleUseCase")
		private googleUseCase: IGoogleUseCase,
		@inject("IGenerateTokenUseCase")
		private generateTokenUseCase: IGenerateTokenUseCase
	) {}
	async googleAuth(req: any, res: any): Promise<void> {
		try {
			const { credential, client_id, role } = req.body;
			const user = await this.googleUseCase.execute(
				credential,
				client_id,
				role
			);
			if (!user.id || !user.email || !user.role) {
				throw new Error("User ID, email, or role is missing");
			}

			const tokens = await this.generateTokenUseCase.execute(
				user.id,
				user.email,
				user.role
			);

			const accessTokenName = `${user.role}_access_token`;
			const refreshTokenName = `${user.role}_refresh_token`;

			setAuthCookies(
				res,
				tokens.accessToken,
				tokens.refreshToken,
				accessTokenName,
				refreshTokenName
			);
			console.log(user);
			res.status(HTTP_STATUS.OK).json({
				success: true,
				message: SUCCESS_MESSAGES.LOGIN_SUCCESS,
				user: user,
			});
		} catch (error) {
			handleErrorResponse(res, error);
		}
	}
}
