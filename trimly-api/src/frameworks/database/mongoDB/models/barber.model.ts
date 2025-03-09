import { model, ObjectId } from "mongoose";
import { IBarberEntity } from "../../../../entities/models/barber.entity";
import { barberSchema } from "../schemas/barber.schema";

export interface IBarberModel extends Omit<IBarberEntity, "id">, Document {
	_id: ObjectId;
}

export const barberModel = model<IBarberModel>("Barber", barberSchema)