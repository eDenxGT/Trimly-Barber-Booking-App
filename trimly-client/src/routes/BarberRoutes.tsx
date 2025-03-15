import ForgotPassword from "@/components/auth/ForgotPassword";
import ResetPassword from "@/components/auth/ResetPassword";
import BarberAuth from "@/pages/barber/BarberAuth";
import { BarberDashboard } from "@/pages/barber/BarberDashboard";
import { BarberChangePassword } from "@/pages/barber/settings/BarberChangePassword";
import { BarberSettingsPage } from "@/pages/barber/settings/BarberSettings";
import { BarberLayout } from "@/pages/layouts/BarberLayout";
import { BarberAuthRoute } from "@/utils/protected/ProtectedRoute";
import { NoBarberAuthRoute } from "@/utils/protected/PublicRoute";
import { Route, Routes } from "react-router-dom";

export const BarberRoutes = () => {
	return (
		<Routes>
			<Route
				index
				element={<NoBarberAuthRoute element={<BarberAuth />} />}
			/>
			<Route
				path="/"
				element={
					<BarberAuthRoute
						allowedRoles={["barber"]}
						element={<BarberLayout />}
					/>
				}>
				<Route path="dashboard" element={<BarberDashboard />} />
				<Route path="settings" element={<BarberSettingsPage />} />
				<Route
					path="settings/change-password"
					element={<BarberChangePassword />}
				/>
			</Route>

			{/*//? Forgot and reset pages */}
			<Route
				path="/forgot-password"
				element={
					<NoBarberAuthRoute
						element={
							<ForgotPassword
								role="barber"
								signInPath="/barber"
							/>
						}
					/>
				}
			/>
			<Route
				path="/reset-password/:token"
				element={
					<NoBarberAuthRoute
						element={
							<ResetPassword role="barber" signInPath="/barber" />
						}
					/>
				}
			/>
		</Routes>
	);
};
