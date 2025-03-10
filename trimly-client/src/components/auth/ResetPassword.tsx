import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, CheckCircle, Eye, EyeOff } from "lucide-react";
import { useFormik } from "formik";
import { motion } from "framer-motion";
import { PublicHeader } from "../headers/PublicHeader";
import { passwordSchema } from "@/utils/validations/password.validator";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useResetPasswordMutation } from "@/hooks/auth/useResetPassword";
import { useToaster } from "@/hooks/ui/useToaster";
import BarberToolsBG from "@/assets/common/barber-tools.png";

interface ResetPasswordProps {
	role: string;
	signInPath: string;
}

const ResetPassword = ({ role, signInPath }: ResetPasswordProps) => {
	const [searchParams] = useSearchParams();
	const token = searchParams.get("token") || "";
	const [passwordReset, setPasswordReset] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	const {
		mutate: resetPasswordReq,
		isPending,
		isSuccess,
		isError,
	} = useResetPasswordMutation();
	const navigate = useNavigate();
	const { successToast, errorToast } = useToaster();

	const getForgotRedirectUrl = () => {
		switch (role) {
			case "admin":
				return "/admin";
			case "barber":
				return "/barber";
			default:
				return "/";
		}
	};

	const formik = useFormik({
		initialValues: {
			password: "",
			confirmPassword: "",
		},
		validationSchema: passwordSchema,
		onSubmit: (values) => {
			handleResetPasswordSubmit(values);
		},
	});

	const handleResetPasswordSubmit = ({ password }: { password: string }) => {
		resetPasswordReq(
			{ password, role },
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

	if (!token) {
		return (
			<>
				<PublicHeader />
				<div className="min-h-screen flex items-center justify-center p-6">
					<div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
						<h2 className="text-2xl font-bold mb-4">
							Invalid or Expired Link
						</h2>
						<p className="text-gray-600 mb-6">
							This password reset link is invalid or has expired.
							Please request a new password reset link.
						</p>
						<Button
							onClick={() =>
								navigate(
									getForgotRedirectUrl() + "/forgot-password"
								)
							}
							className="w-full">
							Request New Link
						</Button>
					</div>
				</div>
			</>
		);
	}

	return (
		<>
			<PublicHeader />
			<div className="min-h-screen flex flex-col md:flex-row">
				{/* Left Section with Image */}
				<div className="hidden md:flex w-1/2 bg-yellow-100 relative overflow-hidden justify-center items-end">
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
						src="/placeholder.svg"
						alt="Thinking person"
						className="relative z-10 w-[30rem]"
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
								<Button
									onClick={() => navigate(signInPath)}
									className="w-full bg-yellow-500 hover:bg-yellow-600">
									Go to Login
								</Button>
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
									<div className="space-y-4">
										{/* Password */}
										<div className="space-y-2">
											<Label htmlFor="password">
												Password
											</Label>
											<div className="relative">
												<Input
													id="password"
													name="password"
													type={
														showPassword
															? "text"
															: "password"
													}
													placeholder="Enter your new password"
													className={cn(
														"pr-10",
														formik.touched
															.password &&
															formik.errors
																.password
															? "border-red-500"
															: ""
													)}
													value={
														formik.values.password
													}
													onChange={
														formik.handleChange
													}
													onBlur={formik.handleBlur}
												/>
												<button
													type="button"
													onClick={() =>
														setShowPassword(
															!showPassword
														)
													}
													className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
													{showPassword ? (
														<EyeOff className="h-5 w-5" />
													) : (
														<Eye className="h-5 w-5" />
													)}
												</button>
											</div>
											{formik.touched.password &&
												formik.errors.password && (
													<p className="text-red-500 text-sm mt-1">
														{formik.errors.password}
													</p>
												)}
										</div>

										{/* Confirm Password */}
										<div className="space-y-2">
											<Label htmlFor="confirmPassword">
												Confirm Password
											</Label>
											<div className="relative">
												<Input
													id="confirmPassword"
													name="confirmPassword"
													type={
														showConfirmPassword
															? "text"
															: "password"
													}
													placeholder="Confirm your new password"
													className={cn(
														"pr-10",
														formik.touched
															.confirmPassword &&
															formik.errors
																.confirmPassword
															? "border-red-500"
															: ""
													)}
													value={
														formik.values
															.confirmPassword
													}
													onChange={
														formik.handleChange
													}
													onBlur={formik.handleBlur}
												/>
												<button
													type="button"
													onClick={() =>
														setShowConfirmPassword(
															!showConfirmPassword
														)
													}
													className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
													{showConfirmPassword ? (
														<EyeOff className="h-5 w-5" />
													) : (
														<Eye className="h-5 w-5" />
													)}
												</button>
											</div>
											{formik.touched.confirmPassword &&
												formik.errors
													.confirmPassword && (
													<p className="text-red-500 text-sm mt-1">
														{
															formik.errors
																.confirmPassword
														}
													</p>
												)}
										</div>
									</div>

									{/* Submit Button */}
									<Button
										disabled={
											isPending && !isSuccess && !isError
										}
										type="submit"
										className="w-full bg-yellow-500 hover:bg-yellow-600">
										{isPending && !isSuccess && !isError
											? "Resetting..."
											: "Reset Password"}
									</Button>
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
