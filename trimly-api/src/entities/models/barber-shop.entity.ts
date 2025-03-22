export interface IBarberShopEntity {
	id?: string;
	shopId?: string;
	name: string;
	owner: string;
	barbers?: string[];
	paymentMode?: "shop_wallet" | "direct_payment";
	description?: string;
	contactNumber?: string;
	email?: string;
	address: {
		display?: string;
		street?: string;
		city?: string;
		state?: string;
		country?: string;
		zipCode?: string;
		location: {
			latitude: number;
			longitude: number;
		};
	};
	commissionPercentage?: number;
	walletBalance?: number;
	barberEarnings?: Record<string, number>;
	status: "active" | "pending" | "blocked";
	bannerImage?: string;
	logoImage?: string;
	daysOpen?: string[];
	openingTime?: string;
	closingTime?: string;
	amenities: {
		wifi: boolean;
		parking: boolean;
	};
	createdBy: string;
	approvedBy?: string;
	createdAt?: Date;
	updatedAt?: Date;
}
