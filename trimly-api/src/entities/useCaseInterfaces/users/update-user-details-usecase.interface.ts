import { IAdminEntity } from "@/entities/models/admin.entity";
import { IBarberEntity } from "@/entities/models/barber.entity";
import { IClientEntity } from "@/entities/models/client.entity";

export interface IUpdateUserDetailsUseCase {
	execute(
		userId: string,
		role: string,
		userDetails: Record<string, any>
	): Promise<IAdminEntity | IClientEntity | IBarberEntity | null>;
}
