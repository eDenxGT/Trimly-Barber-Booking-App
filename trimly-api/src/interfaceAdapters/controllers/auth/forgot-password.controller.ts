import { inject, injectable } from "tsyringe";
import { IForgotPasswordController } from "@/entities/controllerInterfaces/auth/forgot-password-controller.interface";
import { Request, Response } from "express";
import { IForgotPasswordUseCase } from "@/entities/useCaseInterfaces/auth/forgot-password-usecase.interface";
import { ZodError } from "zod";
import {
	ERROR_MESSAGES,
	HTTP_STATUS,
	SUCCESS_MESSAGES,
} from "@/shared/constants";
import { CustomError } from "@/entities/utils/custom.error";
import { forgotPasswordValidationSchema } from "./validations/forgot-password.validation.schema";

@injectable()
export class ForgotPasswordController implements IForgotPasswordController {
	constructor(
		@inject("IForgotPasswordUseCase")
		private forgotPasswordUseCase: IForgotPasswordUseCase
	) {}
	async handle(req: Request, res: Response): Promise<void> {
		try {
			const validatedData = forgotPasswordValidationSchema.parse(
				req.body
			);
			if (!validatedData) {
				res.status(HTTP_STATUS.BAD_REQUEST).json({
					success: false,
					message: ERROR_MESSAGES.VALIDATION_ERROR,
				});
			}
			await this.forgotPasswordUseCase.execute(validatedData);

			res.status(HTTP_STATUS.OK).json({
				success: true,
				message: SUCCESS_MESSAGES.EMAIL_SENT_SUCCESSFULLY,
			});
		} catch (error) {
			if (error instanceof ZodError) {
				const errors = error.errors.map((err) => ({
					message: err.message,
				}));

				res.status(HTTP_STATUS.BAD_REQUEST).json({
					success: false,
					message: ERROR_MESSAGES.VALIDATION_ERROR,
					errors,
				});
				return;
			}
			if (error instanceof CustomError) {
				res.status(error.statusCode).json({
					success: false,
					message: error.message,
				});
				return;
			}
			console.log(error);
			res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
				success: false,
				message: ERROR_MESSAGES.SERVER_ERROR,
			});
		}
	}
}
