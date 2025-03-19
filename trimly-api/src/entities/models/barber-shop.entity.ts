export interface IBarberShop {
	id: string;
	name: string;
	owner: string; 
	barbers: string[]; 
	paymentMode: "shop_wallet" | "direct_payment";
	address: {
		street?: string;
		city?: string;
		state?: string;
		country?: string;
		zipCode: string;
		location: {
			latitude: number;
			longitude: number;
		};
	};
	commissionPercentage: number;
	walletBalance: number;
	barberEarnings?: Record<string, number>; 
	openingHours: {
		day: string;
		open?: string;
		close?: string;
		closed?: boolean;
	}[];
	createdBy: string; 
	approvedBy?: string; 
	createdAt?: Date;
	updatedAt?: Date;
}
