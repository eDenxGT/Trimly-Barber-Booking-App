import { inject, injectable } from "tsyringe";
import { ILoginUserUseCase } from "../../entities/useCaseInterfaces/auth/login-usecase.interface";
import { LoginUserDTO } from "../../shared/dtos/user.dto";
import { CustomError } from "../../entities/utils/custom.error";
import { ERROR_MESSAGES, HTTP_STATUS } from "../../shared/constants";
import { IUserEntity } from "../../entities/models/user.entity";
import { IClientRepository } from "../../entities/repositoryInterfaces/client/client-repository.interface";
import { IBarberRepository } from "../../entities/repositoryInterfaces/barber/barber-repository.interface";
import { IAdminRepository } from "../../entities/repositoryInterfaces/admin/admin-repository.interface";
import { IBcrypt } from "../../frameworks/security/bcrypt.interface";

@injectable()
export class LoginUserUseCase implements ILoginUserUseCase {
	constructor(
		@inject("IClientRepository") private _clientRepository: IClientRepository,
		@inject("IBarberRepository") private _barberRepository: IBarberRepository,
		@inject("IAdminRepository") private _adminRepository: IAdminRepository,
		@inject("IPasswordBcrypt") private _passwordBcrypt: IBcrypt
	) {}

	async execute(user: LoginUserDTO): Promise<Partial<IUserEntity>> {
		let repository;

		if (user.role === "client") {
			repository = this._clientRepository;
		} else if (user.role === "barber") {
			repository = this._barberRepository;
		} else if (user.role === "admin") {
			repository = this._adminRepository;
		} else {
			throw new CustomError(ERROR_MESSAGES.INVALID_ROLE, HTTP_STATUS.BAD_REQUEST);
		}

		const userData = await repository.findByEmail(user.email);
		if (!userData) {
			throw new CustomError(ERROR_MESSAGES.USER_NOT_FOUND, HTTP_STATUS.NOT_FOUND);
		}

		if (userData.status !== "active") {
			throw new CustomError(ERROR_MESSAGES.BLOCKED, HTTP_STATUS.FORBIDDEN);
		}

		if (user.password) {
			const isPasswordMatch = await this._passwordBcrypt.compare(user.password, userData.password);
			if (!isPasswordMatch) {
				throw new CustomError(ERROR_MESSAGES.INVALID_CREDENTIALS, HTTP_STATUS.FORBIDDEN);
			}
		}

		return userData;
	}
}
