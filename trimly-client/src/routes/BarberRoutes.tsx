import BarberAuth from "@/pages/barber/BarberAuth";
import { NoBarberAuthRoute } from "@/utils/protected/PublicRoute";
import { Route, Routes } from "react-router-dom";

export const BarberRoutes = () => {
	return (
		<Routes>
			<Route
				index
				element={<NoBarberAuthRoute element={<BarberAuth />} />}
			/>
         {/* <Route  */}
		</Routes>
	);
};
