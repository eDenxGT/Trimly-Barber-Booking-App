import { useState } from "react";
import {
	Box,
	Button,
	Card,
	CardContent,
	CardHeader,
	Container,
	Divider,
	FormControlLabel,
	IconButton,
	Stack,
	Switch,
	Typography,
} from "@mui/material";
import {
	Notifications as NotificationsIcon,
	ChevronRight,
	LockOutlined,
	Logout,
	Settings,
	DeleteOutline,
	Person,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import ConfirmationModal from "@/components/modals/ConfirmationModal";
import { useToaster } from "@/hooks/ui/useToaster";
import { useLogout } from "@/hooks/auth/useLogout";
import { logoutAdmin } from "@/services/auth/authService";
import { useDispatch } from "react-redux";
import { adminLogout } from "@/store/slices/admin.slice";

export function AdminSettingsPage() {
	const [emailNotifications, setEmailNotifications] = useState(true);
	const [appNotifications, setAppNotifications] = useState(true);
	const [marketingEmails, setMarketingEmails] = useState(false);
	const [confirmDelete, setConfirmDelete] = useState(false);
	const [confirmLogout, setConfirmLogout] = useState(false);

	const dispatch = useDispatch();
	const { mutate: logoutReq } = useLogout(logoutAdmin);
	const { successToast, errorToast } = useToaster();

	const handleLogout = () => {
		logoutReq(undefined, {
			onSuccess: (data) => {
				navigate("/admin");
				setConfirmLogout(false);
				dispatch(adminLogout());
				successToast(data.message);
			},
			onError: (err: any) => {
				errorToast(err.response.data.message);
			},
		});
	};

	const navigate = useNavigate();

	return (
		<Container maxWidth="md" sx={{ py: 5, mt: 6 }}>
			<Box sx={{ mb: 4 }}>
				<Typography variant="h4" component="h1" fontWeight="bold">
					Settings
				</Typography>
				<Typography color="text.secondary">
					Manage your account settings and preferences.
				</Typography>
			</Box>

			<Stack spacing={3}>
				<Card elevation={1}>
					<CardHeader
						avatar={<Person />}
						title="Profile"
						subheader="Manage your profile information"
					/>
					<CardContent>
						<Box
							display="flex"
							justifyContent="space-between"
							alignItems="center">
							<Typography variant="subtitle1">
								Personal Information
							</Typography>
							<IconButton
								onClick={() =>
									navigate("/admin/settings/profile")
								}>
								<ChevronRight />
							</IconButton>
						</Box>
					</CardContent>
				</Card>

				<Card elevation={1}>
					<CardHeader
						avatar={<LockOutlined />}
						title="Security"
						subheader="Manage your account security"
					/>
					<CardContent>
						<Box
							display="flex"
							justifyContent="space-between"
							alignItems="center">
							<Typography variant="subtitle1">
								Change Password
							</Typography>
							<IconButton
								onClick={() =>
									navigate("/admin/settings/change-password")
								}>
								<ChevronRight />
							</IconButton>
						</Box>
					</CardContent>
				</Card>

				<Card elevation={1}>
					<CardHeader
						avatar={<NotificationsIcon />}
						title="Notifications"
						subheader="Manage notifications settings"
					/>
					<CardContent>
						<Stack spacing={2}>
							<FormControlLabel
								control={
									<Switch
										checked={emailNotifications}
										onChange={(e) =>
											setEmailNotifications(
												e.target.checked
											)
										}
									/>
								}
								label="Email Notifications"
							/>
							<FormControlLabel
								control={
									<Switch
										checked={appNotifications}
										onChange={(e) =>
											setAppNotifications(
												e.target.checked
											)
										}
									/>
								}
								label="App Notifications"
							/>
							<FormControlLabel
								control={
									<Switch
										checked={marketingEmails}
										onChange={(e) =>
											setMarketingEmails(e.target.checked)
										}
									/>
								}
								label="Marketing Emails"
							/>
						</Stack>
					</CardContent>
				</Card>

				<Card
					elevation={1}
					sx={{
						borderColor: "error.light",
						borderWidth: 1,
						borderStyle: "solid",
					}}>
					<CardHeader
						avatar={<Settings color="error" />}
						title="Account Actions"
						subheader="Manage your account"
					/>
					<CardContent>
						<Stack spacing={2}>
							<Box
								display="flex"
								justifyContent="space-between"
								alignItems="center">
								<Typography variant="subtitle1">
									Logout
								</Typography>
								<Button
									variant="outlined"
									startIcon={<Logout />}
									size="small"
									onClick={() => setConfirmLogout(true)}>
									Logout
								</Button>
							</Box>
							<Divider />
							<Box
								display="flex"
								justifyContent="space-between"
								alignItems="center">
								<Typography variant="subtitle1" color="error">
									Delete Account
								</Typography>
								<Button
									variant="contained"
									color="error"
									startIcon={<DeleteOutline />}
									size="small"
									onClick={() => setConfirmDelete(true)}>
									Delete
								</Button>
							</Box>
						</Stack>
					</CardContent>
				</Card>
			</Stack>

			<ConfirmationModal
				isOpen={confirmDelete}
				onClose={() => setConfirmDelete(false)}
				onConfirm={() => setConfirmDelete(false)}
				title="Are you sure you want to delete your account?"
				description="This action cannot be undone. Your account and data will be permanently deleted."
				confirmText="Delete"
				cancelText="Cancel"
				icon="danger"
			/>

			<ConfirmationModal
				isOpen={confirmLogout}
				onClose={() => setConfirmLogout(false)}
				onConfirm={handleLogout}
				title="Are you sure you want to logout?"
				description="You will be logged out of your account."
				confirmText="Logout"
				cancelText="Cancel"
				icon="logout"
			/>
		</Container>
	);
}
