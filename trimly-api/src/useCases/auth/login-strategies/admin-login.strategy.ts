import { IUserEntity } from "@/entities/models/user.entity";
import { LoginUserDTO } from "@/shared/dtos/user.dto";
import { ILoginStrategy } from "./login-strategy.interface";
import { inject, injectable } from "tsyringe";
import { IAdminEntity } from "@/entities/models/admin.entity";
import { IAdminRepository } from "@/entities/repositoryInterfaces/admin/admin-repository.interface";
import { IBcrypt } from "@/frameworks/security/bcrypt.interface";
import { CustomError } from "@/entities/utils/custom.error";
import { ERROR_MESSAGES, HTTP_STATUS } from "@/shared/constants";

@injectable()
export class AdminLoginStrategy implements ILoginStrategy {
	constructor(
		@inject("IAdminRepository") private adminRepository: IAdminRepository,
		@inject("IPasswordBcrypt") private passwordBcrypt: IBcrypt
	) {}
	async login(user: LoginUserDTO): Promise<Partial<IAdminEntity>> {
		const admin = await this.adminRepository.findByEmail(user.email);
		if (!admin) {
			throw new CustomError(
				ERROR_MESSAGES.USER_NOT_FOUND,
				HTTP_STATUS.NOT_FOUND
			);
		}
		if (admin.status !== "active") {
			throw new CustomError(
				ERROR_MESSAGES.BLOCKED,
				HTTP_STATUS.FORBIDDEN
			);
		}
		if (user.password) {
			const isPasswordMatch = await this.passwordBcrypt.compare(
				user.password,
				admin.password
			);
			if (!isPasswordMatch) {
				throw new CustomError(
					ERROR_MESSAGES.INVALID_CREDENTIALS,
					HTTP_STATUS.FORBIDDEN
				);
			}
		}
		return admin;
	}
}
