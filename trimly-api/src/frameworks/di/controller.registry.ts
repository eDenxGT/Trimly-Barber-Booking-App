//* ====== Module Imports ====== *//
import { container } from "tsyringe";

//* ====== Middleware Imports ====== *//
import { BlockStatusMiddleware } from "../../interfaceAdapters/middlewares/block-status.middleware";

//* ====== Controller Imports ====== *//
import { RegisterUserController } from "../../interfaceAdapters/controllers/auth/register.controller";
import { SendOtpEmailController } from "../../interfaceAdapters/controllers/auth/send-otp-email.controller";
import { VerifyOtpController } from "../../interfaceAdapters/controllers/auth/verify-otp.controller";
import { LoginUserController } from "../../interfaceAdapters/controllers/auth/login.controller";
import { LogoutUserController } from "../../interfaceAdapters/controllers/auth/logout.controller";
import { RefreshTokenController } from "../../interfaceAdapters/controllers/auth/refresh-token.controller";
import { ForgotPasswordController } from "@/interfaceAdapters/controllers/auth/forgot-password.controller";
import { ResetPasswordController } from "@/interfaceAdapters/controllers/auth/reset-password.controller";
import { AdminController } from "@/interfaceAdapters/controllers/admin/admin.controller";
import { AuthController } from './../../interfaceAdapters/controllers/auth/auth.controller';

export class ControllerRegistry {
	static registerControllers(): void {
		//* ====== Register Middlewares ====== *//
		container.register("BlockStatusMiddleware", {
			useClass: BlockStatusMiddleware,
		});

		//* ====== Register Controllers ====== *//


// 
		container.register("RegisterUserController", {
			useClass: RegisterUserController,
		});

		container.register("LoginUserController", {
			useClass: LoginUserController,
		});

		container.register("LogoutUserController", {
			useClass: LogoutUserController,
		});

		container.register("SendOtpEmailController", {
			useClass: SendOtpEmailController,
		});

		container.register("VerifyOtpController", {
			useClass: VerifyOtpController,
		});

		container.register("RefreshTokenController", {
			useClass: RefreshTokenController,
		});

		container.register("ForgotPasswordController", {
			useClass: ForgotPasswordController,
		});

		container.register("ResetPasswordController", {
			useClass: ResetPasswordController,
		});
	}
}
