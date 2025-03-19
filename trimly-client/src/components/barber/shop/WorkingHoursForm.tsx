import React from "react";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { TimePickerDemo } from "@/components/common/fields/TimePickerField";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

interface WorkingHoursFormProps {
  formik: any;
  handleDayToggle: (day: string) => void;
  DAYS_OF_WEEK: string[];
}

export const WorkingHoursForm: React.FC<WorkingHoursFormProps> = ({
  formik,
  handleDayToggle,
  DAYS_OF_WEEK
}) => {
  return (
    <Card className="mb-8 border border-teal-100 shadow-md">
      <CardHeader>
        <CardTitle className="text-teal-700">Working Hours</CardTitle>
        <CardDescription className="text-teal-500">
          Set your shop's operating hours
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 pt-6">
        <div className="space-y-2">
          <Label className="text-gray-700">Days Open</Label>
          <div className="flex flex-wrap gap-2 mt-2">
            {DAYS_OF_WEEK.map((day) => (
              <Badge
                key={day}
                variant={formik.values.daysOpen.includes(day) ? "default" : "outline"}
                className={`cursor-pointer ${
                  formik.values.daysOpen.includes(day)
                    ? "bg-teal-500 hover:bg-teal-600 text-white"
                    : "bg-white border-teal-300 text-teal-700 hover:bg-teal-50"
                }`}
                onClick={() => handleDayToggle(day)}
              >
                {day}
              </Badge>
            ))}
          </div>
          {formik.touched.daysOpen && formik.errors.daysOpen && (
            <p className="text-sm text-red-500">{formik.errors.daysOpen as string}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="openingTime" className="text-gray-700">Opening Time</Label>
            <TimePickerDemo
              value={formik.values.openingTime}
              onChange={(time) => formik.setFieldValue("openingTime", time)}
            />
            {formik.touched.openingTime && formik.errors.openingTime && (
              <p className="text-sm text-red-500">{formik.errors.openingTime}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="closingTime" className="text-gray-700">Closing Time</Label>
            <TimePickerDemo
              value={formik.values.closingTime}
              onChange={(time) => formik.setFieldValue("closingTime", time)}
            />
            {formik.touched.closingTime && formik.errors.closingTime && (
              <p className="text-sm text-red-500">{formik.errors.closingTime}</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
