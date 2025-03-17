import SignIn from "@/components/auth/SignIn";
import SignUp from "@/components/auth/SignUp";
import { useGoogleMutation } from "@/hooks/auth/useGoogle";
import { useLoginMutation } from "@/hooks/auth/useLogin";
import { useRegisterMutation } from "@/hooks/auth/useRegister";
import { useToaster } from "@/hooks/ui/useToaster";
import { barberLogin } from "@/store/slices/barber.slice";
import { ILoginData, User } from "@/types/User";
import { CredentialResponse } from "@react-oauth/google";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const BarberAuth = () => {
	const [isLogin, setIsLogin] = useState(true);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { mutate: registerBarber, isPending: isRegisterPending } =
		useRegisterMutation();
	const { mutate: loginBarber, isPending: isLoginPending } =
		useLoginMutation();
	const { mutate: googleLogin } = useGoogleMutation();

	const { errorToast, successToast } = useToaster();

	const googleAuth = (credentialResponse: CredentialResponse) => {
		googleLogin(
			{
				credential: credentialResponse.credential,
				client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
				role: "barber",
			},
			{
				onSuccess: (data) => {
					successToast(data.message);
					console.log(data)
					dispatch(barberLogin(data.user));
					navigate("/barber/dashboard");
				},
				onError: (error: any) =>
					errorToast(error.response.data.message),
			}
		);
	};

	const handleSignUpSubmit = (data: Omit<User, "role">) => {
		registerBarber(
			{ ...data, role: "barber" },
			{
				onSuccess: (data) => successToast(data.message),
				onError: (error: any) =>
					errorToast(error.response.data.message),
			}
		);
	};

	const handleLoginSubmit = (data: Omit<ILoginData, "role">) => {
		loginBarber(
			{
				...data,
				role: "barber",
			},
			{
				onSuccess: (data) => {
					successToast(data.message);
					dispatch(barberLogin(data.user));
					navigate("/barber/dashboard");
				},
				onError: (error: any) =>
					errorToast(error.response.data.message),
			}
		);
	};

	return (
		<>
			<AnimatePresence mode="wait">
				<motion.div
					key={isLogin ? "login" : "signup"}
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: -20 }}
					transition={{ duration: 0.5 }}>
					{isLogin ? (
						<SignIn
							userType="barber"
							onSubmit={handleLoginSubmit}
							setRegister={() => setIsLogin(false)}
							isLoading={isLoginPending}
							handleGoogleAuth={googleAuth}
						/>
					) : (
						<SignUp
							userType="barber"
							onSubmit={handleSignUpSubmit}
							setLogin={() => setIsLogin(true)}
							isLoading={isRegisterPending}
							handleGoogleAuth={googleAuth}
						/>
					)}
				</motion.div>
			</AnimatePresence>
		</>
	);
};

export default BarberAuth;
