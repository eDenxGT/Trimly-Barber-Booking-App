import { Request, RequestHandler, Response } from "express";
import {
	authorizeRole,
	verifyAuth,
} from "../../../interfaceAdapters/middlewares/auth.middleware";
import { blockStatusMiddleware } from "../../di/resolver";
import { BaseRoute } from "../base.route";

export class ClientRoute extends BaseRoute {
	constructor() {
		super();
	}
	protected initializeRoutes(): void {
      // logout
		this.router.post(
			"/logout",
			verifyAuth,
			authorizeRole(["client"]),
			blockStatusMiddleware.checkStatus as RequestHandler,
         (req: Request, res: Response) => {
            console.log(req.body)
         }
		);
	}
}
