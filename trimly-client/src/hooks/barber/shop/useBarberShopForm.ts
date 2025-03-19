import { useState } from "react";
import { useFormik } from "formik";
import { useCropImage } from "@/hooks/common/useCropImage";
import { barberShopValidationSchema } from "@/utils/validations/barber-shop.validator";
import { useCreateBarberShop } from "./useCreateBarberShop";
import { useToaster } from "@/hooks/ui/useToaster";

export interface IBarberShopFormValues {
	name: string;
	description: string;
	location: {
		display: string;
		lat?: number;
		lon?: number;
		details?: {
			name?: string;
			city?: string;
			village?: string;
			town?: string;
			county?: string;
			state?: string;
			country?: string;
		};
	};
	contactNumber: string;
	email: string;
	website: string;
	bannerImage: File | null;
	logoImage: File | null;
	daysOpen: string[];
	openingTime: string;
	closingTime: string;
	amenities: {
		wifi: boolean;
		parking: boolean;
	};
}

export const DAYS_OF_WEEK = [
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
	"Sunday",
];

export const useBarberShopForm = () => {
	const [bannerPreview, setBannerPreview] = useState<string | null>(null);
	const [logoPreview, setLogoPreview] = useState<string | null>(null);
	const [selectedDays, setSelectedDays] = useState<string[]>([]);
	const [currentField, setCurrentField] = useState<
		"bannerImage" | "logoImage" | null
	>(null);

	const cropperHook = useCropImage();
	const { mutate: registerShop } = useCreateBarberShop();
	const { successToast, errorToast } = useToaster();

	const handleCreateBarberShopSubmit = (data: IBarberShopFormValues) => {
		registerShop(data, {
			onSuccess: (data) => {
				successToast(data.message);
			},
			onError: (error: any) => {
				errorToast(error.response.data.message);
			},
		});
	};

	const formik = useFormik<IBarberShopFormValues>({
		initialValues: {
			name: "",
			description: "",
			location: {
				display: "",
			},
			contactNumber: "",
			email: "",
			website: "",
			bannerImage: null,
			logoImage: null,
			daysOpen: [],
			openingTime: "",
			closingTime: "",
			amenities: {
				wifi: false,
				parking: false,
			},
		},
		validationSchema: barberShopValidationSchema,
		onSubmit: async (values) => {
			try {
				console.log("Form values:", values);
				handleCreateBarberShopSubmit(values);
			} catch (error) {
				console.log(error);
			}
		},
	});

	const handleImageChange = (
		event: React.ChangeEvent<HTMLInputElement>,
		fieldName: "bannerImage" | "logoImage"
	) => {
		const file = event.target.files?.[0] || null;

		if (file) {
			setCurrentField(fieldName);
			cropperHook.startCropping(file);
		}
	};

	const handleCropApply = async () => {
		if (!currentField) return;

		const result = await cropperHook.cropImage();

		if (result) {
			formik.setFieldValue(currentField, result.file);

			if (currentField === "bannerImage") {
				setBannerPreview(result.preview);
			} else {
				setLogoPreview(result.preview);
			}
		}

		setCurrentField(null);
	};

	const handleCropCancel = () => {
		cropperHook.cancelCropping();
		setCurrentField(null);
	};

	const handleDayToggle = (day: string) => {
		const currentDays = [...formik.values.daysOpen];
		const dayIndex = currentDays.indexOf(day);

		if (dayIndex === -1) {
			currentDays.push(day);
		} else {
			currentDays.splice(dayIndex, 1);
		}

		formik.setFieldValue("daysOpen", currentDays);
		setSelectedDays(currentDays);
	};

	return {
		formik,
		bannerPreview,
		logoPreview,
		handleImageChange,
		handleCropApply,
		handleCropCancel,
		handleDayToggle,
		currentField,
		cropperHook,
	};
};
