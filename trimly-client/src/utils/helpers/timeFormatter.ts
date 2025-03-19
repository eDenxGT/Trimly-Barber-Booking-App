export const formatTo12Hour = (time: string): string => {
	if (!time) return "";
	const [hours, minutes] = time.split(":").map(Number);
	const period = hours >= 12 ? "PM" : "AM";
	const formattedHours = hours % 12 || 12;
	return `${formattedHours}:${String(minutes).padStart(2, "0")} ${period}`;
};
