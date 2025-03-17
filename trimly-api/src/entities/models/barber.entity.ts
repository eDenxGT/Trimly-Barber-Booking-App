import { IUserEntity } from "./user.entity";

export interface IBarberEntity extends IUserEntity {
   shopId: string,
   isOwner: boolean
}