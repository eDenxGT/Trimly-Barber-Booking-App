import { container } from "tsyringe";
import { RegisterUserController } from "../../interfaceAdapters/controllers/auth/register.controller";
import { DependencyInjection } from ".";

DependencyInjection.registerAll()

export const registerController = container.resolve(RegisterUserController)