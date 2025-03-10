import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { PrivateHeader } from "@/components/headers/PrivateHeader";
import { AppSidebar } from "@/components/sidebars/SideBar";
import { UserRole } from "@/types/UserRoles";
import { useLogout } from "@/hooks/auth/useLogout";
import { useDispatch, useSelector } from "react-redux";
import { useToaster } from "@/hooks/ui/useToaster";
import { RootState } from "@/store/store";
import { barberLogout } from "@/store/slices/barber.slice";
import { logoutBarber } from "@/services/auth/authService";

// interface BarberLayoutProps {
// 	userRole?: UserRole;
// }

export const BarberLayout = () => {
	const [isSideBarVisible, setIsSideBarVisible] = useState(false);
	const [notifications] = useState(2);
	const { successToast, errorToast } = useToaster();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const user = useSelector((state: RootState) => state.barber.barber);
	const { mutate: logoutReq } = useLogout(logoutBarber);

	const handleLogout = () => {
		logoutReq(undefined, {
			onSuccess: (data) => {
				navigate("/barber");
				dispatch(barberLogout());
				successToast(data.message);
			},
			onError: (err: any) => {
				errorToast(err.response.data.message);
			},
		});
	};

	return (
		<div className="flex flex-col min-h-screen">
			{/* Header */}
			<PrivateHeader
				className="z-40"
				userName={user?.firstName}
				// userLocation={user?.location}
				onLogout={handleLogout}
				// userAvatar={userAvatar}
				notifications={notifications}
				onSidebarToggle={() => setIsSideBarVisible(!isSideBarVisible)}
			/>

			{/* Main content area with sidebar and outlet */}
			<AppSidebar
				isVisible={isSideBarVisible}
				onClose={() => setIsSideBarVisible(false)}
				handleLogout={handleLogout}
			/>
			{/* Main content */}
			<Outlet />
		</div>
	);
};
