import { IShopController } from "@/entities/controllerInterfaces/shop-controller.interface";
import { handleErrorResponse } from "@/shared/utils/errorHandler";
import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import { CustomRequest } from "../middlewares/auth.middleware";
import { IRegisterShopUseCase } from "@/entities/useCaseInterfaces/shop/register-shop-usecase.interface";
import { HTTP_STATUS, SUCCESS_MESSAGES } from "@/shared/constants";
import { IBarberShopEntity } from "@/entities/models/barber-shop.entity";

@injectable()
export class ShopController implements IShopController {
	constructor(
		@inject("IRegisterShopUseCase")
		private registerShopUseCase: IRegisterShopUseCase
	) {}

	//* ─────────────────────────────────────────────────────────────
	//*                 🛠️ Barber Shop Registration
	//* ─────────────────────────────────────────────────────────────
	async registerShop(req: Request, res: Response): Promise<void> {
		try {
			const barber = (req as CustomRequest).user;

			const shopData: Partial<IBarberShopEntity> = {
				...req.body,
				owner: barber.id,
				createdBy: barber.id,
				approvedBy: null,
			};
			await this.registerShopUseCase.execute(shopData);
			res.status(HTTP_STATUS.CREATED).json({
				message: SUCCESS_MESSAGES.WAITING_FOR_ADMIN_APPROVAL,
				success: true,
			});
			// TODO: Notify Admin Panel Through Push Notification
		} catch (error) {
			handleErrorResponse(res, error);
		}
	}
}
