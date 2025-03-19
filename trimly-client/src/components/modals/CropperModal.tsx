import React from "react";
import Cropper from "react-easy-crop";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogFooter,
} from "@/components/ui/dialog";
import { RotateCw, ZoomIn, X, Check } from "lucide-react";
import { Area } from "react-easy-crop";
import { cn } from "@/lib/utils";

interface CropperModalProps {
	open: boolean;
	image: string | null;
	onClose: () => void;
	onCropComplete: (croppedArea: Area, croppedAreaPixels: Area) => void;
	onCrop: () => void;
	crop: { x: number; y: number };
	setCrop: (crop: { x: number; y: number }) => void;
	zoom: number;
	setZoom: (zoom: number) => void;
	rotation: number;
	setRotation: (rotation: number) => void;
	aspect?: number;
	cropShape?: "rect" | "round";
}

export const CropperModal: React.FC<CropperModalProps> = ({
	open,
	image,
	onClose,
	onCropComplete,
	onCrop,
	crop,
	setCrop,
	zoom,
	setZoom,
	rotation,
	setRotation,
	aspect = 16 / 9,
	cropShape = "rect",
}) => {
	if (!image) return null;

	return (
		<Dialog open={open} onOpenChange={() => !open && onClose()}>
			<DialogContent className="bg-gray-200 sm:max-w-xl">
				<DialogHeader>
					<DialogTitle>Crop Image</DialogTitle>
				</DialogHeader>

				<div className="relative h-96 ">
					<Cropper
						image={image}
						crop={crop}
						zoom={zoom}
						rotation={rotation}
						aspect={aspect}
						cropShape={cropShape}
						onCropChange={setCrop}
						onCropComplete={onCropComplete}
						objectFit="contain"
						classes={{
							containerClassName: "bg-gray-100",
						}}
					/>
				</div>

				<div className="space-y-4">
					<div className="flex items-center gap-4">
						<ZoomIn className="h-5 w-5 text-gray-500" />
						<p className="w-16 text-sm">Zoom</p>
						<Slider
							className={cn("bg-gray-500 rounded-full")}
							defaultValue={[zoom]}
							min={1}
							max={3}
							step={0.1}
							onValueChange={(values) => setZoom(values[0])}
						/>
					</div>

					<div className="flex items-center gap-4">
						<RotateCw className="h-5 w-5 text-gray-500" />
						<p className="w-16 text-sm">Rotation</p>
						<Slider
							className={cn("bg-gray-500 rounded-full")}
							defaultValue={[rotation]}
							min={0}
							max={360}
							step={1}
							onValueChange={(values) => setRotation(values[0])}
						/>
					</div>
				</div>

				<DialogFooter>
					<Button onClick={onClose} className="bg-red-500 hover:bg-red-400 gap-2">
						<X className="h-4 w-4" />
						Cancel
					</Button>
					<Button onClick={onCrop} className="gap-2 hover:bg-yellow-400 bg-yellow-500">
						<Check className="h-4 w-4" />
						Apply
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};
