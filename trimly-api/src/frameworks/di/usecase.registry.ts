//* ====== Module Imports ====== *//
import { container } from "tsyringe";

//* ====== Bcrypt Imports ====== *//
import { IBcrypt } from "../../frameworks/security/bcrypt.interface";
import { PasswordBcrypt } from "../../frameworks/security/password.bcrypt";
import { OtpBcrypt } from "../security/otp.bcrypt";

//* ====== Service Imports ====== *//
import { JWTService } from "@/useCases/services/jwt.service";
import { ITokenService } from "@/entities/useCaseInterfaces/services/token-service.interface";
import { UserExistenceService } from "@/useCases/services/user-existence.service";
import { IUserExistenceService } from "@/entities/useCaseInterfaces/services/user-existence-service.interface";
import { IOtpService } from "@/entities/useCaseInterfaces/services/otp-service.interface";
import { OtpService } from "@/useCases/services/otp.service";
import { EmailService } from "@/useCases/services/email.service";
import { IEmailService } from "@/entities/useCaseInterfaces/services/email-service.interface";

//* ====== UseCase Imports ====== *//
import { IRegisterUserUseCase } from "../../entities/useCaseInterfaces/auth/register-usecase.interface";
import { RegisterUserUseCase } from "../../useCases/auth/register-user.usecase";
import { SendOtpEmailUseCase } from "../../useCases/auth/send-otp-email.usecase";
import { ISendOtpEmailUseCase } from "../../entities/useCaseInterfaces/auth/sent-otp-usecase.interface";
import { IVerifyOtpUseCase } from "../../entities/useCaseInterfaces/auth/verify-otp-usecase.interface";
import { VerifyOtpUseCase } from "../../useCases/auth/verify-otp.usecase";
import { ILoginUserUseCase } from "../../entities/useCaseInterfaces/auth/login-usecase.interface";
import { LoginUserUseCase } from "../../useCases/auth/login-user.usecase";
import { IGenerateTokenUseCase } from "../../entities/useCaseInterfaces/auth/generate-token-usecase.interface";
import { GenerateTokenUseCase } from "../../useCases/auth/generate-token.usecase";
import { IBlackListTokenUseCase } from "../../entities/useCaseInterfaces/auth/blacklist-token-usecase.interface";
import { BlackListTokenUseCase } from "../../useCases/auth/blacklist-token.usecase";
import { IRevokeRefreshTokenUseCase } from "../../entities/useCaseInterfaces/auth/revoke-refresh-token-usecase.interface";
import { RevokeRefreshTokenUseCase } from "../../useCases/auth/revoke-refresh-token.usecase";
import { IRefreshTokenUseCase } from "../../entities/useCaseInterfaces/auth/refresh-token-usecase.interface";
import { RefreshTokenUseCase } from "../../useCases/auth/refresh-token.usecase";
import { IForgotPasswordUseCase } from "@/entities/useCaseInterfaces/auth/forgot-password-usecase.interface";
import { ForgotPasswordUseCase } from "@/useCases/auth/forgot-password.usecase";
import { IResetPasswordUseCase } from "@/entities/useCaseInterfaces/auth/reset-password-usecase.interface";
import { ResetPasswordUseCase } from "@/useCases/auth/reset-password.usecase";
import { IGetAllUsersUseCase } from "@/entities/useCaseInterfaces/users/get-all-users-usecase.interface";
import { GetAllUsersUseCase } from "@/useCases/users/get-all-users.usecase";
import { UpdateUserStatusUseCase } from "./../../useCases/users/update-user-status.usecase";
import { IUpdateUserStatusUseCase } from "@/entities/useCaseInterfaces/users/update-user-status-usecase.interface";
import { IChangeUserPasswordUseCase } from "@/entities/useCaseInterfaces/users/change-user-password-usecase.interface";
import { ChangeUserPasswordUseCase } from "@/useCases/users/change-user-password.usecase";
import { IUpdateUserDetailsUseCase } from "@/entities/useCaseInterfaces/users/update-user-details-usecase.interface";
import { UpdateUserDetailsUseCase } from "@/useCases/users/update-user-details.usecase";
import { GoogleUseCase } from "@/useCases/auth/google.usecase";
import { IGoogleUseCase } from "@/entities/useCaseInterfaces/auth/google-usecase";

export class UseCaseRegistry {
	static registerUseCases(): void {
		//* ====== Register UseCases ====== *//
		container.register<IRegisterUserUseCase>("IRegisterUserUseCase", {
			useClass: RegisterUserUseCase,
		});

		container.register<ILoginUserUseCase>("ILoginUserUseCase", {
			useClass: LoginUserUseCase,
		});

		container.register<ISendOtpEmailUseCase>("ISendOtpEmailUseCase", {
			useClass: SendOtpEmailUseCase,
		});

		container.register<IVerifyOtpUseCase>("IVerifyOtpUseCase", {
			useClass: VerifyOtpUseCase,
		});

		container.register<IGenerateTokenUseCase>("IGenerateTokenUseCase", {
			useClass: GenerateTokenUseCase,
		});

		container.register<IBlackListTokenUseCase>("IBlackListTokenUseCase", {
			useClass: BlackListTokenUseCase,
		});

		container.register<IRevokeRefreshTokenUseCase>(
			"IRevokeRefreshTokenUseCase",
			{
				useClass: RevokeRefreshTokenUseCase,
			}
		);

		container.register<IRefreshTokenUseCase>("IRefreshTokenUseCase", {
			useClass: RefreshTokenUseCase,
		});

		container.register<IForgotPasswordUseCase>("IForgotPasswordUseCase", {
			useClass: ForgotPasswordUseCase,
		});

		container.register<IResetPasswordUseCase>("IResetPasswordUseCase", {
			useClass: ResetPasswordUseCase,
		});

		container.register<IGetAllUsersUseCase>("IGetAllUsersUseCase", {
			useClass: GetAllUsersUseCase,
		});

		container.register<IUpdateUserStatusUseCase>(
			"IUpdateUserStatusUseCase",
			{
				useClass: UpdateUserStatusUseCase,
			}
		);

		container.register<IChangeUserPasswordUseCase>(
			"IChangeUserPasswordUseCase",
			{
				useClass: ChangeUserPasswordUseCase,
			}
		);

		container.register<IUpdateUserDetailsUseCase>(
			"IUpdateUserDetailsUseCase",
			{
				useClass: UpdateUserDetailsUseCase,
			}
		);

		container.register<IGoogleUseCase>("IGoogleUseCase", {
			useClass: GoogleUseCase,
		});

		//* ====== Register Bcrypts ====== *//
		container.register<IBcrypt>("IPasswordBcrypt", {
			useClass: PasswordBcrypt,
		});

		container.register<IBcrypt>("IOtpBcrypt", {
			useClass: OtpBcrypt,
		});

		//* ====== Register Services ====== *//
		container.register<IEmailService>("IEmailService", {
			useClass: EmailService,
		});

		container.register<IOtpService>("IOtpService", {
			useClass: OtpService,
		});

		container.register<IUserExistenceService>("IUserExistenceService", {
			useClass: UserExistenceService,
		});

		container.register<ITokenService>("ITokenService", {
			useClass: JWTService,
		});
	}
}
