import { useRegisterMutation } from "@/hooks/auth/useRegister";
import { ILoginData, User } from "@/types/User";
import { useState } from "react";
import { toast } from "react-toastify";
import { AnimatePresence, motion } from 'framer-motion';
import SignUp from "@/components/auth/SignUp";
import SignIn from "@/components/auth/SignIn";

export const ClientAuth = () => {
	const [isLogin, setIsLogin] = useState(false);
	const { mutate: registerClient } = useRegisterMutation();

	const handleSignUpSubmit = (data: Omit<User, "role">) => {
		console.log(data)
		registerClient(
			{ ...data, role: "client" },
			{
				onSuccess: (data) => toast.success(data.message),
				onError: (error: any) =>
					toast.error(error.response.data.message),
			}
		);
		setIsLogin(true);
	};
   const handleLoginSubmit = (data: Omit<ILoginData, "role">) => {
      console.log(data)
   }

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
							onSubmit={(data)=>handleSignUpSubmit(data)}
							setLogin={() => setIsLogin(true)}
						/>
					)}
				</motion.div>
			</AnimatePresence>
		</>
	);
};
