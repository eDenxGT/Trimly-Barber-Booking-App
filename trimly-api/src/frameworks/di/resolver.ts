//* ====== Module Imports ====== *//
import { container } from "tsyringe";

//* ====== Controller Imports ====== *//
import { RegisterUserController } from "../../interfaceAdapters/controllers/auth/register.controller";

import { DependencyInjection } from ".";
import { SendOtpEmailController } from "../../interfaceAdapters/controllers/auth/send-otp-email.controller";
import { VerifyOtpController } from "./../../interfaceAdapters/controllers/auth/verify-otp.controller";

// Registering all registries using a single class
DependencyInjection.registerAll();

//* ====== Controller Resolving ====== *//
export const registerController = container.resolve(RegisterUserController);

export const sendOtpEmailController = container.resolve(SendOtpEmailController);

export const verifyOtpController = container.resolve(VerifyOtpController);
