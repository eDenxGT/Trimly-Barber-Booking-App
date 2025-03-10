import { inject, injectable } from "tsyringe";
import { IResetPasswordController } from "@/entities/controllerInterfaces/auth/reset-password-controller.interface";
import { Request, Response } from "express";
import { resetPasswordValidationSchema } from "./validations/reset-password.validation.schema";
import {
	ERROR_MESSAGES,
	HTTP_STATUS,
	SUCCESS_MESSAGES,
} from "@/shared/constants";
import { IResetPasswordUseCase } from "@/entities/useCaseInterfaces/auth/reset-password-usecase.interface";
import { ZodError } from "zod";
import { CustomError } from "@/entities/utils/custom.error";

@injectable()
export class ResetPasswordController implements IResetPasswordController {
	constructor(
		@inject("IResetPasswordUseCase")
		private resetPasswordUseCase: IResetPasswordUseCase
	) {}
	async handle(req: Request, res: Response): Promise<void> {
		try {
			const validatedData = resetPasswordValidationSchema.parse(req.body);
			if (!validatedData) {
				res.status(HTTP_STATUS.BAD_REQUEST).json({
					success: false,
					message: ERROR_MESSAGES.VALIDATION_ERROR,
				});
			}

			await this.resetPasswordUseCase.execute(validatedData);
			res.status(HTTP_STATUS.OK).json({
				success: true,
				message: SUCCESS_MESSAGES.PASSWORD_RESET_SUCCESS,
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
