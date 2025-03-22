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
	shopController,
	userController,
} from "../../di/resolver";

export class AdminRoutes extends BaseRoute {
	constructor() {
		super();
	}
	protected initializeRoutes(): void {
		this.router.get(
			"/admin/users",
			verifyAuth,
			authorizeRole(["admin"]),
			(req: Request, res: Response) => {
				userController.getAllUsers(req, res);
			}
		);

		this.router.patch(
			"/admin/user-status",
			verifyAuth,
			authorizeRole(["admin"]),
			(req: Request, res: Response) => {
				userController.updateUserStatus(req, res);
			}
		);

		this.router.put(
			"/admin/update-password",
			verifyAuth,
			authorizeRole(["admin"]),
			(req: Request, res: Response) => {
				userController.changeUserPassword(req, res);
			}
		);

		this.router
			.route("/admin/shops")
			.get(
				verifyAuth,
				authorizeRole(["admin"]),
				(req: Request, res: Response) => {
					shopController.getAllShops(req, res);
				}
			)
			.put(
				verifyAuth,
				authorizeRole(["admin"]),
				(req: Request, res: Response) => {
					shopController.updateShopStatus(req, res);
				}
			);

		this.router
			.route("/admin/details")
			.put(
				verifyAuth,
				authorizeRole(["admin"]),
				(req: Request, res: Response) => {
					userController.updateUserDetails(req, res);
				}
			);

		// logout
		this.router.post(
			"/admin/logout",
			verifyAuth,
			authorizeRole(["admin"]),
			(req: Request, res: Response) => {
				authController.logout(req, res);
			}
		);

		this.router.post(
			"/admin/refresh-token",
			decodeToken,
			(req: Request, res: Response) => {
				authController.handleTokenRefresh(req, res);
			}
		);
	}
}
