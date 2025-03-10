import { Route, Routes } from "react-router-dom";
import { ClientAuth } from "@/pages/client/ClientAuth";
import { ClientLayout } from "@/pages/layouts/ClientLayout";
import ClientHomePage from "@/pages/client/ClientHomePage";
import { AuthRoute } from "@/utils/protected/ProtectedRoute";
import { NoAuthRoute } from "@/utils/protected/PublicRoute";
import ForgotPassword from "@/components/auth/ForgotPassword";
import ResetPassword from "@/components/auth/ResetPassword";

export const ClientRoutes = () => {
	return (
		<Routes>
			<Route index element={<NoAuthRoute element={<ClientAuth />} />} />
			<Route
				path="/forgot-password"
				element={
					<NoAuthRoute
						element={
							<ForgotPassword role="client" signInPath="/" />
						}
					/>
				}
			/>
			<Route
				path="/reset-password/:token"
				element={
					<NoAuthRoute
						element={<ResetPassword role="client" signInPath="/" />}
					/>
				}
			/>
			<Route
				path="/"
				element={
					<AuthRoute
						allowedRoles={["client"]}
						element={<ClientLayout />}
					/>
				}>
				<Route path="home" element={<ClientHomePage />} />
			</Route>
		</Routes>
	);
};
