import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

interface ProtectedRouteProps {
	element: JSX.Element;
	allowedRoles: string[];
}

export const AuthRoute = ({ element, allowedRoles }: ProtectedRouteProps) => {
	const userRole = useSelector(
		(state: RootState) => state.client.client?.role
	);
	if (!userRole) {
		return <Navigate to="/" />;
	}

	return allowedRoles.includes(userRole) ? (
		element
	) : (
		<Navigate to="/unauthorized" />
	);
};

export const BarberAuthRoute = ({
	element,
	allowedRoles,
}: ProtectedRouteProps) => {
	const userRole = useSelector(
		(state: RootState) => state.barber.barber?.role
	);
	if (!userRole) {
		return <Navigate to="/" />;
	}

	return allowedRoles.includes(userRole) ? (
		element
	) : (
		<Navigate to="/unauthorized" />
	);
};

export const AdminAuthRoute = ({
	element,
	allowedRoles,
}: ProtectedRouteProps) => {
	const userRole = useSelector((state: RootState) => state.admin.admin?.role);
	if (!userRole) {
		return <Navigate to="/" />;
	}

	return allowedRoles.includes(userRole) ? (
		element
	) : (
		<Navigate to="/unauthorized" />
	);
};
