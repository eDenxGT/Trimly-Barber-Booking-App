export interface IBarberShopEntity {
	id?: string;
	name: string;
	ownerId: string;
	barberIds: string[];
	paymentMode: "wallet" | "direct";
	commissionPercentage: number;
	walletBalance: number;
	barberEarnings: Record<string, number>;
	createdAt?: Date;
	updatedAt?: Date;
}
