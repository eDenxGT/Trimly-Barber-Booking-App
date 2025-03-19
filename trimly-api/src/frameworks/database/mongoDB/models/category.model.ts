import { ICategoryEntity } from "@/entities/models/category.entity";
import { model, ObjectId } from "mongoose";
import { categorySchema } from "../schemas/category.schema";

export interface ICategoryModel extends Omit<ICategoryEntity, "id">, Document {
	_id: ObjectId;
}

export const CategoryModel = model<ICategoryModel>("Category", categorySchema);
