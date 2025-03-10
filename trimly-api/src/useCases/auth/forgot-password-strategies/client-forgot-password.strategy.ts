import { IForgotPasswordStrategy } from "./forgot-password-strategy.interface";

export class ClientForgotPasswordStrategy implements IForgotPasswordStrategy {
   async forgotPassword(email: string): Promise<void> {
      
   }
}