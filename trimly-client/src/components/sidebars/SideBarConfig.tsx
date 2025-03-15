import { Home, LayoutDashboard, Settings, Users } from "lucide-react";

const navItems = {
	client: [
		{
			title: "Home",
			icon: Home,
			path: "/home",
		},
		// {
		// 	title: "Courses",
		// 	icon: <BookOpenText className="h-5 w-5" />,
		// 	href: "/student/courses",
		// },
		// {
		// 	title: "My Courses",
		// 	icon: <BookCheck className="h-5 w-5" />,
		// 	link: "/student/my-courses",
		// },
		// {
		// 	title: "Tutors",
		// 	icon: <FaChalkboardTeacher className="h-5 w-5" />,
		// 	href: "/student/tutors",
		// },
		// {
		// 	title: "Chat",
		// 	icon: <MessageCircleMore className="h-5 w-5" />,
		// 	href: "/student/chat",
		// },
		// {
		// 	title: "Wishlist",
		// 	icon: <Heart className="h-5 w-5" />,
		// 	href: "/student/wishlist",
		// },
		// {
		// 	title: "Purchases",
		// 	icon: <ShoppingBag className="h-5 w-5" />,
		// 	href: "/student/purchases",
		// },
		{
			title: "Settings",
			icon: Settings,
			path: "/settings",
		},
	],
	barber: [
		{
			title: "Dashboard",
			icon: LayoutDashboard,
			path: "/tutor/dashboard",
		},
		// {
		// 	title: "Create New Course",
		// 	icon: <PlusCircle className="h-5 w-5" />,
		// 	href: "/tutor/courses/new",
		// },
		// {
		// 	title: "My Courses",
		// 	icon: <BookOpen className="h-5 w-5" />,
		// 	href: "/tutor/my-courses",
		// },
		// {
		// 	title: "Earning",
		// 	icon: <DollarSign className="h-5 w-5" />,
		// 	href: "/tutor/earnings",
		// },
		// {
		// 	title: "Quiz",
		// 	icon: <ClipboardList className="h-5 w-5" />,
		// 	href: "/tutor/quiz",
		// },
		// {
		// 	title: "Chat",
		// 	icon: <MessageCircleMore className="h-5 w-5" />,
		// 	href: "/tutor/chat",
		// },
		{
			title: "Settings",
			icon: Settings,
			path: "/barber/settings",
		},
	],
	admin: [
		{
			title: "Dashboard",
			icon: LayoutDashboard,
			path: "/admin/dashboard",
		},
		// {
		// 	title: "Courses",
		// 	icon: <BookOpen className="h-5 w-5" />,
		// 	link: "/admin/courses",
		// },
		// {
		// 	title: "Categories",
		// 	icon: <Layers className="h-5 w-5" />,
		// 	link: "/admin/categories",
		// },
		// {
		// 	title: "Orders",
		// 	icon: <ShoppingBag className="h-5 w-5" />,
		// 	link: "/admin/orders",
		// },
		{
			title: "Manage Clients",
			icon: Users,
			path: "/admin/clients",
		},
		{
			title: "Manage Barbers",
			icon: Users,
			path: "/admin/barbers",
		},
		// {
		// 	title: "Manage Tutors",
		// 	icon: <Users className="h-5 w-5" />,
		// 	link: "/admin/tutors",
		// },
		// {
		// 	title: "Tutor Applications",
		// 	icon: <NotepadText className="h-5 w-5" />,
		// 	link: "/admin/tutors/applications",
		// },
		// {
		// 	title: "Tutor Withdrawals",
		// 	icon: <PiHandWithdrawDuotone className="h-5 w-5" />,
		// 	link: "/admin/tutors/withdrawals",
		// },
		{
			title: "Settings",
			icon: Settings,
			path: "/admin/settings",
		},
	],
};

export default navItems;
