import { IUserEntity } from "./user.entity";

export interface IBarberEntity extends IUserEntity {
   barberId: string,
   shopId: string,
   isOwner: boolean
}