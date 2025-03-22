import { useQuery } from "@tanstack/react-query";
import { IBarberShopData } from "../barber/shop/useBarberShopForm";

export type ForType = "active" | "non-active";
export interface FetchShopsParams {
	forType: ForType;
	page: number;
	limit: number;
	search: string;
}

export type ShopsResponse = {
	shops: IBarberShopData[];
	totalPages: number;
	currentPage: number;
};

export const useAllShopsQuery = (
	queryFunc: (params: FetchShopsParams) => Promise<ShopsResponse>,
	page: number,
	limit: number,
	search: string,
	forType: ForType
) => {
	return useQuery<ShopsResponse>({
		queryKey: ["shops", forType, page, limit, search],
		queryFn: () => queryFunc({ forType, page, limit, search }),
		placeholderData: (prevData) => prevData ?? undefined,
	});
};
