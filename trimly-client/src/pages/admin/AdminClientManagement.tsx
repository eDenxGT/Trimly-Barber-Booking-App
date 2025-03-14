import type React from "react";
import { useState, useEffect } from "react";
import { useAllUsersQuery } from "@/hooks/admin/useAllUsers";
import { getAllUsers } from "@/services/admin/adminService";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Search, Edit, Trash2, AlertCircle } from "lucide-react";
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { debounce } from "lodash";
import ConfirmationModal from "@/components/modals/ConfirmationModal";
import { Pagination1 } from "@/components/common/paginations/Pagination1";

export interface IClient {
	_id: string;
	firstName: string;
	lastName: string;
	email: string;
	phoneNumber: string;
	status: string;
}

export type ClientsData = {
	clients: IClient[];
	totalPages: number;
};

export const AdminClientManagement: React.FC = () => {
	const [searchQuery, setSearchQuery] = useState("");
	const [debouncedSearch, setDebouncedSearch] = useState(searchQuery);
	const [currentPage, setCurrentPage] = useState(1);
	const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
	const [clientToDelete, setClientToDelete] = useState<IClient | null>(null);
	const [statusDialogOpen, setStatusDialogOpen] = useState(false);
	const [clientToUpdateStatus, setClientToUpdateStatus] =
		useState<IClient | null>(null);
	const limit = 10;

	useEffect(() => {
		const handler = debounce(() => setDebouncedSearch(searchQuery), 300);
		handler();
		return () => handler.cancel();
	}, [searchQuery]);

	const { data, isLoading, isError } = useAllUsersQuery<ClientsData>(
		getAllUsers,
		currentPage,
		limit,
		debouncedSearch,
		"client"
	);

	const clients = (data?.users as ClientsData) || [];
	const totalPages = data?.totalPages || 1;

	const handleDeleteClick = (client: IClient) => {
		setClientToDelete(client);
		setDeleteDialogOpen(true);
	};

	const handleStatusClick = (client: IClient) => {
		setClientToUpdateStatus(client);
		setStatusDialogOpen(true);
	};

	const confirmDelete = () => {
		console.log("Deleting client:", clientToDelete?._id);
		setDeleteDialogOpen(false);
		setClientToDelete(null);
	};

	const confirmStatusChange = () => {
		console.log("Updating status for client:", clientToUpdateStatus?._id);
		console.log(
			"New status:",
			clientToUpdateStatus?.status === "active" ? "inactive" : "active"
		);
		setStatusDialogOpen(false);
		setClientToUpdateStatus(null);
	};

	const getInitials = (firstName: string, lastName: string) => {
		return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
	};

	return (
		<div className="min-h-screen mt-14 bg-gray-50">
			<div className="container mx-auto px-4 py-8">
				<h1 className="text-3xl font-bold mb-6 text-gray-800">
					Client Management
				</h1>

				{/* Search Input */}
				<div className="mb-6 flex items-center relative">
					<Search
						className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
						size={18}
					/>
					<Input
						type="text"
						placeholder="Search clients..."
						value={searchQuery}
						onChange={(e) => {
							setSearchQuery(e.target.value);
							setCurrentPage(1);
						}}
						className="pl-10 bg-white border border-gray-200 rounded-md"
					/>
				</div>

				{/* Clients Table */}
				{isLoading ? (
					<div className="text-center py-8">
						<p className="text-gray-500">Loading clients...</p>
					</div>
				) : isError ? (
					<div className="text-center py-8">
						<p className="text-red-500">Failed to load clients.</p>
					</div>
				) : clients.length === 0 ? (
					<div className="text-center py-8">
						<p className="text-gray-500">No clients found.</p>
					</div>
				) : (
					<div className="bg-white rounded-lg shadow overflow-hidden">
						<Table>
							<TableHeader className="bg-gray-50">
								<TableRow>
									<TableHead className="w-12">#</TableHead>
									<TableHead>Client</TableHead>
									<TableHead>Email</TableHead>
									<TableHead>Status</TableHead>
									<TableHead className="text-right">
										Actions
									</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{clients.map((client, index) => (
									<TableRow
										key={client._id}
										className="hover:bg-gray-50">
										<TableCell className="font-medium">
											{(currentPage - 1) * limit +
												index +
												1}
										</TableCell>
										<TableCell>
											<div className="flex items-center gap-3">
												<Avatar className="h-10 w-10 bg-gray-200">
													<AvatarFallback>
														{getInitials(
															client.firstName,
															client.lastName
														)}
													</AvatarFallback>
												</Avatar>
												<div>
													<p className="font-medium">{`${client.firstName} ${client.lastName}`}</p>
													{client.phoneNumber && (
														<p className="text-sm text-gray-500">
															{client.phoneNumber}
														</p>
													)}
												</div>
											</div>
										</TableCell>
										<TableCell className="text-gray-600">
											{client.email}
										</TableCell>
										<TableCell>
											<Button
												variant={
													client.status === "active"
														? "outline"
														: "destructive"
												}
												size="sm"
												className={
													client.status === "active"
														? "bg-green-50 text-green-600 hover:bg-green-100 border-green-200"
														: "bg-red-50 text-red-600 hover:bg-red-100 border-red-200"
												}
												onClick={() =>
													handleStatusClick(client)
												}>
												{client.status === "active"
													? "Active"
													: "Inactive"}
											</Button>
										</TableCell>
										<TableCell className="text-right">
											<div className="flex justify-end gap-2">
												<Button
													variant="ghost"
													size="icon"
													className="h-8 w-8 text-gray-500 hover:text-red-600"
													onClick={() =>
														handleDeleteClick(
															client
														)
													}>
													<Trash2 className="h-4 w-4" />
													<span className="sr-only">
														Delete
													</span>
												</Button>
											</div>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</div>
				)}

				{/* Pagination */}
				<div className="mt-6 flex justify-center items-center">
					<Pagination1
						currentPage={currentPage}
						totalPages={totalPages}
						onPageNext={() => setCurrentPage(currentPage + 1)}
						onPagePrev={() => setCurrentPage(currentPage - 1)}
					/>
				</div>
				<ConfirmationModal />
			</div>
		</div>
	);
};
