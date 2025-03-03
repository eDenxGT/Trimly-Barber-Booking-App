import { container } from "tsyringe";
import { RegisterUserController } from "../../interfaceAdapters/controllers/auth/register.controller";


export class ControllerRegistry {
   static registerControllers(): void {
      container.register("RegisterUserController", {
         useClass: RegisterUserController
      })
   }
}