import { IUserController } from "@/entities/controllerInterfaces/user-controller.interface";
import { IGetAllUsersUseCase } from "@/entities/useCaseInterfaces/users/get-all-users-usecase.interface";
import { CustomError } from "@/entities/utils/custom.error";
import { ERROR_MESSAGES, HTTP_STATUS } from "@/shared/constants";
import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import { ZodError } from "zod";

@injectable()
export class UserController implements IUserController {
	constructor(
		@inject("IGetAllUsersUseCase")
		private getAllUsersUseCase: IGetAllUsersUseCase
	) {}

	async getAllUsers(req: Request, res: Response): Promise<void> {
		try {
			const { page = 1, limit = 10, search = "", userType } = req.query;
			const pageNumber = Number(page);
			const pageSize = Number(limit);
			const userTypeString =
				typeof userType === "string" ? userType : "client";
			const searchTermString = typeof search === "string" ? search : "";

			const { user, total } = await this.getAllUsersUseCase.execute(
				userTypeString,
				pageNumber,
				pageSize,
				searchTermString
			);

			res.status(HTTP_STATUS.OK).json({
				success: true,
				users: user,
				totalPages: total,
				currentPage: pageNumber,
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
