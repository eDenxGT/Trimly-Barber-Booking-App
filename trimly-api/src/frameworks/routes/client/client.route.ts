//* ====== Module Imports ====== *//
import { Request, RequestHandler, Response } from "express";

//* ====== Middleware Imports ====== *//
import {
	authorizeRole,
	decodeToken,
	verifyAuth,
} from "../../../interfaceAdapters/middlewares/auth.middleware";
import { blockStatusMiddleware, logoutController } from "../../di/resolver";

//* ====== BaseRoute Import ====== *//
import { BaseRoute } from "../base.route";

export class ClientRoutes extends BaseRoute {
	constructor() {
		super();
	}
	protected initializeRoutes(): void {
		// logout
		this.router.post(
			"/client/logout",
			verifyAuth,
			authorizeRole(["client"]),
			blockStatusMiddleware.checkStatus as RequestHandler,
			(req: Request, res: Response) => {
				logoutController.handle(req, res);
			}
		);

		this.router.post(
			"/client/refresh-token",
			decodeToken,
			(req: Request, res: Response) => {
				console.log(req.body);
				//   refreshTokenController.handle(req, res);
			}
		);
	}
}
