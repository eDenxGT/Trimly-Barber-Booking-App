//* ====== Module Imports ====== *//
import { container } from "tsyringe";

import { DependencyInjection } from ".";

//* ====== Middleware Imports ====== *//
import { BlockStatusMiddleware } from "./../../interfaceAdapters/middlewares/block-status.middleware";

//* ====== Controller Imports ====== *//
import { UserController } from "@/interfaceAdapters/controllers/user.controller";
import { AuthController } from "@/interfaceAdapters/controllers/auth/auth.controller";
import { ShopController } from "@/interfaceAdapters/controllers/shop.controller";
import { IShopController } from "@/entities/controllerInterfaces/shop-controller.interface";

// Registering all registries using a single class
DependencyInjection.registerAll();

//* ====== Middleware Resolving ====== *//
export const blockStatusMiddleware = container.resolve(BlockStatusMiddleware);

//* ====== Controller Resolving ====== *//
export const userController = container.resolve(UserController);

export const authController = container.resolve(AuthController);

export const shopController = container.resolve(ShopController);
