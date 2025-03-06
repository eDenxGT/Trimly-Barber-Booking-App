import { useState } from "react";
import { Outlet } from "react-router-dom";
import { PrivateHeader } from "@/components/headers/PrivateHeader";
import { AppSidebar } from "@/components/common/SideBar";
import { UserRole } from "@/types/UserRoles";

interface ClientLayoutProps {
	userRole?: UserRole;
	userName?: string;
	userLocation?: string;
	userAvatar?: string;
}

export const ClientLayout = ({
	userName = "Eden",
	userLocation = "India",
	userAvatar,
}: ClientLayoutProps) => {
	const [isSideBarVisible, setIsSideBarVisible] = useState(false);
	const [notifications] = useState(2);

	const handleLogout = () => {
		console.log("Logging out...");
		// Add your logout logic here
	};

	return (
		<div className="flex flex-col min-h-screen">
			{/* Header */}
			<PrivateHeader
				className="z-40"
				userName={userName}
				userLocation={userLocation}
        onLogout={handleLogout}
				userAvatar={userAvatar}
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
