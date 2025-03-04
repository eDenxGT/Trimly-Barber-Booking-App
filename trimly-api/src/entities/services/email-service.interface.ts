export interface IEmailService {
	sendEmail(to: string, subject: string, content: string): Promise<void>;
	sendOtpEmail(to: string, subject: string, otp: string): Promise<void>;
}
