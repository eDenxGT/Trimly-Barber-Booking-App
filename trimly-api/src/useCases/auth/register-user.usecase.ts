import { inject, injectable } from "tsyringe";
import { IRegisterUserUseCase } from "../../entities/useCaseInterfaces/auth/register-usecase.interface";
import { UserDTO } from "../../shared/dtos/user.dto";
import { CustomError } from "../../entities/utils/custom.error";
import { ERROR_MESSAGES, HTTP_STATUS } from "../../shared/constants";
import { IClientRepository } from "../../entities/repositoryInterfaces/client/client-repository.interface";
import { IBarberRepository } from "../../entities/repositoryInterfaces/barber/barber-repository.interface";
import { IAdminRepository } from "../../entities/repositoryInterfaces/admin/admin-repository.interface";
import { IBcrypt } from "../../frameworks/security/bcrypt.interface";
import { generateUniqueId } from "../../frameworks/security/uniqueuid.bcrypt";
import { IUserEntity } from "../../entities/models/user.entity";

@injectable()
export class RegisterUserUseCase implements IRegisterUserUseCase {
	constructor(
		@inject("IBarberRepository")
		private _barberRepository: IBarberRepository,
		@inject("IClientRepository")
		private _clientRepository: IClientRepository,
		@inject("IAdminRepository") private _adminRepository: IAdminRepository,
		@inject("IPasswordBcrypt") private _passwordBcrypt: IBcrypt
	) {}

	async execute(user: UserDTO): Promise<IUserEntity | null> {
		const { role, email, password } = user;

		const [existingBarber, existingClient, existingAdmin] =
			await Promise.all([
				this._barberRepository.findByEmail(email),
				this._clientRepository.findByEmail(email),
				this._adminRepository.findByEmail(email),
			]);

		if (existingBarber || existingClient || existingAdmin) {
			throw new CustomError(
				ERROR_MESSAGES.EMAIL_EXISTS,
				HTTP_STATUS.CONFLICT
			);
		}

		const hashedPassword = password
			? await this._passwordBcrypt.hash(password)
			: null;

		const userId = generateUniqueId(role);

		let repository;
		if (role === "client") {
			repository = this._clientRepository;
		} else if (role === "barber") {
			repository = this._barberRepository;
		} else {
			throw new CustomError(
				ERROR_MESSAGES.INVALID_ROLE,
				HTTP_STATUS.BAD_REQUEST
			);
		}

		return await repository.save({
			...user,
			password: hashedPassword ?? "",
			userId,
		});
	}
}
