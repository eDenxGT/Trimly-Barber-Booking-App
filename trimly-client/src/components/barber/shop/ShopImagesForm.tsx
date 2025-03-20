import React, { useRef } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CloudUpload } from "lucide-react";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
} from "@/components/ui/card";

interface ShopImagesFormProps {
	bannerPreview: string | null;
	logoPreview: string | null;
	handleImageChange: (
		event: React.ChangeEvent<HTMLInputElement>,
		fieldName: "bannerImageFile" | "logoImageFile"
	) => void;
}

export const ShopImagesForm: React.FC<ShopImagesFormProps> = ({
	bannerPreview,
	logoPreview,
	handleImageChange,
}) => {
	const bannerRef = useRef<HTMLInputElement>(null);
	const logoRef = useRef<HTMLInputElement>(null);

	return (
		<Card className="mb-8 border border-purple-100 shadow-md">
			<CardHeader>
				<CardTitle className="text-purple-700">Shop Images</CardTitle>
				<CardDescription className="text-purple-500">
					Upload images of your barber shop
				</CardDescription>
			</CardHeader>
			<CardContent className="pt-6">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<div className="space-y-4">
						<Label className="text-gray-700">Shop Banner</Label>
						<div className="border-2 border-dashed border-purple-200 rounded-lg p-4 text-center bg-purple-50">
							<input
								ref={bannerRef}
								accept="image/*"
								className="hidden"
								id="banner-upload"
								type="file"
								onChange={(e) =>
									handleImageChange(e, "bannerImageFile")
								}
							/>
							<label htmlFor="banner-upload">
								<Button
									type="button"
									variant="outline"
									className="cursor-pointer border-purple-300 text-purple-600 hover:bg-purple-100 hover:text-purple-700"
									onClick={() => bannerRef.current?.click()}>
									<CloudUpload className="mr-2 h-4 w-4" />
									Upload Banner
								</Button>
							</label>
							<p className="text-xs text-purple-500 mt-2">
								Recommended size: 1200 x 400 pixels
							</p>
						</div>
						{bannerPreview && (
							<div
								className="mt-2 w-full h-36 bg-cover bg-center rounded-md border border-purple-200"
								style={{
									backgroundImage: `url(${bannerPreview})`,
								}}
							/>
						)}
					</div>

					<div className="space-y-4">
						<Label className="text-gray-700">Shop Logo</Label>
						<div className="border-2 border-dashed border-purple-200 rounded-lg p-4 text-center bg-purple-50">
							<input
								ref={logoRef}
								accept="image/*"
								className="hidden"
								id="logo-upload"
								type="file"
								onChange={(e) =>
									handleImageChange(e, "logoImageFile")
								}
							/>
							<label htmlFor="logo-upload">
								<Button
									type="button"
									variant="outline"
									className="cursor-pointer border-purple-300 text-purple-600 hover:bg-purple-100 hover:text-purple-700"
									onClick={() => logoRef.current?.click()}>
									<CloudUpload className="mr-2 h-4 w-4" />
									Upload Logo
								</Button>
							</label>
							<p className="text-xs text-purple-500 mt-2">
								Recommended size: 400 x 400 pixels
							</p>
						</div>
						{logoPreview && (
							<div className="flex justify-center">
								<div
									className="mt-2 w-24 h-24 bg-cover bg-center rounded-full border border-purple-200"
									style={{
										backgroundImage: `url(${logoPreview})`,
									}}
								/>
							</div>
						)}
					</div>
				</div>
			</CardContent>
		</Card>
	);
};
