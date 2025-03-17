import { inject, injectable } from "tsyringe";
import { IAuthController } from "@/entities/controllerInterfaces/auth-controller.interface";
import { IGoogleUseCase } from "@/entities/useCaseInterfaces/auth/google-usecase";
import { IGenerateTokenUseCase } from "@/entities/useCaseInterfaces/auth/generate-token-usecase.interface";
import {
	clearAuthCookies,
	setAuthCookies,
	updateCookieWithAccessToken,
} from "@/shared/utils/cookieHelper";
import {
	ERROR_MESSAGES,
	HTTP_STATUS,
	SUCCESS_MESSAGES,
} from "@/shared/constants";
import { handleErrorResponse } from "@/shared/utils/errorHandler";
import { IForgotPasswordUseCase } from "@/entities/useCaseInterfaces/auth/forgot-password-usecase.interface";
import { Request, Response } from "express";
import { forgotPasswordValidationSchema } from "./validations/forgot-password.validation.schema";
import { ILoginUserUseCase } from "@/entities/useCaseInterfaces/auth/login-usecase.interface";
import { LoginUserDTO, UserDTO } from "@/shared/dtos/user.dto";
import { loginSchema } from "./validations/user-login.validation.schema";
import { IBlackListTokenUseCase } from "@/entities/useCaseInterfaces/auth/blacklist-token-usecase.interface";
import { IRevokeRefreshTokenUseCase } from "@/entities/useCaseInterfaces/auth/revoke-refresh-token-usecase.interface";
import { CustomRequest } from "@/interfaceAdapters/middlewares/auth.middleware";
import { IRefreshTokenUseCase } from "@/entities/useCaseInterfaces/auth/refresh-token-usecase.interface";
import { IRegisterUserUseCase } from "@/entities/useCaseInterfaces/auth/register-usecase.interface";
import { userSchemas } from "./validations/user-signup.validation.schema";
import { IResetPasswordUseCase } from "@/entities/useCaseInterfaces/auth/reset-password-usecase.interface";
import { resetPasswordValidationSchema } from "./validations/reset-password.validation.schema";
import { ISendOtpEmailUseCase } from "@/entities/useCaseInterfaces/auth/sent-otp-usecase.interface";
import { IVerifyOtpUseCase } from "@/entities/useCaseInterfaces/auth/verify-otp-usecase.interface";
import { otpMailValidationSchema } from "./validations/otp-mail.validation.schema";

@injectable()
export class AuthController implements IAuthController {
	constructor(
		@inject("IGoogleUseCase")
		private googleUseCase: IGoogleUseCase,
		@inject("ILoginUserUseCase")
		private loginUserUseCase: ILoginUserUseCase,
		@inject("IRefreshTokenUseCase")
		private refreshTokenUseCase: IRefreshTokenUseCase,
		@inject("IRegisterUserUseCase")
		private registerUserUseCase: IRegisterUserUseCase,
		@inject("IVerifyOtpUseCase")
		private verifyOtpUseCase: IVerifyOtpUseCase,
		@inject("IResetPasswordUseCase")
		private resetPasswordUseCase: IResetPasswordUseCase,
		@inject("ISendOtpEmailUseCase")
		private sendOtpEmailUseCase: ISendOtpEmailUseCase,
		@inject("IGenerateTokenUseCase")
		private generateTokenUseCase: IGenerateTokenUseCase,
		@inject("IForgotPasswordUseCase")
		private forgotPasswordUseCase: IForgotPasswordUseCase,
		@inject("IBlackListTokenUseCase")
		private blackListTokenUseCase: IBlackListTokenUseCase,
		@inject("IRevokeRefreshTokenUseCase")
		private revokeRefreshToken: IRevokeRefreshTokenUseCase
	) {}

	async googleAuth(req: Request, res: Response): Promise<void> {
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

	async forgotPassword(req: Request, res: Response): Promise<void> {
		try {
			const validatedData = forgotPasswordValidationSchema.parse(
				req.body
			);
			if (!validatedData) {
				res.status(HTTP_STATUS.BAD_REQUEST).json({
					success: false,
					message: ERROR_MESSAGES.VALIDATION_ERROR,
				});
			}
			await this.forgotPasswordUseCase.execute(validatedData);

			res.status(HTTP_STATUS.OK).json({
				success: true,
				message: SUCCESS_MESSAGES.EMAIL_SENT_SUCCESSFULLY,
			});
		} catch (error) {
			handleErrorResponse(res, error);
		}
	}

	async login(req: Request, res: Response): Promise<void> {
		try {
			const data = req.body as LoginUserDTO;
			const validatedData = loginSchema.parse(data);
			if (!validatedData) {
				res.status(HTTP_STATUS.BAD_REQUEST).json({
					success: false,
					message: ERROR_MESSAGES.INVALID_CREDENTIALS,
				});
			}
			const user = await this.loginUserUseCase.execute(validatedData);

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

			const { password, ...userWithoutPassword } = user;

			res.status(HTTP_STATUS.OK).json({
				success: true,
				message: SUCCESS_MESSAGES.LOGIN_SUCCESS,
				user: {
					...userWithoutPassword,
				},
			});
		} catch (error) {
			handleErrorResponse(res, error);
		}
	}

	async logout(req: Request, res: Response): Promise<void> {
		try {
			await this.blackListTokenUseCase.execute(
				(req as CustomRequest).user.access_token
			);

			await this.revokeRefreshToken.execute(
				(req as CustomRequest).user.refresh_token
			);

			const user = (req as CustomRequest).user;
			const accessTokenName = `${user.role}_access_token`;
			const refreshTokenName = `${user.role}_refresh_token`;
			clearAuthCookies(res, accessTokenName, refreshTokenName);
			res.status(HTTP_STATUS.OK).json({
				success: true,
				message: SUCCESS_MESSAGES.LOGOUT_SUCCESS,
			});
		} catch (error) {
			handleErrorResponse(res, error);
		}
	}

	refreshAccessToken(req: Request, res: Response): void {
		try {
			const refreshToken = (req as CustomRequest).user.refresh_token;
			const newTokens = this.refreshTokenUseCase.execute(refreshToken);
			const accessTokenName = `${newTokens.role}_access_token`;
			updateCookieWithAccessToken(
				res,
				newTokens.accessToken,
				accessTokenName
			);
			res.status(HTTP_STATUS.OK).json({
				success: true,
				message: SUCCESS_MESSAGES.OPERATION_SUCCESS,
			});
		} catch (error) {
			clearAuthCookies(
				res,
				`${(req as CustomRequest).user.role}_access_token`,
				`${(req as CustomRequest).user.role}_refresh_token`
			);
			res.status(HTTP_STATUS.UNAUTHORIZED).json({
				message: ERROR_MESSAGES.INVALID_TOKEN,
			});
		}
	}

	async register(req: Request, res: Response): Promise<void> {
		try {
			const { role } = req.body as UserDTO;
			const schema = userSchemas[role];
			if (!schema) {
				res.status(HTTP_STATUS.BAD_REQUEST).json({
					success: false,
					message: ERROR_MESSAGES.INVALID_CREDENTIALS,
				});
				return;
			}
			const validatedData = schema.parse(req.body);
			await this.registerUserUseCase.execute(validatedData);
			res.status(HTTP_STATUS.CREATED).json({
				success: true,
				message: SUCCESS_MESSAGES.REGISTRATION_SUCCESS,
			});
		} catch (error) {
			handleErrorResponse(res, error);
		}
	}

	async resetPassword(req: Request, res: Response): Promise<void> {
		try {
			const validatedData = resetPasswordValidationSchema.parse(req.body);
			if (!validatedData) {
				res.status(HTTP_STATUS.BAD_REQUEST).json({
					success: false,
					message: ERROR_MESSAGES.VALIDATION_ERROR,
				});
			}

			await this.resetPasswordUseCase.execute(validatedData);
			res.status(HTTP_STATUS.OK).json({
				success: true,
				message: SUCCESS_MESSAGES.PASSWORD_RESET_SUCCESS,
			});
		} catch (error) {
			handleErrorResponse(res, error);
		}
	}

	async sendOtpEmail(req: Request, res: Response): Promise<void> {
		try {
			const { email } = req.body;
			await this.sendOtpEmailUseCase.execute(email);
			res.status(HTTP_STATUS.OK).json({
				message: SUCCESS_MESSAGES.OTP_SEND_SUCCESS,
				success: true,
			});
		} catch (error) {
			handleErrorResponse(res, error);
		}
	}

	async verifyOtp(req: Request, res: Response): Promise<void> {
		try {
			const { email, otp } = req.body;
			const validatedData = otpMailValidationSchema.parse({ email, otp });
			await this.verifyOtpUseCase.execute(validatedData);

			res.status(HTTP_STATUS.OK).json({
				success: true,
				message: SUCCESS_MESSAGES.VERIFICATION_SUCCESS,
			});
		} catch (error) {
			handleErrorResponse(res, error);
		}
	}

	async handle(req: Request, res: Response): Promise<void> {
		try {
			const { email, otp } = req.body;
			const validatedData = otpMailValidationSchema.parse({ email, otp });
			await this.verifyOtpUseCase.execute(validatedData);

			res.status(HTTP_STATUS.OK).json({
				success: true,
				message: SUCCESS_MESSAGES.VERIFICATION_SUCCESS,
			});
		} catch (error) {
			handleErrorResponse(res, error);
		}
	}
}
