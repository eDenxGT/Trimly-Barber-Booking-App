//* ====== Module Imports ====== *//
import { container } from "tsyringe";

//* ====== Bcrypt Imports ====== *//
import { IBcrypt } from "../../frameworks/security/bcrypt.interface";
import { PasswordBcrypt } from "../../frameworks/security/password.bcrypt";
import { OtpBcrypt } from "../security/otp.bcrypt";

//* ====== Strategy Imports ====== *//
import { ClientRegisterStrategy } from "../../useCases/auth/register-strategies/client-register.strategy";
import { ClientLoginStrategy } from "../../useCases/auth/login-strategies/client-login.strategy";
import { BarberRegisterStrategy } from "../../useCases/auth/register-strategies/barber-register.strategy";
import { BarberLoginStrategy } from "@/useCases/auth/login-strategies/barber-login.strategy";
import { AdminLoginStrategy } from "@/useCases/auth/login-strategies/admin-login.strategy";
import { ClientForgotPasswordStrategy } from "@/useCases/auth/forgot-password-strategies/client-forgot-password.strategy";
import { AdminForgotPasswordStrategy } from "@/useCases/auth/forgot-password-strategies/admin-forgot-password.strategy";
import { BarberForgotPasswordStrategy } from "@/useCases/auth/forgot-password-strategies/barber-forgot-password.strategy";
import { ClientResetPasswordStrategy } from "@/useCases/auth/reset-password-strategies/client-reset-password.strategy";
import { BarberResetPasswordStrategy } from "@/useCases/auth/reset-password-strategies/barber-reset-password.strategy";
import { AdminResetPasswordStrategy } from "@/useCases/auth/reset-password-strategies/admin-reset-password.strategy";

//* ====== Service Imports ====== *//
import { IOtpService } from "../../entities/services/otp-service.interface";
import { OtpService } from "../../interfaceAdapters/services/otp.service";
import { IEmailService } from "../../entities/services/email-service.interface";
import { EmailService } from "../../interfaceAdapters/services/email.service";
import { IUserExistenceService } from "../../entities/services/user-existence-service.interface";
import { UserExistenceService } from "../../interfaceAdapters/services/user-existence.service";
import { ITokenService } from "../../entities/services/token-service.interface";
import { JWTService } from "../../interfaceAdapters/services/jwt.service";

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

		//* ====== Register Strategies ====== *//
		container.register("ClientRegisterStrategy", {
			useClass: ClientRegisterStrategy,
		});

		container.register("ClientLoginStrategy", {
			useClass: ClientLoginStrategy,
		});

		container.register("BarberRegisterStrategy", {
			useClass: BarberRegisterStrategy,
		});

		container.register("BarberLoginStrategy", {
			useClass: BarberLoginStrategy,
		});

		container.register("AdminLoginStrategy", {
			useClass: AdminLoginStrategy,
		});

		container.register("ClientForgotPasswordStrategy", {
			useClass: ClientForgotPasswordStrategy,
		});

		container.register("BarberForgotPasswordStrategy", {
			useClass: BarberForgotPasswordStrategy,
		});

		container.register("AdminForgotPasswordStrategy", {
			useClass: AdminForgotPasswordStrategy,
		});

		container.register("ClientResetPasswordStrategy", {
			useClass: ClientResetPasswordStrategy,
		});

		container.register("BarberResetPasswordStrategy", {
			useClass: BarberResetPasswordStrategy,
		});

		container.register("AdminResetPasswordStrategy", {
			useClass: AdminResetPasswordStrategy,
		});
	}
}
