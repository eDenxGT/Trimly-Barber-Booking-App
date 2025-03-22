import { inject, injectable } from "tsyringe";
import { IEmailService } from "@/entities/useCaseInterfaces/services/email-service.interface";
import { ISendEmailUseCase } from "@/entities/useCaseInterfaces/common/send-email-usecase.interface";

@injectable()
export class SendEmailUseCase implements ISendEmailUseCase {
	constructor(
		@inject("IEmailService") private _emailService: IEmailService
	) {}
	async execute(to: string, subject: string, content: string): Promise<void> {
		await this._emailService.sendCustomEmail(to, subject, content);
	}
}
