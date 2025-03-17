import { IUserEntity } from "./user.entity";

export interface IBarberEntity extends IUserEntity {
   googleId?: string;
   shopId: string,
   isOwner: boolean
}