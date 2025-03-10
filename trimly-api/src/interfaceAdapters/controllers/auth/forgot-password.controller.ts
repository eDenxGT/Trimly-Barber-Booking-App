import { injectable } from "tsyringe";
import { IForgotPasswordController } from "@/entities/controllerInterfaces/auth/forgot-password-controller.interface";
import { Request, Response } from "express";

@injectable()
export class ForgotPasswordController implements IForgotPasswordController {
   async handle(req: Request, res: Response): Promise<void> {
      
   }
}