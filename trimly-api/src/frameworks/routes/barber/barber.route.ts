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
	authController,
	blockStatusMiddleware,
	shopController,
	userController,
} from "../../di/resolver";

export class BarberRoutes extends BaseRoute {
	constructor() {
		super();
	}
	protected initializeRoutes(): void {
		// logout
		this.router.post(
			"/barber/logout",
			verifyAuth,
			authorizeRole(["barber"]),
			blockStatusMiddleware.checkStatus as RequestHandler,
			(req: Request, res: Response) => {
				authController.logout(req, res);
			}
		);

		this.router
			.route("/barber/details")
			.put(
				verifyAuth,
				authorizeRole(["barber"]),
				blockStatusMiddleware.checkStatus as RequestHandler,
				(req: Request, res: Response) => {
					userController.updateUserDetails(req, res);
				}
			);

		this.router
			.route("/barber/shop")
			.post(
				verifyAuth,
				authorizeRole(["barber"]),
				blockStatusMiddleware.checkStatus as RequestHandler,
				(req: Request, res: Response) => {
					shopController.registerShop(req, res);
				}
			);

		// logout
		this.router.put(
			"/barber/update-password",
			verifyAuth,
			authorizeRole(["barber"]),
			(req: Request, res: Response) => {
				userController.changeUserPassword(req, res);
			}
		);

		this.router.post(
			"/barber/refresh-token",
			decodeToken,
			(req: Request, res: Response) => {
				console.log("refreshing barber", req.body);
				authController.handleTokenRefresh(req, res);
			}
		);
	}
}
