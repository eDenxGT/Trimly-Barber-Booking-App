import { inject, injectable } from "tsyringe";
import { IResetPasswordUseCase } from "@/entities/useCaseInterfaces/auth/reset-password-usecase.interface";
import { IResetPasswordStrategy } from "./reset-password-strategies/reset-password-strategy.interface";
import { ERROR_MESSAGES, HTTP_STATUS } from "@/shared/constants";
import { CustomError } from "@/entities/utils/custom.error";

@injectable()
export class ResetPasswordUseCase implements IResetPasswordUseCase {
      private strategies: Record<string, IResetPasswordStrategy>;

	constructor(
      @inject("ClientResetPasswordStrategy") private clientResetPassword: IResetPasswordStrategy,
      @inject("BarberResetPasswordStrategy") private barberResetPassword: IResetPasswordStrategy,
      @inject("AdminResetPasswordStrategy") private adminResetPassword: IResetPasswordStrategy,
   ) {
      this.strategies = {
         client: clientResetPassword,
         barber: barberResetPassword,
         admin: adminResetPassword
      }
   }
   async execute({
		password,
		role,
		token,
	}: {
		password: string;
		role: string;
		token: string;
	}): Promise<void> {
      const strategy = this.strategies[role];
      if (!strategy) {
         throw new CustomError(
            ERROR_MESSAGES.INVALID_ROLE,
            HTTP_STATUS.FORBIDDEN
         );
      }
      await strategy.resetPassword(password, token);
   }
}
