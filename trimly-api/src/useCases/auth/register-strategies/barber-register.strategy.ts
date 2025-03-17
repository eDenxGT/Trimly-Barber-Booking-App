import { inject, injectable } from "tsyringe";
import { IUserEntity } from "../../../entities/models/user.entity";
import { BarberDTO, UserDTO } from "../../../shared/dtos/user.dto";
import { IRegisterStrategy } from "./register-strategy.interface";
import { IBarberRepository } from "@/entities/repositoryInterfaces/barber/barber-repository.interface";
import { IBcrypt } from "@/frameworks/security/bcrypt.interface";
import { ERROR_MESSAGES, HTTP_STATUS } from "@/shared/constants";
import { CustomError } from "@/entities/utils/custom.error";
import { generateUniqueId } from "@/frameworks/security/uniqueuid.bcrypt";
import { IClientRepository } from "@/entities/repositoryInterfaces/client/client-repository.interface";
import { IAdminRepository } from "@/entities/repositoryInterfaces/admin/admin-repository.interface";

@injectable()
export class BarberRegisterStrategy implements IRegisterStrategy {
	constructor(
		@inject("IAdminRepository") private adminRepository: IAdminRepository,
		@inject("IBarberRepository")
		private barberRepository: IBarberRepository,
		@inject("IClientRepository")
		private clientRepository: IClientRepository,
		@inject("IPasswordBcrypt") private passwordBcrypt: IBcrypt
	) {}
	async register(user: UserDTO): Promise<IUserEntity | null> {
		if (user.role === "barber") {
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
			const { firstName, lastName, email, phoneNumber, password } =
				user as BarberDTO;

			let hashedPassword = null;
			if (password) {
				hashedPassword = await this.passwordBcrypt.hash(password);
			}
			const userId = generateUniqueId("barber");
			return await this.barberRepository.save({
				firstName,
				lastName,
				email,
				phoneNumber,
				profileImage: user?.profileImage ?? "",
				password: hashedPassword ?? "",
				userId,
				role: "barber",
			});
		} else {
			throw new CustomError(
				"Invalid role for barber registration",
				HTTP_STATUS.BAD_REQUEST
			);
		}
	}
}
