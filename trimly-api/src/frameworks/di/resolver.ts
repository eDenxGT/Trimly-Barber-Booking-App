//* ====== Module Imports ====== *//
import { container } from "tsyringe";

import { DependencyInjection } from ".";

//* ====== Middleware Imports ====== *//
import { BlockStatusMiddleware } from "./../../interfaceAdapters/middlewares/block-status.middleware";

//* ====== Controller Imports ====== *//
import { RegisterUserController } from "../../interfaceAdapters/controllers/auth/register.controller";
import { SendOtpEmailController } from "../../interfaceAdapters/controllers/auth/send-otp-email.controller";
import { VerifyOtpController } from "./../../interfaceAdapters/controllers/auth/verify-otp.controller";
import { LoginUserController } from "../../interfaceAdapters/controllers/auth/login.controller";
import { LogoutUserController } from "../../interfaceAdapters/controllers/auth/logout.controller";
import { RefreshTokenController } from "../../interfaceAdapters/controllers/auth/refresh-token.controller";

// Registering all registries using a single class
DependencyInjection.registerAll();

//* ====== Middleware Resolving ====== *//
export const blockStatusMiddleware = container.resolve(BlockStatusMiddleware);

//* ====== Controller Resolving ====== *//
export const registerController = container.resolve(RegisterUserController);

export const loginController = container.resolve(LoginUserController);

export const logoutController = container.resolve(LogoutUserController);

export const sendOtpEmailController = container.resolve(SendOtpEmailController);

export const verifyOtpController = container.resolve(VerifyOtpController);

export const refreshTokenController = container.resolve(RefreshTokenController);