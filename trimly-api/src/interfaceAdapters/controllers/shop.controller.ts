import { IShopController } from "@/entities/controllerInterfaces/shop-controller.interface";
import { handleErrorResponse } from "@/shared/utils/errorHandler";
import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import { CustomRequest } from "../middlewares/auth.middleware";
import { IRegisterShopUseCase } from "@/entities/useCaseInterfaces/shop/register-shop-usecase.interface";
import {
	ERROR_MESSAGES,
	HTTP_STATUS,
	SHOP_APPROVED_MAIL_CONTENT,
	SHOP_REJECTED_MAIL_CONTENT,
	SUCCESS_MESSAGES,
} from "@/shared/constants";
import { IBarberShopEntity } from "@/entities/models/barber-shop.entity";
import { IGetAllShopsUseCase } from "@/entities/useCaseInterfaces/shop/get-all-shops-usecase.interface";
import { IUpdateShopUseCase } from "@/entities/useCaseInterfaces/shop/update-shop-usecase.interface";
import { ISendEmailUseCase } from "@/entities/useCaseInterfaces/common/send-email-usecase.interface";
import { IGetUserDetailsUseCase } from "@/entities/useCaseInterfaces/users/get-user-details-usecase.interface";

@injectable()
export class ShopController implements IShopController {
	constructor(
		@inject("IRegisterShopUseCase")
		private _registerShopUseCase: IRegisterShopUseCase,
		@inject("IGetAllShopsUseCase")
		private _getAllShopsUseCase: IGetAllShopsUseCase,
		@inject("IUpdateShopUseCase")
		private _updateShopUseCase: IUpdateShopUseCase,
		@inject("ISendEmailUseCase")
		private _sendEmailUseCase: ISendEmailUseCase,
		@inject("IGetUserDetailsUseCase")
		private _getUserDetailsUseCase: IGetUserDetailsUseCase
	) {}

	//* ─────────────────────────────────────────────────────────────
	//*                 🛠️ Barber Shop Registration
	//* ─────────────────────────────────────────────────────────────
	async registerShop(req: Request, res: Response): Promise<void> {
		try {
			const barber = (req as CustomRequest).user;

			const shopData: Partial<IBarberShopEntity> = {
				...req.body,
				owner: barber.userId,
				createdBy: barber.userId,
				approvedBy: null,
			};
			await this._registerShopUseCase.execute(shopData);
			res.status(HTTP_STATUS.CREATED).json({
				message: SUCCESS_MESSAGES.WAITING_FOR_ADMIN_APPROVAL,
				success: true,
			});
			// TODO: Notify Admin Panel Through Push Notification
		} catch (error) {
			handleErrorResponse(res, error);
		}
	}

	//* ─────────────────────────────────────────────────────────────
	//*                     🛠️ Get All Shops
	//* ─────────────────────────────────────────────────────────────
	async getAllShops(req: Request, res: Response): Promise<void> {
		try {
			const { page = 1, limit = 10, search = "", forType } = req.query;
			const pageNumber = Number(page);
			const pageSize = Number(limit);
			const forTypeString =
				typeof forType === "string" ? forType : "non-active";
			const searchTermString = typeof search === "string" ? search : "";

			const { shops, total } = await this._getAllShopsUseCase.execute(
				forTypeString,
				pageNumber,
				pageSize,
				searchTermString
			);
			console.log(shops, total);
			res.status(HTTP_STATUS.OK).json({
				success: true,
				shops,
				totalPages: total,
				currentPage: pageNumber,
			});
		} catch (error) {
			handleErrorResponse(res, error);
		}
	}

	//* ─────────────────────────────────────────────────────────────
	//*                   🛠️ Update Shop Status
	//* ─────────────────────────────────────────────────────────────
	async updateShopStatus(req: Request, res: Response): Promise<void> {
		try {
			const { id, status } = req.body;
			if (!id || !status) {
				res.status(HTTP_STATUS.BAD_REQUEST).json({
					message: ERROR_MESSAGES.MISSING_PARAMETERS,
					success: false,
				});
				return;
			}
			const barberShop = await this._updateShopUseCase.execute(id, {
				status,
			});
			const ownerId = barberShop?.owner || "";
			const ownerData = await this._getUserDetailsUseCase.execute({
				userId: ownerId,
				role: "barber",
			});
			if (barberShop?.status === "active") {
				await this._sendEmailUseCase.execute(
					ownerData?.email as string,
					"✂️ Trimly - Barber Shop Application Approved",
					SHOP_APPROVED_MAIL_CONTENT(
						barberShop.name,
						ownerData?.firstName + " " + ownerData?.lastName
					)
				);
			} else if (barberShop?.status === "blocked") {
				await this._sendEmailUseCase.execute(
					ownerData?.email as string,
					"✂️ Trimly - Barber Shop Application Rejected",
					SHOP_REJECTED_MAIL_CONTENT(
						barberShop.name,
						ownerData?.firstName + " " + ownerData?.lastName
					)
				);
			}
			res.status(HTTP_STATUS.OK).json({
				success: true,
				message: SUCCESS_MESSAGES.VERIFICATION_SUCCESS,
			});
		} catch (error) {
			handleErrorResponse(res, error);
		}
	}
}
