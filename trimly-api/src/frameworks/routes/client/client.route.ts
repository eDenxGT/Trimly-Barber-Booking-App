//* ====== Module Imports ====== *//
import { Request, RequestHandler, Response } from "express";

//* ====== Middleware Imports ====== *//
import {
	authorizeRole,
	decodeToken,
	verifyAuth,
} from "../../../interfaceAdapters/middlewares/auth.middleware";
import {
	authController,
	blockStatusMiddleware,
	userController,
} from "../../di/resolver";

//* ====== BaseRoute Import ====== *//
import { BaseRoute } from "../base.route";

export class ClientRoutes extends BaseRoute {
	constructor() {
		super();
	}
	protected initializeRoutes(): void {
		this.router.put(
			"/client/update-password",
			verifyAuth,
			authorizeRole(["client"]),
			blockStatusMiddleware.checkStatus as RequestHandler,
			(req: Request, res: Response) => {
				userController.changeUserPassword(req, res);
			}
		);
		this.router
			.route("/client/details")
			.put(
				verifyAuth,
				authorizeRole(["client"]),
				blockStatusMiddleware.checkStatus as RequestHandler,
				(req: Request, res: Response) => {
					userController.updateUserDetails(req, res);
				}
			);
		// logout
		this.router.post(
			"/client/logout",
			verifyAuth,
			authorizeRole(["client"]),
			blockStatusMiddleware.checkStatus as RequestHandler,
			(req: Request, res: Response) => {
				authController.logout(req, res);
			}
		);

		this.router.post(
			"/client/refresh-token",
			decodeToken,
			(req: Request, res: Response) => {
				console.log("refreshing client", req.body);
				authController.refreshAccessToken(req, res);
			}
		);
	}
}
