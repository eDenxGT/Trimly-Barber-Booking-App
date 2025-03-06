import { useRegisterMutation } from "@/hooks/auth/useRegister";
import { ILoginData, User } from "@/types/User";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SignUp from "@/components/auth/SignUp";
import SignIn from "@/components/auth/SignIn";
import { useToaster } from "@/hooks/ui/useToaster";
import { useLoginMutation } from "@/hooks/auth/useLogin";
import { useDispatch } from "react-redux";
import { clientLogin } from "@/store/slices/client.slice";
import { useNavigate } from "react-router-dom";

export const ClientAuth = () => {
	const [isLogin, setIsLogin] = useState(false);
	const dispatch = useDispatch();
	const navigate = useNavigate()

	const { mutate: loginClient } = useLoginMutation();
	const { mutate: registerClient } = useRegisterMutation();

	const { errorToast, successToast } = useToaster();

	const handleSignUpSubmit = (data: Omit<User, "role">) => {
		registerClient(
			{ ...data, role: "client" },
			{
				onSuccess: (data) => successToast(data.message),
				onError: (error: any) =>
					errorToast(error.response.data.message),
			}
		);
		setIsLogin(true);
	};
	const handleLoginSubmit = (data: Omit<ILoginData, "role">) => {
		loginClient(
			{ ...data, role: "client" },
			{
				onSuccess: (data) => {
					successToast(data.message);
					dispatch(clientLogin(data.user));
					navigate("/home")
				},
				onError: (error: any) => {
					errorToast(error.response.data.message);
				},
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
							userType="client"
							onSubmit={handleLoginSubmit}
							setRegister={() => setIsLogin(false)}
						/>
					) : (
						<SignUp
							userType="client"
							onSubmit={(data) => handleSignUpSubmit(data)}
							setLogin={() => setIsLogin(true)}
						/>
					)}
				</motion.div>
			</AnimatePresence>
		</>
	);
};
