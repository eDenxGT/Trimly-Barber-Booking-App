//* ====== Module Imports ====== *//
import { Request, RequestHandler, Response } from "express";

//* ====== Middleware Imports ====== *//
import {
	authorizeRole,
	decodeToken,
	verifyAuth,
} from "../../../interfaceAdapters/middlewares/auth.middleware";


//* ====== BaseRoute Import ====== *//
import { BaseRoute } from "../base.route";

//* ====== Controller Imports ====== *//
import {
	blockStatusMiddleware,
	logoutController,
	refreshTokenController,
} from "../../di/resolver";

export class AdminRoutes extends BaseRoute {
	constructor() {
		super();
	}
	protected initializeRoutes(): void {
		// logout
		this.router.post(
			"/admin/logout",
			verifyAuth,
			authorizeRole(["admin"]),
			(req: Request, res: Response) => {
				logoutController.handle(req, res);
			}
		);

		this.router.post(
			"/admin/refresh-token",
			decodeToken,
			(req: Request, res: Response) => {
				console.log("refreshing admin", req.body);
				refreshTokenController.handle(req, res);
			}
		);
	}
}
