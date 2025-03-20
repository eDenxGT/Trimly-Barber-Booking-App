//* ====== Module Imports ====== *//
import { container } from "tsyringe";

//* ====== Repository Imports ====== *//
import { IClientRepository } from "../../entities/repositoryInterfaces/client/client-repository.interface";
import { ClientRepository } from "../../interfaceAdapters/repositories/client/client.repository";
import { IOtpRepository } from "../../entities/repositoryInterfaces/auth/otp-repository.interface";
import { OtpRepository } from "../../interfaceAdapters/repositories/auth/otp.repository";
import { IRefreshTokenRepository } from "../../entities/repositoryInterfaces/auth/refresh-token-repository.interface";
import { RefreshTokenRepository } from "../../interfaceAdapters/repositories/auth/refresh-token.repository";
import { IRedisTokenRepository } from "../../entities/repositoryInterfaces/redis/redis-token-repository.interface";
import { RedisTokenRepository } from "../../interfaceAdapters/repositories/redis/redis-token.repository";
import { IBarberRepository } from "../../entities/repositoryInterfaces/barber/barber-repository.interface";
import { BarberRepository } from "../../interfaceAdapters/repositories/barber/barber.repository";
import { IAdminRepository } from "@/entities/repositoryInterfaces/admin/admin-repository.interface";
import { AdminRepository } from "@/interfaceAdapters/repositories/admin/admin.repository";
import { IShopRepository } from "@/entities/repositoryInterfaces/shop/shop-repository.interface";
import { ShopRepository } from "@/interfaceAdapters/repositories/shop/shop.repository";

export class RepositoryRegistry {
	static registerRepositories(): void {
		//* ====== Register Repositories ====== *//
		container.register<IClientRepository>("IClientRepository", {
			useClass: ClientRepository,
		});

		container.register<IOtpRepository>("IOtpRepository", {
			useClass: OtpRepository,
		});

		container.register<IRefreshTokenRepository>("IRefreshTokenRepository", {
			useClass: RefreshTokenRepository,
		});

		container.register<IRedisTokenRepository>("IRedisTokenRepository", {
			useClass: RedisTokenRepository,
		});

		container.register<IBarberRepository>("IBarberRepository", {
			useClass: BarberRepository,
		});

		container.register<IAdminRepository>("IAdminRepository", {
			useClass: AdminRepository,
		});

		container.register<IShopRepository>("IShopRepository", {
			useClass: ShopRepository,
		});
	}
}
