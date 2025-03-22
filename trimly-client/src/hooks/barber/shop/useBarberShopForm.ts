import { useState } from "react";
import { useFormik } from "formik";
import { useCropImage } from "@/hooks/common/useCropImage";
import { barberShopValidationSchema } from "@/utils/validations/barber-shop.validator";
import { useCreateBarberShop } from "./useCreateBarberShop";
import { useToaster } from "@/hooks/ui/useToaster";
import { uploadToCloudinary } from "@/services/cloudinary/cloudinary";
import { useMutation } from "@tanstack/react-query";
import { IAxiosResponse } from "@/types/Response";

export interface IBarberShopData {
	id?: string;
	shopId?: string;
	owner?: string;
	ownerName?: string;
	barbers?: string[];
	name: string;
	description?: string;
	contactNumber?: string;
	paymentMode?: "shop_wallet" | "direct_payment";
	address: {
		display?: string;
		street?: string;
		city?: string;
		state?: string;
		country?: string;
		zipCode?: string;
		location: {
			latitude: number;
			longitude: number;
		};
	};
	commissionPercentage?: number;
	daysOpen: string[];
	openingTime: string;
	closingTime: string;
	email?: string;
	amenities: {
		wifi: boolean;
		parking: boolean;
	};
	status?: "active" | "pending" | "blocked";
	bannerImageFile: File | null;
	bannerImage: string | null;
	logoImage: string | null;
	logoImageFile: File | null;
	createdBy?: string;
	approvedBy?: string;
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
	const [currentField, setCurrentField] = useState<
		"bannerImageFile" | "logoImageFile" | null
	>(null);

	const cropperHook = useCropImage();
	const {
		mutate: registerShop,
		isPending,
		isError,
		isSuccess,
	} = useCreateBarberShop();
	const { successToast, errorToast } = useToaster();

	const handleCreateBarberShopSubmit = async (data: IBarberShopData) => {
		try {
			const uploadedBanner = data.bannerImageFile
				? await uploadToCloudinary(data.bannerImageFile as File)
				: null;
			const uploadedLogo = data.logoImageFile
				? await uploadToCloudinary(data.logoImageFile as File)
				: null;

			registerShop(
				{
					...data,
					bannerImage: uploadedBanner || "",
					logoImage: uploadedLogo || "",
				},
				{
					onSuccess: (res) => {
						formik.resetForm();
						successToast(res.message);
					},
					onError: (error: any) =>
						errorToast(error.response.data.message),
				}
			);
		} catch (error) {
			console.log(error);
			errorToast("Image upload failed");
		}
	};

	const formik = useFormik<IBarberShopData>({
		initialValues: {
			name: "",
			description: "",
			contactNumber: "",
			address: {
				display: "",
				street: "",
				city: "",
				state: "",
				country: "",
				zipCode: "",
				location: { latitude: 0, longitude: 0 },
			},
			daysOpen: [],
			openingTime: "",
			closingTime: "",
			amenities: { wifi: false, parking: false },
			bannerImageFile: null,
			bannerImage: null,
			logoImageFile: null,
			logoImage: null,
		},
		validationSchema: barberShopValidationSchema,
		onSubmit: async (values) => {
			await handleCreateBarberShopSubmit(values);
		},
	});

	const handleImageChange = (
		event: React.ChangeEvent<HTMLInputElement>,
		fieldName: "bannerImageFile" | "logoImageFile"
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
			if (currentField === "bannerImageFile")
				setBannerPreview(result.preview);
			else setLogoPreview(result.preview);
		}
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
		// setSelectedDays(currentDays);
	};

	const handleCropCancel = () => {
		cropperHook.cancelCropping();
		setCurrentField(null);
	};

	return {
		isLoading: !isError && isPending && !isSuccess,
		formik,
		bannerPreview,
		logoPreview,
		handleImageChange,
		handleCropApply,
		currentField,
		cropperHook,
		handleCropCancel,
		handleDayToggle,
	};
};

export const useShopStatusMutation = (
	mutationFn: (data: Partial<IBarberShopData>) => Promise<IAxiosResponse>
) => {
	return useMutation<IAxiosResponse, Error, Partial<IBarberShopData>>({
		mutationFn,
	});
};
