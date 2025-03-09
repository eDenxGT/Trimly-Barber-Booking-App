import { useState } from "react";
import { TextField, Button } from "@mui/material";
import { Eye, EyeOff } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { useFormik } from "formik";
import BarberToolsBG from "@/assets/common/barber-tools.png";
import BarberHappy from "@/assets/common/barber-pointing.png";
import { PublicHeader } from "../headers/PublicHeader";
import { signinSchema } from "@/utils/validations/signin.validator";
import { UserRole } from "@/types/UserRoles";
import { motion } from "framer-motion";

interface SignInProps {
	userType: UserRole;
	onSubmit: (data: { email: string; password: string }) => void;
	setRegister?: () => void;
	isLoading: boolean;
}

const SignIn = ({
	userType,
	onSubmit,
	setRegister,
	isLoading,
}: SignInProps) => {
	const [showPassword, setShowPassword] = useState(false);

	const formik = useFormik({
		initialValues: {
			email: "",
			password: "",
		},
		validationSchema: signinSchema,
		onSubmit: (values) => {
			console.log(values);
			onSubmit(values);
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
						className="relative z-10 w-[45rem] pb"
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
								Sign in to your account
							</h2>
							<p className="text-muted-foreground mt-2">
								Enter your credentials to continue
							</p>
						</div>

						<form
							className="space-y-4"
							onSubmit={formik.handleSubmit}>
							<div className="flex flex-col gap-4">
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

								{/* Password */}
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
									placeholder="Enter password"
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
							</div>

							{/* Forgot Password & Register Now */}
							<div className="flex items-center justify-between space-x-2">
								<div className="text-sm">
									<a
										href="#"
										className="text-[var(--yellow)] hover:text-[var(--yellow-hover)]">
										Forgot password?
									</a>
								</div>
								{userType !== "admin" && (
									<div className="flex items-center gap-1.5">
										<label
											htmlFor="register"
											className="text-sm text-muted-foreground">
											Don't have an account?{" "}
										</label>
										<span
											onClick={setRegister}
											className="text-[var(--yellow)] hover:text-[var(--yellow-hover)] cursor-pointer">
											Register Now!
										</span>
									</div>
								)}
							</div>

							{/* Submit Button */}
							<Button
								disabled={isLoading}
								loadingPosition="center"
								loading={isLoading}
								type="submit"
								fullWidth
								variant="contained"
								sx={{
									backgroundColor: "var(--yellow)",
									"&:hover": {
										backgroundColor: "var(--yellow-hover)",
									},
								}}>
								Sign In
							</Button>
							
							{/* Social SignIn */}
							{userType !== "admin" && (
								<>
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
												borderColor:
													"var(--yellow-hover)",
												color: "var(--yellow-hover)",
											},
										}}>
										Google
									</Button>
								</>
							)}
						</form>
					</motion.div>
				</div>
			</div>
		</>
	);
};

export default SignIn;
