//* ====== Module Imports ====== *//
import { Request, Response } from "express";

//* ====== BaseRoute Import ====== *//
import { BaseRoute } from "../base.route";

//* ====== Controller Imports ====== *//
import {
	forgotPasswordController,
	loginController,
	registerController,
	sendOtpEmailController,
	verifyOtpController,
} from "../../di/resolver";

export class AuthRoutes extends BaseRoute {
	constructor() {
		super();
	}
	protected initializeRoutes(): void {
		this.router.post("/signup", (req: Request, res: Response) => {
			registerController.handle(req, res);
		});
		this.router.post("/signin", (req: Request, res: Response) => {
			console.log("LOgin req", req.body);
			loginController.handle(req, res);
		});

		this.router.post("/send-otp", (req: Request, res: Response) => {
			sendOtpEmailController.handle(req, res);
		});

		this.router.post("/verify-otp", (req: Request, res: Response) => {
			verifyOtpController.handle(req, res);
		});

		this.router.post("/forgot-password", (req: Request, res: Response) => {
			forgotPasswordController.handle(req, res);
		});
	}
}
