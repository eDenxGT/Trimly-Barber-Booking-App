import { Route, Routes } from "react-router-dom";
import { ClientAuth } from "@/pages/client/ClientAuth";
import { ClientLayout } from "@/pages/layouts/ClientLayout";
import ClientHomePage from "@/pages/client/ClientHomePage";
import { AuthRoute } from "@/utils/protected/ProtectedRoute";
import { NoAuthRoute } from "@/utils/protected/PublicRoute";
import ForgotPassword from "@/components/auth/ForgotPassword";
import ResetPassword from "@/components/auth/ResetPassword";
import { ClientSettingsPage } from "@/pages/client/settings/ClientSettings";
import { ClientChangePassword } from "@/pages/client/settings/ClientChangePassword";

export const ClientRoutes = () => {
	return (
		<Routes>
			<Route index element={<NoAuthRoute element={<ClientAuth />} />} />
			<Route
				path="/"
				element={
					<AuthRoute
						allowedRoles={["client"]}
						element={<ClientLayout />}
					/>
				}>
				<Route path="home" element={<ClientHomePage />} />
				<Route path="settings" element={<ClientSettingsPage />} />
				<Route path="settings/change-password" element={<ClientChangePassword />} />
			</Route>
			
			{/*//? Forgot and reset pages */}
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
		</Routes>
	);
};
