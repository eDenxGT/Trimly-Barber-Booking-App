//* ====== Module Imports ====== *//
import { container } from "tsyringe";

//* ====== Controller Imports ====== *//
import { RegisterUserController } from "../../interfaceAdapters/controllers/auth/register.controller";
import { SendOtpEmailController } from "../../interfaceAdapters/controllers/auth/send-otp-email.controller";
import { VerifyOtpController } from "../../interfaceAdapters/controllers/auth/verify-otp.controller";

export class ControllerRegistry {
	static registerControllers(): void {
		//* ====== Register Controllers ====== *//
		container.register("RegisterUserController", {
			useClass: RegisterUserController,
		});
		
		container.register("SendOtpEmailController", {
			useClass: SendOtpEmailController,
		});

		container.register("VerifyOtpController", {
			useClass: VerifyOtpController,
		});
	}
}
