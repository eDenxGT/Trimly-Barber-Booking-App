export interface ICategoryEntity {
   id?: string;
   name: string;
   requestedBy?: string;
   gender: "Men" | "Women" | "Unisex";
   status: "active" | "blocked";
   createdAt?: Date;
   updatedAt?: Date;
 }
 