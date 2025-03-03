import { inject, injectable } from "tsyringe";
import { IRegisterUserUseCase } from "../../../entities/useCaseInterfaces/register-usecase.interface";
import { Request, Response } from "express";
import { UserDTO } from "../../../shared/dtos/user.dto";
import { userSchemas } from "./validations/user-signup.validation.schema";
import {
	ERROR_MESSAGES,
	HTTP_STATUS,
	SUCCESS_MESSAGES,
} from "../../../shared/constants";

@injectable()
export class RegisterUserController {
	constructor(
		@inject("IRegisterUserUseCase")
		private registerUserUseCase: IRegisterUserUseCase
	) {}
	async handle(req: Request, res: Response): Promise<void> {
		try {
			const { role } = req.body as UserDTO;
			console.log(role);
			const schema = userSchemas[role];
			if (!schema) {
				res.status(HTTP_STATUS.BAD_REQUEST).json({
					success: false,
					message: ERROR_MESSAGES.INVALID_CREDENTIALS,
				});
				return;
			}
			const validatedData = schema.parse(req.body);
			await this.registerUserUseCase.execute(validatedData);
			res.status(HTTP_STATUS.CREATED).json({
				success: true,
				message: SUCCESS_MESSAGES.REGISTRATION_SUCCESS,
			});
		} catch (error) {}
	}
}
