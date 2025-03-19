import { IServiceEntity } from "@/entities/models/service.entity";
import { model, ObjectId } from "mongoose";
import { serviceSchema } from "../schemas/service.schema";

export interface IServiceModel extends Omit<IServiceEntity, "id">, Document {
	_id: ObjectId;
}

export const ServiceModel = model<IServiceModel>("Service", serviceSchema);
