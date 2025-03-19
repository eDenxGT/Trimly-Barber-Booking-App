export interface IServiceEntity {
   id?: string;
   name: string;
   categoryId: string;
   barberId: string;
   price: number;
   duration: number;
   description?: string;
   status: "pending" | "approved" | "rejected" | "blocked";
   createdAt?: Date;
   updatedAt?: Date;
 }
 