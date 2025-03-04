import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import { PublicRoutes } from "./components/routes/PublicRoutes";
import { ClientRoutes } from "./routes/ClientRoutes";
import ScrollToTop from "./utils/ScrollToTop";

function App() {
	return (
		<Router>
      <ScrollToTop />
			<Routes>
				<Route path="/*" element={<ClientRoutes />} />
        {/* <Route path="/barber/*" element={<VendorRoutes />} /> */}
				{/* <Route path="/admin/*" element={<AdminRoutes />} />
        <Route path="/unauthorized" element={<UnauthorizedPage />} /> */}
			</Routes>
		</Router>
	);
}

export default App;
