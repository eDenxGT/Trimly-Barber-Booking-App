import { IAdminEntity } from "@/entities/models/admin.entity";
import { IBarberEntity } from "@/entities/models/barber.entity";
import { IClientEntity } from "@/entities/models/client.entity";

export interface IGetUserDetailsUseCase {
	execute({
		userEmail,
		userId,
		role,
	}: {
		userEmail?: string;
		userId?: string;
		role: string;
	}): Promise<IAdminEntity | IClientEntity | IBarberEntity | null>;
}
