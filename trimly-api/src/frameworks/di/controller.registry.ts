//* ====== Module Imports ====== *//
import { container } from "tsyringe";

//* ====== Middleware Imports ====== *//
import { BlockStatusMiddleware } from "../../interfaceAdapters/middlewares/block-status.middleware";

//* ====== Controller Imports ====== *//
import { AdminController } from "@/interfaceAdapters/controllers/admin/admin.controller";
import { AuthController } from './../../interfaceAdapters/controllers/auth/auth.controller';

export class ControllerRegistry {
	static registerControllers(): void {
		//* ====== Register Middlewares ====== *//
		// container.register("BlockStatusMiddleware", {
		// 	useClass: BlockStatusMiddleware,
		// });

		//* ====== Register Controllers ====== *//
// 
	}
}
