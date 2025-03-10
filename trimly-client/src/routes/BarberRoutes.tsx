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
