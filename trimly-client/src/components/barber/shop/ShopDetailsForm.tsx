import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
} from "@/components/ui/card";
import { LocationInputField } from "@/components/common/fields/LocationInputField";

interface ShopDetailsFormProps {
	formik: any;
}

export const ShopDetailsForm: React.FC<ShopDetailsFormProps> = ({ formik }) => {
	return (
		<Card className="mb-8 border border-indigo-100 shadow-md">
			<CardHeader>
				<CardTitle className="text-indigo-700">
					Basic Shop Details
				</CardTitle>
				<CardDescription className="text-indigo-500">
					Enter the basic information about your barber shop
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-4 pt-6">
				<div className="space-y-2">
					<Label htmlFor="name" className="text-gray-700">
						Shop Name
					</Label>
					<Input
						id="name"
						name="name"
						value={formik.values.name}
						onChange={formik.handleChange}
						placeholder="Enter your shop name"
						className={`${
							formik.touched.name && formik.errors.name
								? "border-red-500 focus:ring-red-500"
								: "border-gray-300 focus:ring-indigo-500"
						}`}
					/>
					{formik.touched.name && formik.errors.name && (
						<p className="text-sm text-red-500">
							{formik.errors.name}
						</p>
					)}
				</div>

				<div className="space-y-2">
					<Label htmlFor="description" className="text-gray-700">
						Description
					</Label>
					<Textarea
						id="description"
						name="description"
						value={formik.values.description}
						onChange={formik.handleChange}
						placeholder="Describe your barber shop"
						className={`min-h-32 ${
							formik.touched.description &&
							formik.errors.description
								? "border-red-500 focus:ring-red-500"
								: "border-gray-300 focus:ring-indigo-500"
						}`}
					/>
					{formik.touched.description &&
						formik.errors.description && (
							<p className="text-sm text-red-500">
								{formik.errors.description}
							</p>
						)}
				</div>

				<div className="space-y-2">
					<Label htmlFor="location" className="text-gray-700">
						Location
					</Label>
					<LocationInputField
						initialValue={formik.values.location.display}
						onSelect={(location) => {
							formik.setFieldValue("location", location);
						}}
						placeholder="Search for your shop location"
						onChange={(value) => {
							formik.setFieldValue("location.display", value);
						}}
					/>
					{formik.touched.location?.display &&
						formik.errors.location?.display && (
							<p className="text-sm text-red-500">
								{formik.errors.location.display}
							</p>
						)}
				</div>

				<div className="space-y-2">
					<Label htmlFor="contactNumber" className="text-gray-700">
						Contact Number
					</Label>
					<Input
						id="contactNumber"
						name="contactNumber"
						value={formik.values.contactNumber}
						onChange={formik.handleChange}
						placeholder="Enter contact number"
						className={`${
							formik.touched.contactNumber &&
							formik.errors.contactNumber
								? "border-red-500 focus:ring-red-500"
								: "border-gray-300 focus:ring-indigo-500"
						}`}
					/>
					{formik.touched.contactNumber &&
						formik.errors.contactNumber && (
							<p className="text-sm text-red-500">
								{formik.errors.contactNumber}
							</p>
						)}
				</div>

				<div className="space-y-2">
					<Label htmlFor="email" className="text-gray-700">
						Email
					</Label>
					<Input
						id="email"
						name="email"
						type="email"
						value={formik.values.email}
						onChange={formik.handleChange}
						placeholder="Enter email address"
						className={`${
							formik.touched.email && formik.errors.email
								? "border-red-500 focus:ring-red-500"
								: "border-gray-300 focus:ring-indigo-500"
						}`}
					/>
					{formik.touched.email && formik.errors.email && (
						<p className="text-sm text-red-500">
							{formik.errors.email}
						</p>
					)}
				</div>

				<div className="space-y-2">
					<Label htmlFor="website" className="text-gray-700">
						Website (Optional)
					</Label>
					<Input
						id="website"
						name="website"
						value={formik.values.website}
						onChange={formik.handleChange}
						placeholder="https://yourwebsite.com"
						className={`${
							formik.touched.website && formik.errors.website
								? "border-red-500 focus:ring-red-500"
								: "border-gray-300 focus:ring-indigo-500"
						}`}
					/>
					{formik.touched.website && formik.errors.website && (
						<p className="text-sm text-red-500">
							{formik.errors.website}
						</p>
					)}
				</div>
			</CardContent>
		</Card>
	);
};
