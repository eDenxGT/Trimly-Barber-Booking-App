import ForgotPassword from "@/components/auth/ForgotPassword";
import ResetPassword from "@/components/auth/ResetPassword";
import BarberAuth from "@/pages/barber/BarberAuth";
import { BarberDashboard } from "@/pages/barber/BarberDashboard";
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
			<Route
				path="/"
				element={
					<BarberAuthRoute
						allowedRoles={["barber"]}
						element={<BarberLayout />}
					/>
				}>
				<Route path="dashboard" element={<BarberDashboard />} />
			</Route>
		</Routes>
	);
};
