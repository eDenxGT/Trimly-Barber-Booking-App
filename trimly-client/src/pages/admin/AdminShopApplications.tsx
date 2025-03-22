import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Store, Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { BarberShopDetailsModal } from "@/components/modals/BarberShopDetailsModal";
import ConfirmationModal from "@/components/modals/ConfirmationModal";
import { Pagination1 } from "@/components/common/paginations/Pagination1";
import {
	IBarberShopData,
	useShopStatusMutation,
} from "@/hooks/barber/shop/useBarberShopForm";
import { getAllShops, updateShopStatus } from "@/services/admin/adminService";
import { useAllShopsQuery } from "@/hooks/admin/useAllShops";
import { useToaster } from "@/hooks/ui/useToaster";
import { debounce } from "lodash";

export const AdminBarberShopApplication = () => {
	const [isDarkMode, setIsDarkMode] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");
	const [debouncedSearch, setDebouncedSearch] = useState(searchQuery);
	const [currentPage, setCurrentPage] = useState(1);
	const [selectedShop, setSelectedShop] = useState<IBarberShopData | null>(
		null
	);
	const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
	const [isConfirmationModalOpen, setIsConfirmationModalOpen] =
		useState(false);
	const [confirmationData, setConfirmationData] = useState({
		title: "",
		description: "",
		confirmText: "",
		action: "",
		icon: "success" as "success" | "danger" | "logout",
	});
	const limit = 10;

	const { errorToast, successToast } = useToaster();
	const { mutate: adminUpdateShopStatus, isLoading } =
		useShopStatusMutation(updateShopStatus);

	useEffect(() => {
		const handler = debounce(() => setDebouncedSearch(searchQuery), 300);
		handler();
		return () => handler.cancel();
	}, [searchQuery]);

	const { data, refetch } = useAllShopsQuery(
		getAllShops,
		currentPage,
		limit,
		debouncedSearch,
		"non-active"
	);
	const shops = data?.shops || [];
	const totalPages = data?.totalPages || 1;

	const handleViewShopDetails = (shop: IBarberShopData) => {
		setSelectedShop(shop);
		setIsDetailsModalOpen(true);
	};

	const handleConfirmationModal = (
		shop: IBarberShopData,
		action: "approve" | "blocked"
	) => {
		setSelectedShop(shop);

		if (action === "approve") {
			setConfirmationData({
				title: "Approve Barber Shop",
				description: `Are you sure you want to approve "${shop.name}"? This will make the shop visible to customers.`,
				confirmText: "Approve",
				action: "approve",
				icon: "success",
			});
		} else {
			setConfirmationData({
				title: "Reject Barber Shop",
				description: `Are you sure you want to reject "${shop.name}"? The shop owner will be notified.`,
				confirmText: "Reject",
				action: "blocked",
				icon: "danger",
			});
		}

		setIsConfirmationModalOpen(true);
	};

	const handleConfirmAction = () => {
		if (!selectedShop) return;

		const updatedStatus =
			confirmationData.action === "approve" ? "active" : "blocked";

		adminUpdateShopStatus(
			{ id: selectedShop.id, status: updatedStatus },
			{
				onSuccess: () => {
					successToast(
						`Shop "${selectedShop.name}" has been ${
							confirmationData.action === "approve"
								? "approved"
								: "rejected"
						} successfully.`
					);
					setIsConfirmationModalOpen(false);
					refetch(); 
				},
				onError: () => {
					errorToast(
						`Failed to update shop status. Please try again.`
					);
				},
			}
		);

		setSelectedShop(null);
	};
	const getStatusBadge = (status: string) => {
		switch (status) {
			case "active":
				return (
					<Badge className="bg-green-400 text-green-900 hover:bg-green-500">
						Approved
					</Badge>
				);
			case "blocked":
				return (
					<Badge className="bg-red-500 text-white hover:bg-red-600">
						Blocked
					</Badge>
				);
			case "pending":
				return (
					<Badge className="bg-yellow-400 text-yellow-900 hover:bg-yellow-500">
						Pending
					</Badge>
				);
			default:
				return (
					<Badge className="bg-gray-400 text-gray-900 hover:bg-gray-500">
						Unknown
					</Badge>
				);
		}
	};

	return (
		<div
			className={`p-6 ${
				isDarkMode
					? "bg-gray-900 text-white"
					: "bg-gray-100 text-gray-900"
			} min-h-screen`}>
			<div className="max-w-7xl mx-auto">
				<div className="flex justify-between items-center mb-6">
					<h1 className="text-2xl font-bold text-orange-500">
						Barber Shop Applications
					</h1>
					<Button
						onClick={() => setIsDarkMode(!isDarkMode)}
						variant="outline"
						className={
							isDarkMode
								? "border-gray-700 text-white"
								: "border-gray-300 text-gray-800"
						}>
						Toggle {isDarkMode ? "Light" : "Dark"} Mode
					</Button>
				</div>

				{/* Search and Filter */}
				<div className="flex flex-col md:flex-row gap-4 mb-6">
					<div className="relative flex-1">
						<Search
							className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
							size={18}
						/>
						<Input
							placeholder="Search by name, ID, or owner..."
							className={`pl-10 ${
								isDarkMode
									? "bg-gray-800 border-gray-700 text-white"
									: "bg-white border-gray-300"
							}`}
							value={searchQuery}
							onChange={(e) => {
								setSearchQuery(e.target.value);
								setCurrentPage(1);
							}}
						/>
					</div>
				</div>

				{/* Shops Table */}
				<div
					className={`rounded-lg overflow-hidden ${
						isDarkMode ? "bg-gray-800" : "bg-white"
					} shadow-md`}>
					<div className="overflow-x-auto">
						<table className="w-full">
							<thead
								className={`${
									isDarkMode
										? "bg-gray-700 text-gray-200"
										: "bg-gray-50 text-gray-600"
								}`}>
								<tr>
									<th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
										Shop
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
										Owner
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
										Location
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
										Status
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
										Actions
									</th>
								</tr>
							</thead>
							<tbody
								className={`divide-y ${
									isDarkMode
										? "divide-gray-700"
										: "divide-gray-200"
								}`}>
								{shops.length > 0 ? (
									shops.map((shop) => (
										<tr
											key={shop.shopId}
											className={
												isDarkMode
													? "hover:bg-gray-700"
													: "hover:bg-gray-50"
											}>
											<td className="px-6 py-4 whitespace-nowrap">
												<div className="flex items-center">
													<Avatar className="h-10 w-10 bg-orange-100 mr-3">
														<AvatarImage
															src={
																shop.logoImage as string
															}
															alt={shop.name}
														/>
														<AvatarFallback className="bg-orange-100 text-orange-800">
															<Store className="h-5 w-5" />
														</AvatarFallback>
													</Avatar>
													<div>
														<div
															className={`font-medium ${
																isDarkMode
																	? "text-white"
																	: "text-gray-900"
															}`}>
															{shop.name}
														</div>
														<div className="text-sm text-gray-500">
															ID: {shop.shopId}
														</div>
													</div>
												</div>
											</td>
											<td className="px-6 py-4 whitespace-nowrap">
												<div
													className={
														isDarkMode
															? "text-white"
															: "text-gray-900"
													}>
													{shop.owner}
												</div>
											</td>
											<td className="px-6 py-4 whitespace-nowrap">
												<div
													className={
														isDarkMode
															? "text-white"
															: "text-gray-900"
													}>
													{shop.address.city},{" "}
													{shop.address.state}
												</div>
											</td>
											<td className="px-6 py-4 whitespace-nowrap">
												{getStatusBadge(
													shop.status as string
												)}
											</td>
											<td className="px-6 py-4 whitespace-nowrap">
												<Button
													variant="ghost"
													className="text-orange-500 hover:text-orange-700 hover:bg-orange-100 dark:hover:bg-gray-700"
													onClick={() =>
														handleViewShopDetails(
															shop
														)
													}>
													View Details
												</Button>
											</td>
										</tr>
									))
								) : (
									<tr>
										<td
											colSpan={5}
											className={`px-6 py-12 text-center ${
												isDarkMode
													? "text-gray-400"
													: "text-gray-500"
											}`}>
											No shops found matching your
											criteria.
										</td>
									</tr>
								)}
							</tbody>
						</table>
					</div>
				</div>

				{/* Pagination */}
				{shops.length >= limit && (
					<Pagination1
						currentPage={currentPage}
						totalPages={totalPages}
						onPageNext={() => setCurrentPage(currentPage + 1)}
						onPagePrev={() => setCurrentPage(currentPage - 1)}
					/>
				)}

				{/* Modals */}
				<BarberShopDetailsModal
					isOpen={isDetailsModalOpen}
					onOpenChange={setIsDetailsModalOpen}
					selectedShop={selectedShop}
					isDarkMode={isDarkMode}
					handleConfirmationModal={handleConfirmationModal}
				/>

				<ConfirmationModal
					isOpen={isConfirmationModalOpen}
					onClose={() => setIsConfirmationModalOpen(false)}
					onConfirm={handleConfirmAction}
					title={confirmationData.title}
					description={confirmationData.description}
					confirmText={confirmationData.confirmText}
					cancelText="Cancel"
					isDarkMode={isDarkMode}
					icon={confirmationData.icon}
				/>
			</div>
		</div>
	);
};
