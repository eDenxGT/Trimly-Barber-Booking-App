//* ====== Module Imports ====== *//
import { container } from "tsyringe";

//* ====== Controller Imports ====== *//
import { RegisterUserController } from "../../interfaceAdapters/controllers/auth/register.controller";
import { SendOtpEmailController } from "../../interfaceAdapters/controllers/auth/send-otp-email.controller";
import { VerifyOtpController } from "../../interfaceAdapters/controllers/auth/verify-otp.controller";
import { LoginUserController } from "../../interfaceAdapters/controllers/auth/login.controller";

//* ====== Middleware Imports ====== *//
import { BlockStatusMiddleware } from "../../interfaceAdapters/middlewares/block-status.middleware";

export class ControllerRegistry {
	static registerControllers(): void {
		//* ====== Register Middlewares ====== *//
		container.register("BlockStatusMiddleware", {
			useClass: BlockStatusMiddleware,
		 });

		//* ====== Register Controllers ====== *//
		container.register("RegisterUserController", {
			useClass: RegisterUserController,
		});

		container.register("LoginUserController", {
			useClass: LoginUserController
		})
		
		container.register("SendOtpEmailController", {
			useClass: SendOtpEmailController,
		});

		container.register("VerifyOtpController", {
			useClass: VerifyOtpController,
		});
	}
}
