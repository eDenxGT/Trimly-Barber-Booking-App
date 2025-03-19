import React from "react";
import { Info } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

export const InfoAlert: React.FC = () => {
  return (
    <Alert className="mb-8 bg-blue-100 border-blue-300 text-blue-800">
      <Info className="h-5 w-5 text-blue-500" />
      <AlertTitle className="text-lg font-semibold text-blue-800">
        Registration Process
      </AlertTitle>
      <AlertDescription className="text-blue-700">
        <p className="mt-2">
          Please complete this form to register your barber shop. Your submission will be
          reviewed by our team within 2-3 business days. Once approved, your shop will be
          visible on our platform and you can start managing appointments and services.
        </p>
        <p className="mt-2">
          Make sure to provide accurate information and high-quality images to increase
          your chances of approval.
        </p>
      </AlertDescription>
    </Alert>
  );
};
