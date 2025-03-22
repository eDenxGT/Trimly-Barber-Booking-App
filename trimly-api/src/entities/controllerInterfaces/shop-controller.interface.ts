import { Request, Response } from "express";

export interface IShopController {
	registerShop(req: Request, res: Response): Promise<void>;
	getAllShops(req: Request, res: Response): Promise<void>;
	updateShopStatus(req: Request, res: Response): Promise<void>;
}
