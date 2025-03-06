import { Route, Routes } from "react-router-dom";
import { ClientAuth } from "@/pages/client/ClientAuth";
import { ClientLayout } from "@/pages/layouts/ClientLayout";
import ClientHomePage from "@/pages/client/ClientHomePage";
import { AuthRoute } from "@/utils/protected/ProtectedRoute";
import { NoAuthRoute } from "@/utils/protected/PublicRoute";

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
			</Route>
		</Routes>
	);
};
