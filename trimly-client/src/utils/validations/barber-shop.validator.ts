import * as Yup from "yup";

export const barberShopValidationSchema = Yup.object({
	name: Yup.string().required("Shop name is required"),
	description: Yup.string().required("Description is required"),
	address: Yup.object().shape({
		display: Yup.string().required("Location is required"), 	
	}),

	contactNumber: Yup.string()
		.matches(/^\+?[1-9]\d{9}$/, "Invalid phone number")
		.required("Contact number is required"),
	email: Yup.string()
		.email("Please enter a valid email address")
		.required("Email is required"),
	website: Yup.string().url("Invalid URL format"),
	daysOpen: Yup.array().of(Yup.string()).min(1, "Select at least one day"),
	openingTime: Yup.string().required("Opening time is required"),
	closingTime: Yup.string().required("Closing time is required"),
});
