import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CropperModal } from "@/components/modals/CropperModal";
import { InfoAlert } from "@/components/common/alerts/InfoAlert";
import { ShopDetailsForm } from "@/components/barber/shop/ShopDetailsForm";
import { ShopImagesForm } from "@/components/barber/shop/ShopImagesForm";
import { WorkingHoursForm } from "@/components/barber/shop/WorkingHoursForm";
import { AmenitiesForm } from "@/components/barber/shop/AmenitiesForm";
import {
	useBarberShopForm,
	DAYS_OF_WEEK,
} from "@/hooks/barber/shop/useBarberShopForm";

export function BarberShopRegister() {
	const {
		formik,
		bannerPreview,
		logoPreview,
		handleImageChange,
		handleCropApply,
		handleCropCancel,
		isLoading,
		handleDayToggle,
		currentField,
		cropperHook,
	} = useBarberShopForm();
	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1,
			},
		},
	};

	const itemVariants = {
		hidden: { y: 20, opacity: 0 },
		visible: {
			y: 0,
			opacity: 1,
			transition: {
				type: "spring",
				stiffness: 100,
			},
		},
	};

	return (
		<div className="mt-16 container mx-auto py-8 px-4 max-w-3xl">
			<motion.div
				initial="hidden"
				animate="visible"
				variants={containerVariants}>
				<motion.div variants={itemVariants}>
					<h1 className="text-3xl font-bold mb-4 text-indigo-800">
						Barber Shop Registration
					</h1>

					<InfoAlert />
				</motion.div>

				<form
					onSubmit={(e) => {
						e.preventDefault(); 
						formik.handleSubmit();
					}}>
					{/* Basic Shop Details */}
					<motion.div variants={itemVariants}>
						<ShopDetailsForm formik={formik} />
					</motion.div>

					{/* Shop Images */}
					<motion.div variants={itemVariants}>
						<ShopImagesForm
							bannerPreview={bannerPreview}
							logoPreview={logoPreview}
							handleImageChange={handleImageChange}
						/>
					</motion.div>

					{/* Working Hours */}
					<motion.div variants={itemVariants}>
						<WorkingHoursForm
							formik={formik}
							handleDayToggle={handleDayToggle}
							DAYS_OF_WEEK={DAYS_OF_WEEK}
						/>
					</motion.div>

					{/* Features & Amenities */}
					<motion.div variants={itemVariants}>
						<AmenitiesForm formik={formik} />
					</motion.div>

					{/* Submit Button */}
					<motion.div variants={itemVariants}>
						<div className="flex justify-end">
							<Button
								type="submit"
								className="min-w-36 bg-indigo-600 hover:bg-indigo-700 text-white"
								// disabled={isLoading}
								>
								{isLoading ? (
									<>
										<span className="mr-2">Submitting</span>
										<div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
									</>
								) : (
									"Submit Registration"
								)}
							</Button>
						</div>
					</motion.div>
				</form>
			</motion.div>

			{/* Image Cropper Modal */}
			<CropperModal
				open={cropperHook.isCropping}
				image={cropperHook.currentImage}
				onClose={handleCropCancel}
				onCropComplete={cropperHook.onCropComplete}
				onCrop={handleCropApply}
				crop={cropperHook.crop}
				setCrop={cropperHook.setCrop}
				zoom={cropperHook.zoom}
				setZoom={cropperHook.setZoom}
				rotation={cropperHook.rotation}
				setRotation={cropperHook.setRotation}
				aspect={currentField === "logoImageFile" ? 1 : 16 / 9}
				cropShape={currentField === "logoImageFile" ? "round" : "rect"}
			/>
		</div>
	);
}
