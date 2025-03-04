//* ====== Module Imports ====== *//
import { container } from "tsyringe";

//* ====== Controller Imports ====== *//
import { RegisterUserController } from "../../interfaceAdapters/controllers/auth/register.controller";

import { DependencyInjection } from ".";
import { SendOtpEmailController } from "../../interfaceAdapters/controllers/auth/send-otp-email.controller";

// Registering all registries using a single class
DependencyInjection.registerAll()

//* ====== Controller Resolving ====== *//
export const registerController = container.resolve(RegisterUserController)

export const sendOtpEmailController = container.resolve(SendOtpEmailController)