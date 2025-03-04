import { Request, Response } from "express";
import { BaseRoute } from "../base.route";
import { registerController, sendOtpEmailController } from "../../di/resolver";

export class AuthRoutes extends BaseRoute {
	constructor() {
		super();
	}
	protected initializeRoutes(): void {
		this.router.post("/signup", (req: Request, res: Response) => {
			console.log("req", req.body);
			registerController.handle(req, res);
		});
		//  this.router.post("/signin")

		this.router.post("/send-otp", (req: Request, res: Response) => {
			sendOtpEmailController.handle(req, res);
		});
		this.router.post("/verify-otp", (req: Request, res: Response) => {
			console.log(req.body);
		});
	}
}
