import ForgotPassword from "@/components/auth/ForgotPassword";
import ResetPassword from "@/components/auth/ResetPassword";
import BarberAuth from "@/pages/barber/BarberAuth";
import { BarberDashboard } from "@/pages/barber/BarberDashboard";
import { BarberChangePassword } from "@/pages/barber/settings/BarberChangePassword";
import { BarberProfileEdit } from "@/pages/barber/settings/BarberEditProfile";
import { BarberSettingsPage } from "@/pages/barber/settings/BarberSettings";
import { BarberLayout } from "@/pages/layouts/BarberLayout";
import { ProtectedRoute } from "@/utils/protected/ProtectedRoute";
import { NoAuthRoute } from "@/utils/protected/PublicRoute";
import { Route, Routes } from "react-router-dom";

export const BarberRoutes = () => {
	return (
		<Routes>
			<Route
				index
				element={<NoAuthRoute element={<BarberAuth />} />}
			/>
			<Route
				path="/"
				element={
					<ProtectedRoute
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
				<Route
					path="settings/profile"
					element={<BarberProfileEdit />}
				/>
			</Route>

			{/*//? Forgot and reset pages */}
			<Route
				path="/forgot-password"
				element={
					<NoAuthRoute
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
					<NoAuthRoute
						element={
							<ResetPassword role="barber" signInPath="/barber" />
						}
					/>
				}
			/>
		</Routes>
	);
};
