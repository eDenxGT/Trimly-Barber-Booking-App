import { useState } from "react";
import { motion } from "framer-motion";
import { TextField, Button } from "@mui/material";
import { Eye, EyeOff } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import BarberToolsBG from "@/assets/common/barber-tools.png";
import BarberHappy from "@/assets/common/barber-happy.png";
import { UserRole } from "@/types/UserRoles";
import { User } from "@/types/User";
import { useFormik } from "formik";
import { signupSchema } from "@/utils/validations/signup.validator";
import { PublicHeader } from "../headers/PublicHeader";
import OTPModal from "../modals/OTPModal";
import { useSendOTPMutation } from "@/hooks/auth/useSendOTP";
import { useVerifyOTPMutation } from "@/hooks/auth/useVerifyOTP";
import { useToaster } from "@/hooks/ui/useToaster";
import { Spinner } from "../common/progress/Spinner";

interface SignUpProps {
	userType: UserRole;
	onSubmit: (data: User) => void;
	setLogin?: () => void;
	isLoading: boolean;
}

const SignUp = ({ userType, onSubmit, setLogin, isLoading }: SignUpProps) => {
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [isOTPModalOpen, setIsOTPModalOpen] = useState(false);
	const [isSending, setIsSending] = useState(false);
	const [userData, setUserData] = useState<User>({} as User);

	const { mutate: sendVerificationOTP, isPending: isSendOtpPending } =
		useSendOTPMutation();
	const { mutate: verifyOTP, isPending: isVerifyOtpPending } =
		useVerifyOTPMutation();
	const { successToast, errorToast } = useToaster();

	const submitRegister = () => {
		onSubmit(userData);
	};

	const handleOpenOTPModal = () => {
		setIsOTPModalOpen(true);
	};

	const handleCloseOTPModal = () => {
		setIsSending(false);
		setIsOTPModalOpen(false);
	};

	const handleSendOTP = (email?: string) => {
		setIsSending(() => true);
		sendVerificationOTP(email ?? userData.email, {
			onSuccess(data) {
				successToast(data.message);
				setIsSending(false);
				handleOpenOTPModal();
			},
			onError(error: any) {
				errorToast(error.response.data.message);
				// handleCloseOTPModal();
			},
		});
	};

	const handleVerifyOTP = (otp: string) => {
		verifyOTP(
			{ email: userData.email, otp },
			{
				onSuccess(data) {
					// successToast(data.message);
					submitRegister();
					handleCloseOTPModal();
				},
				onError(error: any) {
					errorToast(error.response.data.message);
				},
			}
		);
	};

	const formik = useFormik({
		initialValues: {
			firstName: "",
			lastName: "",
			email: "",
			phoneNumber: "",
			password: "",
			confirmPassword: "",
		},
		validationSchema: signupSchema,
		onSubmit: (values) => {
			setUserData(() => values);
			handleSendOTP(values.email);
		},
	});

	return (
		<>
			<PublicHeader />
			<motion.div className="min-h-screen flex flex-col md:flex-row">
				{/* Left Section with Image */}
				<div className="hidden md:flex w-1/2 bg-[var(--bg-yellow)] relative overflow-hidden justify-center items-end">
					<div className="absolute inset-0 pattern-bg opacity-10"></div>
					<img
						src={BarberToolsBG || "/placeholder.svg"}
						alt="barber-tools-bg"
						className="absolute inset-0 w-full h-full object-cover brightness-90"
					/>
					<motion.img
						initial={{ scale: 1.1 }}
						animate={{ scale: 1 }}
						transition={{ duration: 2 }}
						src={BarberHappy}
						alt="Barber"
						className="relative z-10 w-[40rem] pb"
					/>
				</div>

				{/* Right Section with Form */}
				<div className="w-full md:w-1/2 p-6 md:p-12 flex flex-col justify-center bg-white">
					<motion.div
						initial={{ y: 20, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						transition={{ delay: 0.2 }}
						className="max-w-md mx-auto w-full space-y-8">
						<div className="text-center mb-8">
							<h2 className="text-3xl font-bold tracking-tight">
								Create your{" "}
								{userType === "client" ? "" : userType} account
							</h2>
							<p className="text-muted-foreground mt-2">
								Enter your details to get started
							</p>
						</div>

						<form
							className="space-y-2"
							onSubmit={formik.handleSubmit}>
							<div className="flex flex-col gap-3.5">
								{/* First & Last Name */}
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									<TextField
										id="firstName"
										name="firstName"
										error={
											formik.touched.firstName &&
											Boolean(formik.errors.firstName)
										}
										helperText={
											formik.touched.firstName
												? formik.errors.firstName
												: ""
										}
										value={formik.values.firstName}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										fullWidth
										label="First Name"
										placeholder="John"
										variant="outlined"
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
												{ color: "var(--yellow)" },
											"& .MuiFormHelperText-root": {
												fontSize: "0.75rem",
												lineHeight: "1rem",
												minHeight: "1rem",
											},
										}}
									/>

									<TextField
										id="lastName"
										name="lastName"
										error={
											formik.touched.lastName &&
											Boolean(formik.errors.lastName)
										}
										helperText={
											formik.touched.lastName
												? formik.errors.lastName
												: ""
										}
										value={formik.values.lastName}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										fullWidth
										label="Last Name"
										placeholder="Doe"
										variant="outlined"
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
												{ color: "var(--yellow)" },
											"& .MuiFormHelperText-root": {
												fontSize: "0.75rem",
												lineHeight: "1rem",
												minHeight: "1rem",
											},
										}}
									/>
								</div>

								{/* Email */}
								<TextField
									id="email"
									name="email"
									type="email"
									error={
										formik.touched.email &&
										Boolean(formik.errors.email)
									}
									helperText={
										formik.touched.email
											? formik.errors.email
											: ""
									}
									value={formik.values.email}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									fullWidth
									label="Email"
									placeholder="Enter your email"
									variant="outlined"
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

								{/* Phone */}
								<TextField
									id="phoneNumber"
									name="phoneNumber"
									type="text"
									error={
										formik.touched.phoneNumber &&
										Boolean(formik.errors.phoneNumber)
									}
									helperText={
										formik.touched.phoneNumber
											? formik.errors.phoneNumber
											: ""
									}
									value={formik.values.phoneNumber}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									fullWidth
									label="Phone"
									placeholder="Enter your phone"
									variant="outlined"
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

								{/* Password & Confirm Password */}
								{/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> */}
								<TextField
									id="password"
									name="password"
									type={showPassword ? "text" : "password"}
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
									placeholder="Create password"
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
												className="text-muted-foreground hover:text-foreground">
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

								<TextField
									id="confirmPassword"
									name="confirmPassword"
									type={
										showConfirmPassword
											? "text"
											: "password"
									}
									error={
										formik.touched.confirmPassword &&
										Boolean(formik.errors.confirmPassword)
									}
									helperText={
										formik.touched.confirmPassword
											? formik.errors.confirmPassword
											: ""
									}
									value={formik.values.confirmPassword}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									fullWidth
									label="Confirm Password"
									placeholder="Confirm password"
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
												className="text-muted-foreground hover:text-foreground">
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
								{/* </div> */}
							</div>

							{/* Terms & Conditions */}
							<div className="flex items-center justify-end space-x-2">
								<div className="flex items-center gap-1.5">
									<label
										htmlFor="terms"
										className="text-sm text-muted-foreground">
										Already have an account ?{" "}
									</label>
									<span
										onClick={setLogin}
										className="text-[var(--yellow)] hover:text-[var(--yellow-hover)] cursor-pointer">
										Login Now!
									</span>
								</div>
							</div>

							{/* Submit Button */}
							<Button
								type="submit"
								disabled={
									isLoading ||
									isSendOtpPending ||
									isVerifyOtpPending
								}
								loadingPosition="center"
								loading={
									isLoading ||
									isSendOtpPending ||
									isVerifyOtpPending
								}
								fullWidth
								variant="contained"
								sx={{
									backgroundColor: "var(--yellow)",
									"&:hover": {
										backgroundColor: "var(--yellow-hover)",
									},
								}}>
								Create Account
							</Button>

							{/* Social SignUp */}
							<div className="text-center my-4 text-muted-foreground text-xs">
								OR
							</div>
							<Button
								fullWidth
								variant="outlined"
								startIcon={<FcGoogle />}
								sx={{
									borderColor: "var(--yellow)",
									color: "var(--yellow)",
									"&:hover": {
										borderColor: "var(--yellow-hover)",
										color: "var(--yellow-hover)",
									},
								}}>
								Google
							</Button>
						</form>
					</motion.div>
				</div>
			</motion.div>
			<OTPModal
				isOpen={isOTPModalOpen}
				onClose={handleCloseOTPModal}
				onVerify={handleVerifyOTP}
				onResend={handleSendOTP}
				isSending={isSending}
			/>
		</>
	);
};
export default SignUp;
