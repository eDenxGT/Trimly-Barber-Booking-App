import * as Yup from "yup";

export const profileUpdateSchema = Yup.object({
	firstName: Yup.string()
		.matches(/^[a-zA-Z]+$/, "First name should only contain letters")
		.min(2, "First name must be at least 2 characters")
		.max(50, "First name must not exceed 50 characters")
		.required("First name is required"),
	lastName: Yup.string()
		.matches(/^[a-zA-Z]+$/, "Last name should only contain letters")
		.min(1, "Last name must be at least 1 characters")
		.max(50, "Last name must not exceed 50 characters")
		.required("Last name is required"),
	email: Yup.string()
		.email("Please enter a valid email address")
		.required("Email is required"),
	phoneNumber: Yup.string()
		.matches(/^\+?[1-9]\d{9}$/, "Invalid phone number")
		.required("Contact number is required"),
	location: Yup.object().shape({
		name: Yup.string().max(100, "Location cannot exceed 100 characters"),
		latitude: Yup.number().nullable(),
		longitude: Yup.number().nullable(),
	}),
});
