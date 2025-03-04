//* ====== Module Imports ====== *//
import { container } from "tsyringe";

//* ====== Bcrypt Imports ====== *//
import { IBcrypt } from "../../frameworks/security/bcrypt.interface";
import { PasswordBcrypt } from "../../frameworks/security/password.bcrypt";
import { OtpBcrypt } from "../security/otp.bcrypt";

//* ====== Strategy Imports ====== *//
import { ClientRegisterStrategy } from "../../useCases/auth/register-strategies/client-register.strategy";

//* ====== UseCase Imports ====== *//
import { IRegisterUserUseCase } from "../../entities/useCaseInterfaces/register-usecase.interface";
import { RegisterUserUseCase } from "../../useCases/auth/register-user.usecase";
import { IOtpService } from "../../entities/services/otp-service.interface";
import { OtpService } from "../../interfaceAdapters/services/otp.service";
import { IEmailService } from "../../entities/services/email-service.interface";
import { EmailService } from "../../interfaceAdapters/services/email.service";
import { IUserExistenceService } from "../../entities/services/user-existence-service.interface";
import { UserExistenceService } from "../../interfaceAdapters/services/user-existence.service";
import { SendOtpEmailUseCase } from "../../useCases/auth/send-otp-email.usecase";
import { ISendOtpEmailUseCase } from "../../entities/useCaseInterfaces/sent-otp-usecase.interface";

export class UseCaseRegistry {
	static registerUseCases(): void {
		//* ====== Register UseCases ====== *//
		container.register<IRegisterUserUseCase>("IRegisterUserUseCase", {
			useClass: RegisterUserUseCase,
		});

		container.register<ISendOtpEmailUseCase>("ISendOtpEmailUseCase", {
			useClass: SendOtpEmailUseCase,
		});

		//* ====== Register Bcrypt ====== *//
		container.register<IBcrypt>("IPasswordBcrypt", {
			useClass: PasswordBcrypt,
		});

		container.register<IBcrypt>("IOtpBcrypt", {
			useClass: OtpBcrypt,
		});

		//* ====== Register Bcrypt ====== *//
		container.register<IEmailService>("IEmailService", {
			useClass: EmailService,
		});

		container.register<IOtpService>("IOtpService", {
			useClass: OtpService,
		});

		container.register<IUserExistenceService>("IUserExistenceService", {
			useClass: UserExistenceService,
		});

		//* ====== Register Strategies ====== *//
		container.register("ClientRegisterStrategy", {
			useClass: ClientRegisterStrategy,
		});
	}
}
