import * as React from "react";
import { Clock } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { formatTo12Hour } from "@/utils/helpers/timeFormatter";

interface TimePickerDemoProps {
	value: string;
	onChange: (time: string) => void;
}

export function TimePickerDemo({ value, onChange }: TimePickerDemoProps) {
	const [selectedTime, setSelectedTime] = React.useState<string>(value || "");

	const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const timeValue = e.target.value;
		setSelectedTime(timeValue);
		console.log(selectedTime);
		onChange(timeValue);
	};

	return (
		<Popover>
			<PopoverTrigger
				className="bg-gray-100 border border-gray-300"
				asChild>
				<Button
					variant="outline"
					className={cn(
						"w-full justify-start text-left font-normal",
						!selectedTime && "text-muted-foreground"
					)}>
					<Clock className="mr-2 h-4 w-4" />
					{selectedTime
						? formatTo12Hour(selectedTime)
						: "Select time"}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="bg-gray-100 border border-gray-300 w-auto p-4">
				<div className="space-y-2">
					<Label htmlFor="time">Time</Label>
					<Input
						className="bg-gray-100 border border-gray-300"
						id="time"
						type="time"
						value={selectedTime}
						onChange={handleTimeChange}
					/>
				</div>
			</PopoverContent>
		</Popover>
	);
}
