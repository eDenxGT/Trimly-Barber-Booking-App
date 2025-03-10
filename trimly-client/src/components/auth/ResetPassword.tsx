import { useState } from "react";
import { TextField, Button as MuiButton } from "@mui/material";
import { ArrowLeft, CheckCircle, Eye, EyeOff } from "lucide-react";
import { useFormik } from "formik";
import { motion } from "framer-motion";
import { PublicHeader } from "../headers/PublicHeader";
import { passwordSchema } from "@/utils/validations/password.validator";
import { useNavigate, useParams } from "react-router-dom";
import { useResetPasswordMutation } from "@/hooks/auth/useResetPassword";
import { useToaster } from "@/hooks/ui/useToaster";
import BarberToolsBG from "@/assets/common/barber-tools.png";
import BarberWithPhone from "@/assets/common/barber-with-phone.png";

interface ResetPasswordProps {
	role: string;
	signInPath: string;
}

const ResetPassword = ({
	role,
	signInPath,
}: ResetPasswordProps) => {
	const { token } = useParams();
	const [passwordReset, setPasswordReset] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	
	const navigate = useNavigate();
	const { successToast, errorToast } = useToaster();
	const { mutate: resetPasswordReq, isPending } = useResetPasswordMutation();
	
	const handleResetPasswordSubmit = (password: string) => {
		resetPasswordReq(
			{ password, role, token },
			{
				onSuccess: (data) => {
					successToast(data.message);
					setPasswordReset(true);
				},
				onError: (error: any) => {
					errorToast(error.response.data.message);
				},
			}
		);
	};
	
	const formik = useFormik({
		initialValues: {
			password: "",
			confirmPassword: "",
		},
		validationSchema: passwordSchema,
		onSubmit: (values) => {
			handleResetPasswordSubmit(values.password);
		},
	});

	return (
		<>
			<PublicHeader />
			<div className="min-h-screen flex flex-col md:flex-row">
				{/* Left Section with Image */}
				<div className="hidden md:flex w-1/2 bg-[var(--bg-yellow)] relative overflow-hidden justify-center items-end">
					<div className="absolute inset-0 pattern-bg opacity-10"></div>
					<img
						src={BarberToolsBG}
						alt="background"
						className="absolute inset-0 w-full h-full object-cover brightness-90"
					/>
					<motion.img
						initial={{ scale: 1.1 }}
						animate={{ scale: 1 }}
						transition={{ duration: 2 }}
						src={BarberWithPhone}
						alt="Thinking person"
						className="relative z-10 w-[40rem]"
					/>
				</div>

				{/* Right Section with Form */}
				<div className="w-full md:w-1/2 p-6 md:p-12 flex flex-col justify-center bg-white">
					<motion.div
						initial={{ y: 20, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						transition={{ delay: 0.2 }}
						className="max-w-md mx-auto w-full space-y-8">
						{/* Go Back Link */}
						<button
							onClick={() => navigate(signInPath)}
							className="flex items-center text-muted-foreground hover:text-yellow-600 transition-colors">
							<ArrowLeft className="mr-1 h-4 w-4" />
							Back to Sign In
						</button>

						{passwordReset ? (
							// Success State
							<motion.div
								initial={{ opacity: 0, scale: 0.95 }}
								animate={{ opacity: 1, scale: 1 }}
								className="text-center space-y-6">
								<CheckCircle className="mx-auto h-16 w-16 text-green-500" />
								<div>
									<h2 className="text-3xl font-bold tracking-tight mb-2">
										Password Reset Complete
									</h2>
									<p className="text-muted-foreground">
										Your password has been successfully
										reset. You can now log in with your new
										password.
									</p>
								</div>
								<MuiButton
									onClick={() => navigate(signInPath)}
									fullWidth
									variant="contained"
									sx={{
										backgroundColor: "var(--yellow)",
										"&:hover": {
											backgroundColor:
												"var(--yellow-hover)",
										},
									}}>
									Go to Sign in
								</MuiButton>
							</motion.div>
						) : (
							// Form State
							<>
								<div className="text-center mb-8">
									<h2 className="text-3xl font-bold tracking-tight">
										Reset Your Password
									</h2>
									<p className="text-muted-foreground mt-2">
										Please enter your new password below
									</p>
								</div>

								<form
									className="space-y-6"
									onSubmit={formik.handleSubmit}>
									<div className="flex flex-col gap-5">
										{/* Password */}
										<TextField
											id="password"
											name="password"
											type={
												showPassword
													? "text"
													: "password"
											}
											error={
												formik.touched.password &&
												Boolean(formik.errors.password)
											}
											helperText={
												formik.touched.password
													? formik.errors.password
													: ""
											}
											value={formik.values.password}
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											fullWidth
											label="Password"
											placeholder="Enter your new password"
											variant="outlined"
											InputProps={{
												endAdornment: (
													<button
														type="button"
														onClick={() =>
															setShowPassword(
																!showPassword
															)
														}
														className="text-gray-500">
														{showPassword ? (
															<EyeOff className="h-5 w-5" />
														) : (
															<Eye className="h-5 w-5" />
														)}
													</button>
												),
											}}
											sx={{
												"& .MuiOutlinedInput-root": {
													"&:hover fieldset": {
														borderColor:
															"var(--yellow)",
													},
													"&.Mui-focused fieldset": {
														borderColor:
															"var(--yellow)",
													},
												},
												"& .MuiInputLabel-root.Mui-focused":
													{
														color: "var(--yellow)",
													},
												"& .MuiFormHelperText-root": {
													fontSize: "0.75rem",
													lineHeight: "1rem",
													minHeight: "1rem",
												},
											}}
										/>

										{/* Confirm Password */}
										<TextField
											id="confirmPassword"
											name="confirmPassword"
											type={
												showConfirmPassword
													? "text"
													: "password"
											}
											error={
												formik.touched
													.confirmPassword &&
												Boolean(
													formik.errors
														.confirmPassword
												)
											}
											helperText={
												formik.touched.confirmPassword
													? formik.errors
															.confirmPassword
													: ""
											}
											value={
												formik.values.confirmPassword
											}
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											fullWidth
											label="Confirm Password"
											placeholder="Confirm your new password"
											variant="outlined"
											InputProps={{
												endAdornment: (
													<button
														type="button"
														onClick={() =>
															setShowConfirmPassword(
																!showConfirmPassword
															)
														}
														className="text-gray-500">
														{showConfirmPassword ? (
															<EyeOff className="h-5 w-5" />
														) : (
															<Eye className="h-5 w-5" />
														)}
													</button>
												),
											}}
											sx={{
												"& .MuiOutlinedInput-root": {
													"&:hover fieldset": {
														borderColor:
															"var(--yellow)",
													},
													"&.Mui-focused fieldset": {
														borderColor:
															"var(--yellow)",
													},
												},
												"& .MuiInputLabel-root.Mui-focused":
													{
														color: "var(--yellow)",
													},
												"& .MuiFormHelperText-root": {
													fontSize: "0.75rem",
													lineHeight: "1rem",
													minHeight: "1rem",
												},
											}}
										/>
									</div>

									{/* Submit Button */}
									<MuiButton
										disabled={isPending}
										type="submit"
										fullWidth
										variant="contained"
										loading={isPending}
										sx={{
											backgroundColor: "var(--yellow)",
											"&:hover": {
												backgroundColor:
													"var(--yellow-hover)",
											},
										}}>
										Reset Password
									</MuiButton>
								</form>
							</>
						)}
					</motion.div>
				</div>
			</div>
		</>
	);
};

export default ResetPassword;
