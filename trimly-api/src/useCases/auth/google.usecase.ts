import { inject, injectable } from "tsyringe";
import { IGoogleUseCase } from "@/entities/useCaseInterfaces/auth/google-usecase";
import { ILoginStrategy } from "./login-strategies/login-strategy.interface";
import { IRegisterStrategy } from "./register-strategies/register-strategy.interface";
import { OAuth2Client } from "google-auth-library";
import { IUserEntity } from "@/entities/models/user.entity";
import { ERROR_MESSAGES, HTTP_STATUS, TRole } from "@/shared/constants";
import { CustomError } from "@/entities/utils/custom.error";

@injectable()
export class GoogleUseCase implements IGoogleUseCase {
	private registerStrategies: Record<string, IRegisterStrategy>;
	private loginStrategies: Record<string, ILoginStrategy>;
	private oAuthClient: OAuth2Client;
	constructor(
		@inject("ClientGoogleLoginStrategy")
		private clientGoogleLogin: ILoginStrategy,
		@inject("BarberGoogleLoginStrategy")
		private barberGoogleLogin: ILoginStrategy,
		@inject("ClientRegisterStrategy")
		private clientRegister: IRegisterStrategy,
		@inject("BarberRegisterStrategy")
		private barberRegister: IRegisterStrategy
	) {
		this.registerStrategies = {
			client: this.clientRegister,
			barber: this.barberRegister,
		};
		this.loginStrategies = {
			client: this.clientGoogleLogin,
			barber: this.barberGoogleLogin,
		};
		this.oAuthClient = new OAuth2Client();
	}
	async execute(
		credential: string,
		client_id: string,
		role: TRole
	): Promise<Partial<IUserEntity>> {
		const registerStrategy = this.registerStrategies[role];
		const loginStrategy = this.loginStrategies[role];
		if (!registerStrategy || !loginStrategy) {
			throw new CustomError(
				ERROR_MESSAGES.INVALID_ROLE,
				HTTP_STATUS.FORBIDDEN
			);
		}

		const ticket = await this.oAuthClient.verifyIdToken({
			idToken: credential,
			audience: client_id,
		});

		const payload = ticket.getPayload();
		if (!payload) {
			throw new CustomError(
				"Invalid or empty token payload",
				HTTP_STATUS.UNAUTHORIZED
			);
		}

		const googleId = payload.sub;
		const email = payload.email;
		const firstName = payload.given_name || "";
		const lastName = payload.family_name || "";
		const profileImage = payload.picture || "";

		if (!email) {
			throw new CustomError("Email is required", HTTP_STATUS.BAD_REQUEST);
		}
		const existingUser = await loginStrategy.login({ email, role });

		if (!existingUser) {
			const newUser = await registerStrategy.register({
				firstName: firstName as string,
				lastName: lastName as string,
				role,
				googleId,
				email,
				profileImage,
			});
			if (!newUser) {
				throw new CustomError("", 0);
			}
			return newUser;
		}

		return existingUser;
	}
}
