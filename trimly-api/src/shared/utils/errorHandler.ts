import { Response } from "express";
import { ZodError } from "zod";
import { ERROR_MESSAGES, HTTP_STATUS } from "../constants";
import { CustomError } from "@/entities/utils/custom.error";

export const handleErrorResponse = (res: Response, error: unknown) => {
	if (error instanceof ZodError) {
		const errors = error.errors.map((err) => ({
			message: err.message,
		}));

		return res.status(HTTP_STATUS.BAD_REQUEST).json({
			success: false,
			message: ERROR_MESSAGES.VALIDATION_ERROR,
			errors,
		});
	}

	if (error instanceof CustomError) {
		return res.status(error.statusCode).json({
			success: false,
			message: error.message,
		});
	}

	console.error(error);
	return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
		success: false,
		message: ERROR_MESSAGES.SERVER_ERROR,
	});
};
