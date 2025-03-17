export interface IAuthController {
	googleAuth(req: any, res: any): Promise<void>;
}
