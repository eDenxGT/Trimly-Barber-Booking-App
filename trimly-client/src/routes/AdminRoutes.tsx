import ForgotPassword from "@/components/auth/ForgotPassword";
import ResetPassword from "@/components/auth/ResetPassword";
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
				path="/forgot-password"
				element={
					<NoAdminAuthRoute
						element={
							<ForgotPassword role="admin" signInPath="/admin" />
						}
					/>
				}
			/>
			<Route
				path="/reset-password/:token"
				element={
					<NoAdminAuthRoute
						element={
							<ResetPassword role="admin" signInPath="/admin" />
						}
					/>
				}
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
