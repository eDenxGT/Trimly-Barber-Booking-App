//* ====== Module Imports ====== *//
import { container } from "tsyringe";

//* ====== Repository Imports ====== *//
import { IClientRepository } from "../../entities/repositoryInterfaces/client/client-repository.interface";
import { ClientRepository } from "../../interfaceAdapters/repositories/client/client.repository";
import { IOtpRepository } from "../../entities/repositoryInterfaces/auth/otp-repository.interface";
import { OtpRepository } from "../../interfaceAdapters/repositories/auth/otp.repository";

export class RepositoryRegistry {
	static registerRepositories(): void {
		//* ====== Register Repositories ====== *//
		container.register<IClientRepository>("IClientRepository", {
			useClass: ClientRepository,
		});

		container.register<IOtpRepository>("IOtpRepository", {
			useClass: OtpRepository,
		});
	}
}
