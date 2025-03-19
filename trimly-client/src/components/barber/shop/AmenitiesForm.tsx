import React from "react";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Wifi, ParkingCircle } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

interface AmenitiesFormProps {
  formik: any;
}

export const AmenitiesForm: React.FC<AmenitiesFormProps> = ({ formik }) => {
  return (
    <Card className="mb-8 border border-amber-100 shadow-md">
      <CardHeader className="">
        <CardTitle className="text-amber-700">Features & Amenities</CardTitle>
        <CardDescription className="text-amber-500">
          Select the amenities available at your shop
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start space-x-2">
            <Checkbox
              id="wifi"
              checked={formik.values.amenities.wifi}
              onCheckedChange={(checked) =>
                formik.setFieldValue("amenities.wifi", checked)
              }
              className="border-amber-400 text-amber-600"
            />
            <div className="grid gap-1.5 leading-none">
              <Label
                htmlFor="wifi"
                className="flex items-center gap-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700"
              >
                <Wifi className="h-4 w-4 text-amber-500" /> Free WiFi
              </Label>
            </div>
          </div>

          <div className="flex items-start space-x-2">
            <Checkbox
              id="parking"
              checked={formik.values.amenities.parking}
              onCheckedChange={(checked) =>
                formik.setFieldValue("amenities.parking", checked)
              }
              className="border-amber-400 text-amber-600"
            />
            <div className="grid gap-1.5 leading-none">
              <Label
                htmlFor="parking"
                className="flex items-center gap-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700"
              >
                <ParkingCircle className="h-4 w-4 text-amber-500" /> Parking Available
              </Label>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
