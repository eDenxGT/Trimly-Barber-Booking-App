import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { JSX } from "react";

interface ProtectedRouteProps {
	element: JSX.Element;
	allowedRoles: string[];
}

const getActiveSession = (state: RootState) => {
	if (state.client.client) return { role: state.client.client.role, type: "client" };
	if (state.barber.barber) return { role: state.barber.barber.role, type: "barber" };
	if (state.admin.admin) return { role: state.admin.admin.role, type: "admin" };
	return null;
};

export const ProtectedRoute = ({ element, allowedRoles }: ProtectedRouteProps) => {
	const session = useSelector((state: RootState) => getActiveSession(state));

	if (!session) return <Navigate to="/" />;

	if (!allowedRoles.includes(session.role)) return <Navigate to="/unauthorized" />;

	return element;
};
