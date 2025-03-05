import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { JWTService } from "../services/jwt.service";
import { ERROR_MESSAGES, HTTP_STATUS } from "../../shared/constants";
import client from "../../frameworks/cache/redis.client";

const tokenService = new JWTService();

export interface CustomJwtPayload extends JwtPayload {
	id: string;
	email: string;
	role: string;
	access_token: string;
	refresh_token: string;
}

export interface CustomRequest extends Request {
	user: CustomJwtPayload;
}

export const verifyAuth = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const token = extractToken(req);
		if (!token) {
			console.log("No token provided");
			res.status(HTTP_STATUS.UNAUTHORIZED).json({
				success: false,
				message: ERROR_MESSAGES.UNAUTHORIZED_ACCESS,
			});
			return;
		}
		if (await isBlacklisted(token.access_token)) {
			console.log("is blacklisted worked");
			res.status(HTTP_STATUS.FORBIDDEN).json({
				success: false,
				message: ERROR_MESSAGES.TOKEN_BLACKLISTED,
			});
			return;
		}
		const user = tokenService.verifyAccessToken(
			token.access_token
		) as CustomJwtPayload;
		console.log(user);
		if (!user || !user.id) {
			res.status(HTTP_STATUS.UNAUTHORIZED).json({
				message: ERROR_MESSAGES.UNAUTHORIZED_ACCESS,
			});
			return;
		}
		(req as CustomRequest).user = {
			...user,
			access_token: token.access_token,
			refresh_token: token.refresh_token,
		};
		next();
	} catch (error: any) {
		if (error.name === "TokenExpiredError") {
			console.log("token is expired is worked");
			res.status(HTTP_STATUS.UNAUTHORIZED).json({
				message: ERROR_MESSAGES.TOKEN_EXPIRED,
			});
			return;
		}
		console.log("token is invalid is worked");

		res.status(HTTP_STATUS.UNAUTHORIZED).json({
			message: ERROR_MESSAGES.INVALID_TOKEN,
		});
		return;
	}
};

const extractToken = (
	req: Request
): { access_token: string; refresh_token: string } | null => {
	const pathSegments = req.path.split("/");
	const privateRouteIndex = pathSegments.indexOf("pvt");

	if (privateRouteIndex !== -1 && pathSegments[privateRouteIndex + 1]) {
		const userType = pathSegments[privateRouteIndex + 1];
		return {
			access_token: req.cookies[`${userType}_access_token`] || null,
			refresh_token: req.cookies[`${userType}_refresh_token`] || null,
		};
	}

	return null;
};

const isBlacklisted = async (token: string): Promise<boolean> => {
	const result = await client.get(token);
	return result !== null;
};
