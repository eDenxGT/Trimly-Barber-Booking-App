export interface IResetPasswordStrategy {
	resetPassword(password: string, token: string): Promise<void>;
}
