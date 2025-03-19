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
} from "@mui/material";
import { Camera, Save } from "lucide-react";
import { useFormik } from "formik";
import { motion } from "framer-motion";
import { LocationInputField } from "@/components/common/fields/LocationInputField";
import { profileUpdateSchema } from "@/utils/validations/profile.validator";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { uploadToCloudinary } from "@/services/cloudinary/cloudinary";
import { useClientProfileMutation } from "@/hooks/client/useClientProfile";
import { useToaster } from "@/hooks/ui/useToaster";
import { clientLogin } from "@/store/slices/client.slice";

export function ClientProfileEdit() {
	const client = useSelector((state: RootState) => state.client.client);

	const [avatar, setAvatar] = useState(client?.profileImage || "");
	const [newAvatar, setNewAvatar] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);
	const { successToast, errorToast } = useToaster();
	const uploadedImageUrl = useRef<string | undefined>(undefined);
	const dispatch = useDispatch();

	const { mutate: updateProfile } = useClientProfileMutation();

	const formik = useFormik({
		initialValues: {
			firstName: client?.firstName || "",
			lastName: client?.lastName || "",
			email: client?.email || "",
			phoneNumber: client?.phoneNumber || "",
			profileImageFile: null as File | null,
			profileImage: client?.profileImage || "",
			location: client?.location || {
				name: "",
				latitude: null as number | null,
				longitude: null as number | null,
			},
		},
		validationSchema: profileUpdateSchema,
		onSubmit: async (values) => {
			setLoading(true);

			if (values.profileImageFile) {
				try {
					const uploadedUrl = await uploadToCloudinary(
						values.profileImageFile
					);
					if (!uploadedUrl) {
						setLoading(false);
						return;
					}
					uploadedImageUrl.current = uploadedUrl;
					formik.setFieldValue("profileImage", uploadedUrl, false);
					formik.setFieldValue("profileImageFile", null, false);
				} catch (error) {
					console.error("Upload failed:", error);

					setLoading(false);
					return;
				}
			}

			if (newAvatar) {
				setAvatar(newAvatar);
				setNewAvatar(null);
			}
			handleUpdateClientProfile();

			setLoading(false);
		},
	});

	const handleUpdateClientProfile = async () => {
		updateProfile(
			{
				...formik.values,
				profileImage: uploadedImageUrl.current,
			},
			{
				onSuccess: (data) => {
					successToast(data.message);
					console.log(data);
					dispatch(clientLogin(data.user));
				},
				onError: (error: any) => {
					errorToast(error.response.data.message);
				},
			}
		);
	};

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

	const textFieldStyle = {
		"& .MuiOutlinedInput-root": {
			"&:hover fieldset": {
				borderColor: "var(--yellow)",
			},
			"&.Mui-focused fieldset": {
				borderColor: "var(--yellow)",
			},
		},
		"& .MuiInputLabel-root.Mui-focused": {
			color: "var(--yellow)",
		},
		"& .MuiFormHelperText-root": {
			fontSize: "0.75rem",
			lineHeight: "1rem",
			minHeight: "1rem",
		},
	};

	const buttonStyle = {
		backgroundColor: "var(--yellow)",
		"&:hover": {
			backgroundColor: "var(--yellow-hover)",
		},
	};

	return (
		<Container maxWidth="md" sx={{ py: 5, mt: 6 }}>
			<motion.div
				initial={{ y: 20, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ delay: 0.2 }}>
				<Paper elevation={3} sx={{ p: 4, mt: 4 }}>
					<Typography variant="h4" component="h1" gutterBottom>
						Edit Profile
					</Typography>

					<form onSubmit={formik.handleSubmit}>
						<Grid container spacing={4}>
							<Grid
								item
								xs={12}
								md={4}
								sx={{
									display: "flex",
									flexDirection: "column",
									alignItems: "center",
								}}>
								<Box sx={{ position: "relative", mb: 2 }}>
									<Avatar
										src={newAvatar || avatar}
										alt="Profile Avatar"
										sx={{ width: 150, height: 150 }}
									/>
									<IconButton
										sx={{
											position: "absolute",
											bottom: 0,
											right: 0,
											backgroundColor: "var(--yellow)",
											color: "white",
											"&:hover": {
												backgroundColor:
													"var(--yellow-hover)",
											},
										}}
										component="label">
										<Camera size={20} />
										<input
											type="file"
											hidden
											accept="image/*"
											onChange={handleAvatarChange}
										/>
									</IconButton>
								</Box>

								{newAvatar && (
									<Box sx={{ textAlign: "center", mb: 2 }}>
										<Typography
											variant="body2"
											color="text.secondary"
											gutterBottom>
											New avatar preview
										</Typography>
										<Button
											size="small"
											variant="outlined"
											color="error"
											onClick={() => setNewAvatar(null)}>
											Cancel
										</Button>
									</Box>
								)}
							</Grid>

							<Grid item xs={12} md={8}>
								<Grid container spacing={2}>
									<Grid item xs={12} sm={6}>
										<TextField
											fullWidth
											id="firstName"
											name="firstName"
											label="First Name"
											placeholder="Enter your first name"
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
											sx={textFieldStyle}
										/>
									</Grid>
									<Grid item xs={12} sm={6}>
										<TextField
											fullWidth
											id="lastName"
											name="lastName"
											label="Last Name"
											placeholder="Enter your last name"
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
											sx={textFieldStyle}
										/>
									</Grid>
									<Grid item xs={12}>
										<TextField
											fullWidth
											id="email"
											name="email"
											label="Email Address"
											placeholder="Enter your email"
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
											sx={textFieldStyle}
										/>
									</Grid>
									<Grid item xs={12}>
										<TextField
											fullWidth
											id="phoneNumber"
											name="phoneNumber"
											label="Phone Number"
											placeholder="Enter your phone number"
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
											sx={textFieldStyle}
										/>
									</Grid>
									<Grid item xs={12}>
										<LocationInputField
											initialValue={
												formik.values?.location?.name
											}
											placeholder="Search location..."
											onSelect={(loc) => {
												formik.setFieldValue(
													"location",
													{
														name: loc.display,
														latitude: loc.lat,
														longitude: loc.lon,
														details: loc.details,
													}
												);
											}}
											onChange={(value) => {
												formik.setFieldValue(
													"location",
													{
														...formik.values
															.location,
														name: value,
													}
												);
											}}
										/>
										{/* {formik.values.location.latitude &&
											formik.values.location
												.longitude && (
												<Typography
													variant="caption"
													color="text.secondary">
													Coordinates:{" "}
													{formik.values.location.latitude.toFixed(
														6
													)}
													,{" "}
													{formik.values.location.longitude.toFixed(
														6
													)}
												</Typography>
											)} */}
									</Grid>
								</Grid>
							</Grid>

							<Grid
								item
								xs={12}
								sx={{
									display: "flex",
									justifyContent: "flex-end",
								}}>
								<Button
									type="submit"
									variant="contained"
									size="large"
									disabled={loading}
									startIcon={<Save />}
									sx={buttonStyle}>
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
