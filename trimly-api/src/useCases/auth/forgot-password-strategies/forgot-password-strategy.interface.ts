export interface IForgotPasswordStrategy {
	forgotPassword(email: string): Promise<void>;
}
