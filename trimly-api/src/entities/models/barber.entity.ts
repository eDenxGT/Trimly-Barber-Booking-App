import { IUserEntity } from "./user.entity";

export interface IBarberEntity extends IUserEntity {
   userId: string,
   shopId: string,
   isOwner: boolean
}