import { Request, Response } from "express";

export interface IAuthController {
	googleAuth(req: Request, res: Response): Promise<void>;
	forgotPassword(req: Request, res: Response): Promise<void>;
	login(req: Request, res: Response): Promise<void>;
	logout(req: Request, res: Response): Promise<void>;
	refreshAccessToken(req: Request, res: Response): void;
	register(req: Request, res: Response): Promise<void>;
	resetPassword(req: Request, res: Response): Promise<void>;
	sendOtpEmail(req: Request, res: Response): Promise<void>;
	verifyOtp(req: Request, res: Response): Promise<void>;
	handle(req: Request, res: Response): Promise<void>;
}
