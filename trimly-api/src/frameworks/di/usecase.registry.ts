//* ====== Module Imports ====== *//
import { container } from "tsyringe";

//* ====== Bcrypt Imports ====== *//
import { IBcrypt } from "../../frameworks/security/bcrypt.interface";
import { PasswordBcrypt } from "../../frameworks/security/password.bcrypt";

//* ====== Strategy Imports ====== *//
import { ClientRegisterStrategy } from "../../useCases/auth/register-strategies/client-register.strategy";

//* ====== UseCase Imports ====== *//
import { IRegisterUserUseCase } from "../../entities/useCaseInterfaces/register-usecase.interface";
import { RegisterUserUseCase } from "../../useCases/auth/register-user.usecase";

export class UseCaseRegistry {
	static registerUseCases(): void {
      
		//* ====== Register UseCases ====== *//
		container.register<IRegisterUserUseCase>("IRegisterUserUseCase", {
			useClass: RegisterUserUseCase,
		});

		//* ====== Register Bcrypt ====== *//
		container.register<IBcrypt>("IPasswordBcrypt", {
			useClass: PasswordBcrypt,
		});

		//* ====== Register Strategies ====== *//
		container.register("ClientRegisterStrategy", {
			useClass: ClientRegisterStrategy,
		});
	}
}
