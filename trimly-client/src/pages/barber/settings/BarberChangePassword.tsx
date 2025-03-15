import { useState } from "react";
import {
	TextField,
	Button,
	Typography,
	Paper,
	Grid,
	Container,
	InputAdornment,
	IconButton,
} from "@mui/material";
import { Eye, EyeOff, Save } from "lucide-react";
import { useFormik } from "formik";
import { motion } from "framer-motion";
import { changePasswordSchema } from "@/utils/validations/change.password.validator";
import {
	UpdatePasswordData,
	useBarberPasswordUpdateMutation,
} from "@/hooks/barber/useBarberPassword";
import { useToaster } from "@/hooks/ui/useToaster";
import { useNavigate } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";

export function BarberChangePassword() {
	const [showOldPassword, setShowOldPassword] = useState(false);
	const [showNewPassword, setShowNewPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	const navigate = useNavigate();

	const {
		mutate: changeBarberPassword,
		isPending,
		isError,
		isSuccess,
	} = useBarberPasswordUpdateMutation();
	const { successToast, errorToast } = useToaster();

	const handleSubmit = ({ oldPassword, newPassword }: UpdatePasswordData) => {
		changeBarberPassword(
			{
				oldPassword,
				newPassword,
			},
			{
				onSuccess: (data) => {
					successToast(data.message);
					formik.resetForm();
				},
				onError: (error: any) => {
					errorToast(error.response.data.message);
				},
			}
		);
	};

	const formik = useFormik({
		initialValues: {
			oldPassword: "",
			newPassword: "",
			confirmPassword: "",
		},
		validationSchema: changePasswordSchema,
		onSubmit: (values) => {
			handleSubmit({
				oldPassword: values.oldPassword,
				newPassword: values.newPassword,
			});
		},
	});

	return (
		<Container className="mt-16" maxWidth="sm">
			<motion.div
				initial={{ y: 20, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ delay: 0.2 }}>
				<Paper elevation={3} sx={{ p: 4, mt: 4 }}>
					<Grid
						container
						spacing={2}
						sx={{ mb: 2 }}
						alignItems="stretch">
						<Grid item>
							<IconButton
								sx={{
									minWidth: "auto",
									padding: "4px",
									color: "white",
									position: "relative",
									backgroundColor: "var(--yellow)",
									"&:hover": {
										backgroundColor: "var(--yellow-hover)",
									},
								}}
								onClick={() => navigate(-1)}>
								<ArrowBack className="h-4 w-4" />
							</IconButton>
						</Grid>
						<Grid item>
							<Typography
								variant="h5"
								component="h1"
								gutterBottom>
								Change Password
							</Typography>
						</Grid>
					</Grid>

					<form onSubmit={formik.handleSubmit}>
						<Grid container spacing={3}>
							<Grid item xs={12}>
								<TextField
									fullWidth
									id="oldPassword"
									name="oldPassword"
									label="Current Password"
									placeholder="Enter your current password"
									type={showOldPassword ? "text" : "password"}
									value={formik.values.oldPassword}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									error={
										formik.touched.oldPassword &&
										Boolean(formik.errors.oldPassword)
									}
									helperText={
										formik.touched.oldPassword
											? formik.errors.oldPassword
											: ""
									}
									variant="outlined"
									InputProps={{
										endAdornment: (
											<InputAdornment position="end">
												<button
													type="button"
													onClick={() =>
														setShowOldPassword(
															!showOldPassword
														)
													}
													className="text-muted-foreground hover:text-foreground"
													style={{
														background: "none",
														border: "none",
														cursor: "pointer",
													}}>
													{showOldPassword ? (
														<EyeOff className="h-5 w-5" />
													) : (
														<Eye className="h-5 w-5" />
													)}
												</button>
											</InputAdornment>
										),
									}}
									sx={{
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
									}}
								/>
							</Grid>

							<Grid item xs={12}>
								<TextField
									fullWidth
									id="newPassword"
									name="newPassword"
									label="New Password"
									placeholder="Enter your new password"
									type={showNewPassword ? "text" : "password"}
									value={formik.values.newPassword}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									error={
										formik.touched.newPassword &&
										Boolean(formik.errors.newPassword)
									}
									helperText={
										formik.touched.newPassword
											? formik.errors.newPassword
											: "Password must be at least 8 characters"
									}
									variant="outlined"
									InputProps={{
										endAdornment: (
											<InputAdornment position="end">
												<button
													type="button"
													onClick={() =>
														setShowNewPassword(
															!showNewPassword
														)
													}
													className="text-muted-foreground hover:text-foreground"
													style={{
														background: "none",
														border: "none",
														cursor: "pointer",
													}}>
													{showNewPassword ? (
														<EyeOff className="h-5 w-5" />
													) : (
														<Eye className="h-5 w-5" />
													)}
												</button>
											</InputAdornment>
										),
									}}
									sx={{
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
									}}
								/>
							</Grid>

							<Grid item xs={12}>
								<TextField
									fullWidth
									id="confirmPassword"
									name="confirmPassword"
									label="Confirm New Password"
									placeholder="Confirm your new password"
									type={
										showConfirmPassword
											? "text"
											: "password"
									}
									value={formik.values.confirmPassword}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									error={
										formik.touched.confirmPassword &&
										Boolean(formik.errors.confirmPassword)
									}
									helperText={
										formik.touched.confirmPassword
											? formik.errors.confirmPassword
											: ""
									}
									variant="outlined"
									InputProps={{
										endAdornment: (
											<InputAdornment position="end">
												<button
													type="button"
													onClick={() =>
														setShowConfirmPassword(
															!showConfirmPassword
														)
													}
													className="text-muted-foreground hover:text-foreground"
													style={{
														background: "none",
														border: "none",
														cursor: "pointer",
													}}>
													{showConfirmPassword ? (
														<EyeOff className="h-5 w-5" />
													) : (
														<Eye className="h-5 w-5" />
													)}
												</button>
											</InputAdornment>
										),
									}}
									sx={{
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
									}}
								/>
							</Grid>

							<Grid
								item
								xs={12}
								sx={{
									display: "flex",
									justifyContent: "flex-end",
									mt: 2,
								}}>
								<Button
									type="submit"
									variant="contained"
									size="large"
									disabled={
										!formik.isValid ||
										!formik.dirty ||
										(isPending && !isError && !isSuccess)
									}
									startIcon={<Save />}
									sx={{
										backgroundColor: "var(--yellow)",
										"&:hover": {
											backgroundColor:
												"var(--yellow-hover)",
										},
									}}>
									{isPending && !isError && !isSuccess
										? "Updating..."
										: "Update Password"}
								</Button>
							</Grid>
						</Grid>
					</form>
				</Paper>
			</motion.div>
		</Container>
	);
}
