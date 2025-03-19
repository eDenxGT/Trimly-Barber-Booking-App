
import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Upload, Check, X, Crop } from "lucide-react";
import { useCropImage } from "@/hooks/common/useCropImage";
import { CropperModal } from "@/components/modals/CropperModal";

interface ImageUploadFieldProps {
  name: string;
  label: string;
  onChange: (file: File | null) => void;
  error?: boolean;
  aspect?: number;
  cropShape?: 'rect' | 'round';
}

export const ImageUploadField: React.FC<ImageUploadFieldProps> = ({
  name,
  label,
  onChange,
  error,
  aspect = 16 / 9,
  cropShape = 'rect',
}) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Use our custom crop hook
  const {
    crop,
    setCrop,
    zoom,
    setZoom,
    rotation,
    setRotation,
    onCropComplete,
    startCropping,
    cancelCropping,
    cropImage,
    currentImage,
    isCropping
  } = useCropImage();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      startCropping(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file) {
      startCropping(file);
    }
  };

  const handleCrop = async () => {
    const result = await cropImage();
    if (result) {
      setPreview(result.preview);
      onChange(result.file);
    }
  };

  const handleRemoveImage = () => {
    setPreview(null);
    onChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="mt-1">
      <input
        ref={fileInputRef}
        type="file"
        id={name}
        name={name}
        className="sr-only"
        accept="image/*"
        onChange={handleFileChange}
      />
      
      {!preview ? (
        <motion.div
          whileHover={{ scale: 1.01 }}
          className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer
            ${isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"}
            ${error ? "border-red-500" : ""}
          `}
          onClick={() => fileInputRef.current?.click()}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <Upload className="mx-auto h-12 w-12 text-gray-400" />
          <div className="mt-2">
            <p className="text-sm font-medium text-gray-900">{label}</p>
            <p className="text-xs text-gray-500 mt-1">
              PNG, JPG, WEBP up to 10MB
            </p>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-3"
            onClick={() => fileInputRef.current?.click()}
          >
            Choose File
          </Button>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative rounded-lg overflow-hidden"
        >
          <div className="aspect-video relative group">
            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Button
                type="button"
                variant="destructive"
                size="sm"
                className="absolute top-2 right-2"
                onClick={handleRemoveImage}
              >
                <X className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="text-white border-white mr-2"
                onClick={() => fileInputRef.current?.click()}
              >
                Change Image
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="text-white border-white"
                onClick={() => {
                  if (fileInputRef.current?.files?.[0]) {
                    startCropping(fileInputRef.current.files[0]);
                  }
                }}
              >
                <Crop className="h-4 w-4 mr-1" />
                Recrop
              </Button>
            </div>
            <div className="absolute bottom-2 right-2 bg-green-500 text-white p-1 rounded-full">
              <Check className="h-4 w-4" />
            </div>
          </div>
        </motion.div>
      )}
      
      {/* Cropper Modal */}
      <CropperModal
        open={isCropping}
        image={currentImage}
        onClose={cancelCropping}
        onCropComplete={onCropComplete}
        onCrop={handleCrop}
        crop={crop}
        setCrop={setCrop}
        zoom={zoom}
        setZoom={setZoom}
        rotation={rotation}
        setRotation={setRotation}
        aspect={aspect}
        cropShape={cropShape}
      />
    </div>
  );
};
