import { AdminAuth } from "@/pages/admin/AdminAuth";
import { AdminDashboard } from "@/pages/admin/AdminDashboard";
import { AdminLayout } from "@/pages/layouts/AdminLayout";
import { AdminAuthRoute } from "@/utils/protected/ProtectedRoute";
import { NoAdminAuthRoute } from "@/utils/protected/PublicRoute";
import { Route, Routes } from "react-router-dom";

export const AdminRoutes = () => {
	return (
		<Routes>
			<Route
				index
				element={<NoAdminAuthRoute element={<AdminAuth />} />}
			/>
			<Route
				path="/"
				element={
					<AdminAuthRoute
						allowedRoles={["admin"]}
						element={<AdminLayout />}
					/>
				}>
				<Route path="dashboard" element={<AdminDashboard />} />
			</Route>
		</Routes>
	);
};
