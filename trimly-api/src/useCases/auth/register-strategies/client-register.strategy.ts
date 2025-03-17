import { inject, injectable } from "tsyringe";
import { IRegisterStrategy } from "./register-strategy.interface";
import { ClientDTO, UserDTO } from "../../../shared/dtos/user.dto";
import { IClientRepository } from "../../../entities/repositoryInterfaces/client/client-repository.interface";
import { CustomError } from "../../../entities/utils/custom.error";
import { ERROR_MESSAGES, HTTP_STATUS } from "../../../shared/constants";
import { IBcrypt } from "../../../frameworks/security/bcrypt.interface";
import { generateUniqueId } from "../../../frameworks/security/uniqueuid.bcrypt";
import { IUserEntity } from "./../../../entities/models/user.entity";
import { IBarberRepository } from "@/entities/repositoryInterfaces/barber/barber-repository.interface";
import { IAdminRepository } from "@/entities/repositoryInterfaces/admin/admin-repository.interface";

@injectable()
export class ClientRegisterStrategy implements IRegisterStrategy {
	constructor(
		@inject("IAdminRepository") private adminRepository: IAdminRepository,
		@inject("IBarberRepository")
		private barberRepository: IBarberRepository,
		@inject("IClientRepository")
		private clientRepository: IClientRepository,
		@inject("IPasswordBcrypt") private passwordBcrypt: IBcrypt
	) {}

	async register(user: UserDTO): Promise<IUserEntity | null> {
		if (user.role === "client") {
			const [existingAdmin, existingBarber, existingClient] =
				await Promise.all([
					this.adminRepository.findByEmail(user.email),
					this.barberRepository.findByEmail(user.email),
					this.clientRepository.findByEmail(user.email),
				]);

			if (existingAdmin || existingBarber || existingClient) {
				throw new CustomError(
					ERROR_MESSAGES.EMAIL_EXISTS,
					HTTP_STATUS.CONFLICT
				);
			}
			const { firstName, lastName, phoneNumber, password, email } =
				user as ClientDTO;

			let hashedPassword = null;
			if (password) {
				hashedPassword = await this.passwordBcrypt.hash(password);
			}
			const userId = generateUniqueId("client");
			return await this.clientRepository.save({
				firstName,
				lastName,
				phoneNumber,
				profileImage: user?.profileImage ?? "",
				email,
				password: hashedPassword ?? "",
				userId,
				role: "client",
			});
		} else {
			throw new CustomError(
				"Invalid role for client registration",
				HTTP_STATUS.BAD_REQUEST
			);
		}
	}
}
