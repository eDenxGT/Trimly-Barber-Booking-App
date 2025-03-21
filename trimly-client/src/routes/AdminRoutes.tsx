import ForgotPassword from "@/components/auth/ForgotPassword";
import ResetPassword from "@/components/auth/ResetPassword";
import { AdminAuth } from "@/pages/admin/AdminAuth";
import { AdminBarberManagement } from "@/pages/admin/AdminBarberManagement";
import { AdminClientManagement } from "@/pages/admin/AdminClientManagement";
import { AdminDashboard } from "@/pages/admin/AdminDashboard";
import { AdminChangePassword } from "@/pages/admin/settings/AdminChangePassword";
import { AdminProfileEdit } from "@/pages/admin/settings/AdminEditProfile";
import { AdminSettingsPage } from "@/pages/admin/settings/AdminSettings";
import { AdminLayout } from "@/pages/layouts/AdminLayout";
import { ProtectedRoute } from "@/utils/protected/ProtectedRoute";
import { NoAuthRoute } from "@/utils/protected/PublicRoute";
import { Route, Routes } from "react-router-dom";

export const AdminRoutes = () => {
	return (
		<Routes>
			<Route index element={<NoAuthRoute element={<AdminAuth />} />} />
			<Route
				path="/"
				element={
					<ProtectedRoute
						allowedRoles={["admin"]}
						element={<AdminLayout />}
					/>
				}>
				<Route path="dashboard" element={<AdminDashboard />} />
				<Route path="clients" element={<AdminClientManagement />} />
				<Route path="barbers" element={<AdminBarberManagement />} />
				<Route path="settings" element={<AdminSettingsPage />} />
				<Route
					path="settings/change-password"
					element={<AdminChangePassword />}
				/>
				<Route path="settings/profile" element={<AdminProfileEdit />} />
			</Route>

			{/*//? Forgot and reset pages */}
			<Route
				path="/forgot-password"
				element={
					<NoAuthRoute
						element={
							<ForgotPassword role="admin" signInPath="/admin" />
						}
					/>
				}
			/>
			<Route
				path="/reset-password/:token"
				element={
					<NoAuthRoute
						element={
							<ResetPassword role="admin" signInPath="/admin" />
						}
					/>
				}
			/>
		</Routes>
	);
};
