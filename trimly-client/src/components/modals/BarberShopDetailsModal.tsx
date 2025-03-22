import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Store } from "lucide-react";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogDescription,
} from "@/components/ui/dialog";
import { IBarberShopData } from "@/hooks/barber/shop/useBarberShopForm";

interface BarberShopDetailsModalProps {
	isOpen: boolean;
	onOpenChange: (open: boolean) => void;
	selectedShop: IBarberShopData | null;
	isDarkMode: boolean;
	handleConfirmationModal: (
		shop: IBarberShopData,
		action: "approve" | "blocked"
	) => void;
}

export const BarberShopDetailsModal = ({
	isOpen,
	onOpenChange,
	selectedShop,
	isDarkMode,
	handleConfirmationModal,
}: BarberShopDetailsModalProps) => {
	const getStatusBadge = (status: string) => {
		switch (status) {
			case "active":
				return (
					<Badge className="bg-green-400 text-green-900 hover:bg-green-500">
						Approved
					</Badge>
				);
			case "rejected":
				return (
					<Badge className="bg-red-500 text-white hover:bg-red-600">
						Rejected
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
		<Dialog open={isOpen} onOpenChange={onOpenChange}>
			<DialogContent
				className={`${
					isDarkMode ? "bg-gray-800 text-white" : "bg-white"
				} max-w-3xl max-h-[90vh] overflow-y-auto`}>
				<DialogHeader>
					<DialogTitle className="text-xl text-orange-600 flex items-center gap-2">
						<Avatar className="h-8 w-8 bg-orange-100">
							<AvatarImage
								src={selectedShop?.logoImage as string}
								alt={selectedShop?.name}
							/>
							<AvatarFallback className="bg-orange-100 text-orange-800">
								<Store className="h-4 w-4" />
							</AvatarFallback>
						</Avatar>
						{selectedShop?.name}
					</DialogTitle>
					<DialogDescription className="text-gray-500">
						Shop ID: {selectedShop?.shopId}
					</DialogDescription>
				</DialogHeader>

				{selectedShop && (
					<div className="grid gap-6 py-4">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							{/* Basic Information */}
							<div
								className={`p-4 rounded-lg ${
									isDarkMode ? "bg-gray-700" : "bg-orange-50"
								}`}>
								<h3 className="text-lg font-semibold mb-4 text-orange-600">
									Basic Information
								</h3>
								<div className="space-y-3">
									<div>
										<p className="text-sm text-gray-500">
											Owner
										</p>
										<p
											className={
												isDarkMode
													? "text-white"
													: "text-gray-800"
											}>
											{selectedShop.ownerName }
										</p>
									</div>
									<div>
										<p className="text-sm text-gray-500">
											Status
										</p>
										<div>
											{getStatusBadge(
												selectedShop.status as string
											)}
										</div>
									</div>
									<div>
										<p className="text-sm text-gray-500">
											Contact Number
										</p>
										<p
											className={
												isDarkMode
													? "text-white"
													: "text-gray-800"
											}>
											{selectedShop.contactNumber ||
												"N/A"}
										</p>
									</div>
									<div>
										<p className="text-sm text-gray-500">
											Email
										</p>
										<p
											className={
												isDarkMode
													? "text-white"
													: "text-gray-800"
											}>
											{selectedShop.email || "N/A"}
										</p>
									</div>
									<div>
										<p className="text-sm text-gray-500">
											Payment Mode
										</p>
										<p
											className={
												isDarkMode
													? "text-white"
													: "text-gray-800"
											}>
											{selectedShop.paymentMode ===
											"shop_wallet"
												? "Shop Wallet"
												: "Direct Payment"}
										</p>
									</div>
								</div>
							</div>

							{/* Address Information */}
							<div
								className={`p-4 rounded-lg ${
									isDarkMode ? "bg-gray-700" : "bg-orange-50"
								}`}>
								<h3 className="text-lg font-semibold mb-4 text-orange-600">
									Address
								</h3>
								<div className="space-y-3">
									<div>
										<p className="text-sm text-gray-500">
											Display Address
										</p>
										<p
											className={
												isDarkMode
													? "text-white"
													: "text-gray-800"
											}>
											{selectedShop.address.display ||
												"N/A"}
										</p>
									</div>
									<div>
										<p className="text-sm text-gray-500">
											City
										</p>
										<p
											className={
												isDarkMode
													? "text-white"
													: "text-gray-800"
											}>
											{selectedShop.address.city || "N/A"}
										</p>
									</div>
									<div>
										<p className="text-sm text-gray-500">
											State
										</p>
										<p
											className={
												isDarkMode
													? "text-white"
													: "text-gray-800"
											}>
											{selectedShop.address.state ||
												"N/A"}
										</p>
									</div>
									<div>
										<p className="text-sm text-gray-500">
											Country
										</p>
										<p
											className={
												isDarkMode
													? "text-white"
													: "text-gray-800"
											}>
											{selectedShop.address.country ||
												"N/A"}
										</p>
									</div>
								</div>
							</div>
						</div>

						{/* Business Hours */}
						<div
							className={`p-4 rounded-lg ${
								isDarkMode ? "bg-gray-700" : "bg-orange-50"
							}`}>
							<h3 className="text-lg font-semibold mb-4 text-orange-600">
								Business Hours
							</h3>
							<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
								<div>
									<p className="text-sm text-gray-500">
										Days Open
									</p>
									<p
										className={
											isDarkMode
												? "text-white"
												: "text-gray-800"
										}>
										{selectedShop.daysOpen?.join(", ") ||
											"N/A"}
									</p>
								</div>
								<div>
									<p className="text-sm text-gray-500">
										Opening Time
									</p>
									<p
										className={
											isDarkMode
												? "text-white"
												: "text-gray-800"
										}>
										{selectedShop.openingTime || "N/A"}
									</p>
								</div>
								<div>
									<p className="text-sm text-gray-500">
										Closing Time
									</p>
									<p
										className={
											isDarkMode
												? "text-white"
												: "text-gray-800"
										}>
										{selectedShop.closingTime || "N/A"}
									</p>
								</div>
							</div>
						</div>

						{/* Description */}
						<div
							className={`p-4 rounded-lg ${
								isDarkMode ? "bg-gray-700" : "bg-orange-50"
							}`}>
							<h3 className="text-lg font-semibold mb-4 text-orange-600">
								Description
							</h3>
							<p
								className={
									isDarkMode ? "text-white" : "text-gray-800"
								}>
								{selectedShop.description ||
									"No description provided."}
							</p>
						</div>

						{/* Amenities */}
						<div
							className={`p-4 rounded-lg ${
								isDarkMode ? "bg-gray-700" : "bg-orange-50"
							}`}>
							<h3 className="text-lg font-semibold mb-4 text-orange-600">
								Amenities
							</h3>
							<div className="flex flex-wrap gap-2">
								{selectedShop.amenities.wifi && (
									<Badge
										variant="outline"
										className="bg-blue-100 text-blue-800 border-blue-300">
										WiFi Available
									</Badge>
								)}
								{selectedShop.amenities.parking && (
									<Badge
										variant="outline"
										className="bg-green-100 text-green-800 border-green-300">
										Parking Available
									</Badge>
								)}
								{!selectedShop.amenities.wifi &&
									!selectedShop.amenities.parking && (
										<p className="text-gray-500">
											No amenities listed
										</p>
									)}
							</div>
						</div>

						{/* Barbers Section */}
						<div
							className={`p-4 rounded-lg ${
								isDarkMode ? "bg-gray-700" : "bg-orange-50"
							}`}>
							<h3 className="text-lg font-semibold mb-4 text-orange-600">
								Barbers
							</h3>
							{selectedShop.barbers &&
							selectedShop.barbers.length > 0 ? (
								<div className="grid grid-cols-1 md:grid-cols-3 gap-3">
									{selectedShop.barbers.map(
										(barber, index) => (
											<div
												key={index}
												className={`flex items-center gap-2 p-2 rounded-md border ${
													isDarkMode
														? "bg-gray-600 border-gray-500"
														: "bg-white border-gray-200"
												}`}>
												<Avatar className="h-8 w-8 bg-orange-100">
													<AvatarFallback className="bg-orange-100 text-orange-800">
														{barber
															.substring(0, 2)
															.toUpperCase()}
													</AvatarFallback>
												</Avatar>
												<span
													className={
														isDarkMode
															? "text-white"
															: "text-gray-800"
													}>
													{barber}
												</span>
											</div>
										)
									)}
								</div>
							) : (
								<p className="text-gray-500">
									No barbers assigned to this shop
								</p>
							)}
						</div>
					</div>
				)}

				<DialogFooter className="flex gap-2 mt-4">
					{(selectedShop?.status === "pending" ||
						selectedShop?.status === "blocked") && (
						<>
							<Button
								onClick={() => {
									onOpenChange(false);
									handleConfirmationModal(
										selectedShop,
										"approve"
									);
								}}
								className="bg-green-500 hover:bg-green-600 text-white">
								Approve Shop
							</Button>
							<Button
								onClick={() => {
									onOpenChange(false);
									handleConfirmationModal(
										selectedShop,
										"blocked"
									);
								}}
								className="bg-red-500 hover:bg-red-600 text-white">
								Reject Shop
							</Button>
						</>
					)}
					<Button
						variant="outline"
						onClick={() => onOpenChange(false)}
						className={
							isDarkMode
								? "border-gray-600 text-gray-300"
								: "border-gray-300 text-gray-700"
						}>
						Close
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};
