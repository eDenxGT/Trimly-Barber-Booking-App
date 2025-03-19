
import { useState, useCallback } from 'react';
import { Area } from 'react-easy-crop';

export interface CropConfig {
  aspect?: number;
  cropShape?: 'rect' | 'round';
  minWidth?: number;
  minHeight?: number;
}

export interface CropResult {
  file: File;
  preview: string;
}

export const useCropImage = () => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [isCropping, setIsCropping] = useState(false);
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [originalFile, setOriginalFile] = useState<File | null>(null);

  const onCropComplete = useCallback((croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const startCropping = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      setCurrentImage(reader.result as string);
      setOriginalFile(file);
      setIsCropping(true);
      setCrop({ x: 0, y: 0 });
      setZoom(1);
      setRotation(0);
    };
    reader.readAsDataURL(file);
  }, []);

  const cancelCropping = useCallback(() => {
    setIsCropping(false);
    setCurrentImage(null);
    setOriginalFile(null);
  }, []);

  const cropImage = useCallback(async (): Promise<CropResult | null> => {
    if (!currentImage || !croppedAreaPixels || !originalFile) return null;

    try {
      const croppedImage = await getCroppedImg(
        currentImage,
        croppedAreaPixels,
        rotation
      );
      
      const fileName = originalFile.name;
      const fileType = originalFile.type;
      const croppedFile = new File(
        [croppedImage],
        `cropped-${fileName}`,
        { type: fileType }
      );

      setIsCropping(false);
      setCurrentImage(null);
      setOriginalFile(null);

      return {
        file: croppedFile,
        preview: URL.createObjectURL(croppedImage)
      };
    } catch (error) {
      console.error('Error cropping image:', error);
      return null;
    }
  }, [currentImage, croppedAreaPixels, rotation, originalFile]);

  return {
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
  };
};

const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', (error) => reject(error));
    image.src = url;
  });

const getCroppedImg = async (
  imageSrc: string,
  pixelCrop: Area,
  rotation = 0
): Promise<Blob> => {
  const image = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error('No 2d context');
  }

  const maxSize = Math.max(image.width, image.height);
  const safeArea = 2 * ((maxSize / 2) * Math.sqrt(2));

  canvas.width = safeArea;
  canvas.height = safeArea;

  ctx.translate(safeArea / 2, safeArea / 2);
  ctx.rotate(getRadianAngle(rotation));
  ctx.translate(-safeArea / 2, -safeArea / 2);
  ctx.drawImage(
    image,
    safeArea / 2 - image.width * 0.5,
    safeArea / 2 - image.height * 0.5
  );

  const data = ctx.getImageData(
    safeArea / 2 - pixelCrop.width / 2,
    safeArea / 2 - pixelCrop.height / 2,
    pixelCrop.width,
    pixelCrop.height
  );

  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  ctx.putImageData(data, 0, 0);

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        reject(new Error('Canvas is empty'));
        return;
      }
      resolve(blob);
    }, 'image/jpeg');
  });
};

const getRadianAngle = (degreeValue: number): number => {
  return (degreeValue * Math.PI) / 180;
};