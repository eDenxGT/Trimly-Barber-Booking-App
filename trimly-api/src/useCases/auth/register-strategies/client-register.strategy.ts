import { inject, injectable } from "tsyringe";
import { IRegisterStrategy } from "./register-strategy.interface";
import { ClientDTO, UserDTO } from "../../../shared/dtos/user.dto";
import { IClientRepository } from "../../../entities/repositoryInterfaces/client/client-repository.interface";
import { CustomError } from "../../../entities/utils/custom.error";
import { ERROR_MESSAGES, HTTP_STATUS } from "../../../shared/constants";
import { IBcrypt } from "../../../frameworks/security/bcrypt.interface";
import { generateUniqueId } from "../../../frameworks/security/uniqueuid.bcrypt";
import { IUserEntity } from './../../../entities/models/user.entity';

@injectable()
export class ClientRegisterStrategy implements IRegisterStrategy {
	constructor(
		@inject("IClientRepository") private clientRepository: IClientRepository,
      @inject("IPasswordBcrypt") private passwordBcrypt: IBcrypt
	) {}

	async register(user: UserDTO): Promise<IUserEntity | void> {
		if (user.role === "client") {
			const existingClient = await this.clientRepository.findByEmail(
				user.email
			);
			if (existingClient) {
				throw new CustomError(
					ERROR_MESSAGES.EMAIL_EXISTS,
					HTTP_STATUS.CONFLICT
				);
			}
         const {firstName, lastName, phoneNumber, password, email} = user as ClientDTO

         let hashedPassword = null
         if(password) {
            hashedPassword = await this.passwordBcrypt.hash(password)
         }
         const userId = generateUniqueId("client")
         return await this.clientRepository.save({
            firstName,
            lastName,
            phoneNumber,
            email,
            password: hashedPassword ?? "",
            userId,
            role: "client",
         })
		} else {
         throw new CustomError("Invalid role for client registration", HTTP_STATUS.BAD_REQUEST)
      }
	}
}
