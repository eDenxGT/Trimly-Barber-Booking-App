import React, { useRef, useState } from "react";
import {
	TextField,
	Button,
	Typography,
	Avatar,
	Paper,
	Grid,
	Container,
	IconButton,
	Box,
	CircularProgress,
	Chip,
} from "@mui/material";
import { Camera, Save, Shield } from "lucide-react";
import { useFormik } from "formik";
import { motion } from "framer-motion";
import { profileUpdateSchema } from "@/utils/validations/profile.validator";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { uploadToCloudinary } from "@/services/cloudinary/cloudinary";
import { useAdminProfileMutation } from "@/hooks/admin/useAdminProfile";
import { useToaster } from "@/hooks/ui/useToaster";
import { adminLogin } from "@/store/slices/admin.slice";

export function AdminProfileEdit() {
	const admin = useSelector((state: RootState) => state.admin.admin);
	const dispatch = useDispatch();
	const { successToast, errorToast } = useToaster();
	const { mutate: updateProfile } = useAdminProfileMutation();

	const [avatar, setAvatar] = useState(admin?.profileImage || "");
	const [newAvatar, setNewAvatar] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);
	const uploadedImageUrl = useRef<string | undefined>(undefined);

	const styles = {
		textField: {
			mb: 2,
			"& .MuiOutlinedInput-root": {
				"&:hover fieldset": {
					borderColor: "var(--primary)",
				},
				"&.Mui-focused fieldset": {
					borderColor: "var(--primary)",
				},
			},
			"& .MuiInputLabel-root.Mui-focused": {
				color: "var(--primary)",
			},
			"& .MuiFormHelperText-root": {
				fontSize: "0.75rem",
				lineHeight: "1rem",
				minHeight: "1rem",
			},
		},
      button: {
         backgroundColor: "var(--yellow)",
         "&:hover": {
           backgroundColor: "var(--yellow-hover)",
         },
         mt: 2,
       },
       avatarContainer: {
         display: "flex",
         flexDirection: "column",
         alignItems: "center",
         justifyContent: "center",
         mb: { xs: 3, md: 0 },
       },
       avatar: {
         width: 150,
         height: 150,
         boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
         border: "4px solid white",
       },
       cameraButton: {
         position: "absolute",
         bottom: 5,
         right: 5,
         backgroundColor: "var(--yellow)",
         color: "white",
         "&:hover": {
           backgroundColor: "var(--yellow-hover)",
         },
         width: 36,
         height: 36,
       },
		formContainer: {
			p: 4,
			borderRadius: 2,
		},
		formTitle: {
			mb: 2,
			fontWeight: "bold",
			color: "#333",
		},
		adminChip: {
			backgroundColor: "var(--primary-light)",
			color: "var(--primary-dark)",
			fontWeight: "bold",
			mb: 4,
		},
		roleInfo: {
			display: "flex",
			alignItems: "center",
			mb: 1,
			color: "text.secondary",
		},
	};

	const formik = useFormik({
		initialValues: {
			firstName: admin?.firstName || "",
			lastName: admin?.lastName || "",
			email: admin?.email || "",
			phoneNumber: admin?.phoneNumber || "",
			profileImageFile: null as File | null,
			profileImage: admin?.profileImage || "",
		},
		validationSchema: profileUpdateSchema,
		onSubmit: async (values) => {
			setLoading(true);

			try {
				if (values.profileImageFile) {
					const uploadedUrl = await uploadToCloudinary(
						values.profileImageFile
					);
					if (!uploadedUrl) {
						errorToast("Failed to upload image");
						setLoading(false);
						return;
					}
					uploadedImageUrl.current = uploadedUrl;
					formik.setFieldValue("profileImage", uploadedUrl, false);
				}

				if (newAvatar) {
					setAvatar(newAvatar);
					setNewAvatar(null);
				}

				updateProfile(
					{
						...values,
						profileImage:
							uploadedImageUrl.current || values.profileImage,
					},
					{
						onSuccess: (data) => {
							successToast(data.message);
							dispatch(adminLogin(data.user));
						},
						onError: (error: any) => {
							errorToast(
								error.response?.data?.message || "Update failed"
							);
						},
					}
				);
			} catch (error) {
				console.error("Profile update failed:", error);
				errorToast("An unexpected error occurred");
			} finally {
				setLoading(false);
			}
		},
	});

	const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			const file = e.target.files[0];
			formik.setFieldValue("profileImageFile", file);

			const reader = new FileReader();
			reader.onload = (event) => {
				if (event.target?.result) {
					setNewAvatar(event.target.result as string);
				}
			};
			reader.readAsDataURL(file);
		}
	};

	return (
		<Container maxWidth="md" sx={{ py: 5, mt: 6 }}>
			<motion.div
				initial={{ y: 20, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ duration: 0.4 }}>
				<Paper elevation={3} sx={styles.formContainer}>
					<Typography
						variant="h4"
						component="h1"
						sx={styles.formTitle}>
						Edit Profile
					</Typography>

					<form onSubmit={formik.handleSubmit}>
						<Grid container spacing={4}>
							{/* Avatar Section */}
							<Grid
								item
								xs={12}
								md={4}
								sx={styles.avatarContainer}>
								<Box sx={{ position: "relative", mb: 2 }}>
									<Avatar
										src={newAvatar || avatar}
										alt={`${admin?.firstName} ${admin?.lastName}`}
										sx={styles.avatar}
									/>
									<IconButton
										sx={styles.cameraButton}
										component="label"
										aria-label="Upload new profile picture">
										<Camera size={18} />
										<input
											type="file"
											hidden
											accept="image/*"
											onChange={handleAvatarChange}
										/>
									</IconButton>
								</Box>
								<Typography
									variant="body2"
									color="text.secondary"
									align="center">
									Update profile picture
								</Typography>

								<Box sx={{ mt: 3, width: "100%" }}>
									<Box sx={styles.roleInfo}>
										<Shield
											size={16}
											style={{
												marginRight: "8px",
											}}
										/>
										<Typography variant="body2">
											Is Super Admin:{" "}
											{admin?.isSuperAdmin ? "Yes" : "No"}
										</Typography>
									</Box>
								</Box>
							</Grid>

							{/* Form Fields Section */}
							<Grid item xs={12} md={8}>
								<Grid container spacing={2}>
									<Grid item xs={12} sm={6}>
										<TextField
											fullWidth
											id="firstName"
											name="firstName"
											label="First Name"
											value={formik.values.firstName}
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											error={
												formik.touched.firstName &&
												Boolean(formik.errors.firstName)
											}
											helperText={
												formik.touched.firstName
													? formik.errors.firstName
													: ""
											}
											variant="outlined"
											sx={styles.textField}
										/>
									</Grid>
									<Grid item xs={12} sm={6}>
										<TextField
											fullWidth
											id="lastName"
											name="lastName"
											label="Last Name"
											value={formik.values.lastName}
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											error={
												formik.touched.lastName &&
												Boolean(formik.errors.lastName)
											}
											helperText={
												formik.touched.lastName
													? formik.errors.lastName
													: ""
											}
											variant="outlined"
											sx={styles.textField}
										/>
									</Grid>
									<Grid item xs={12}>
										<TextField
											fullWidth
											id="email"
											name="email"
											label="Email"
											type="email"
											value={formik.values.email}
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											error={
												formik.touched.email &&
												Boolean(formik.errors.email)
											}
											helperText={
												formik.touched.email
													? formik.errors.email
													: ""
											}
											variant="outlined"
											sx={styles.textField}
										/>
									</Grid>
									<Grid item xs={12}>
										<TextField
											fullWidth
											id="phoneNumber"
											name="phoneNumber"
											label="Phone Number"
											value={formik.values.phoneNumber}
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											error={
												formik.touched.phoneNumber &&
												Boolean(
													formik.errors.phoneNumber
												)
											}
											helperText={
												formik.touched.phoneNumber
													? formik.errors.phoneNumber
													: ""
											}
											variant="outlined"
											sx={styles.textField}
										/>
									</Grid>
								</Grid>
							</Grid>

							{/* Submit Button Section */}
							<Grid
								item
								xs={12}
								sx={{
									mt: 2,
									display: "flex",
									justifyContent: "flex-end",
								}}>
								<Button
									type="submit"
									variant="contained"
									size="large"
									disabled={loading}
									startIcon={
										loading ? (
											<CircularProgress
												size={20}
												color="inherit"
											/>
										) : (
											<Save />
										)
									}
									sx={styles.button}>
									{loading ? "Saving..." : "Save Changes"}
								</Button>
							</Grid>
						</Grid>
					</form>
				</Paper>
			</motion.div>
		</Container>
	);
}
