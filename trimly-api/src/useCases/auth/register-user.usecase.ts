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
		private barberRepository: IBarberRepository,
		@inject("IClientRepository")
		private clientRepository: IClientRepository,
		@inject("IAdminRepository") private adminRepository: IAdminRepository,
		@inject("IPasswordBcrypt") private passwordBcrypt: IBcrypt
	) {}

	async execute(user: UserDTO): Promise<IUserEntity | null> {
		const { role, email, password } = user;

		const [existingBarber, existingClient, existingAdmin] =
			await Promise.all([
				this.barberRepository.findByEmail(email),
				this.clientRepository.findByEmail(email),
				this.adminRepository.findByEmail(email),
			]);

		if (existingBarber || existingClient || existingAdmin) {
			throw new CustomError(
				ERROR_MESSAGES.EMAIL_EXISTS,
				HTTP_STATUS.CONFLICT
			);
		}

		const hashedPassword = password
			? await this.passwordBcrypt.hash(password)
			: null;

		const userId = generateUniqueId(role);

		let repository;
		if (role === "client") {
			repository = this.clientRepository;
		} else if (role === "barber") {
			repository = this.barberRepository;
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
