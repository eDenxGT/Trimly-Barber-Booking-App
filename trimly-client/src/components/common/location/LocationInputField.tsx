import { useRef, useState } from "react";
import useLocation from "@/hooks/common/useLocation";
import {
	Command,
	CommandList,
	CommandItem,
	CommandEmpty,
} from "@/components/ui/command";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { MapPin, Loader2, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LocationAutocompleteProps {
	onSelect: (location: {
		display: string;
		lat?: number;
		lon?: number;
		details?: {
			name?: string;
			city?: string;
			village?: string;
			town?: string;
			county?: string;
			state?: string;
			country?: string;
		};
	}) => void;
	initialValue?: string;
	placeholder?: string;
	className?: string;
	disabled?: boolean;
	onChange?: (value: string) => void; // Formik onChange function
}

export function LocationInputField({
	onSelect,
	initialValue = "",
	placeholder = "Search location...",
	className = "",
	disabled = false,
	onChange,
}: LocationAutocompleteProps) {
	const inputRef = useRef<HTMLInputElement>(null);
	const [open, setOpen] = useState(false);
	const {
		searchTerm,
		setSearchTerm,
		suggestions,
		loading,
		geoLoading,
		getCurrentLocation,
		clearSearch,
	} = useLocation();

	const handleCurrentLocation = async (e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();
		const currLoc = await getCurrentLocation();
		if (!currLoc) return;
		onSelect({
			display: currLoc.name,
			lat: currLoc.lat,
			lon: currLoc.lon,
			details: {
				name: currLoc.name,
				city: currLoc.city,
				village: currLoc.village,
				town: currLoc.town,
				county: currLoc.county,
				state: currLoc.state,
				country: currLoc.country,
			},
		});
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setSearchTerm(value);
		if (onChange) {
			onChange(value);
		}
		if (value.length >= 1) {
			setOpen(true);
		}
	};

	const handleInputClick = (e: React.MouseEvent) => {
		e.stopPropagation();
		if (searchTerm.length >= 1) {
			setOpen(true);
		}
	};

	return (
		<div className={`w-full relative ${className}`}>
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<div className="w-full flex items-center relative">
						<div className="absolute left-3 text-gray-400">
							<MapPin className="h-5 w-5" />
						</div>
						<input
							ref={inputRef}
							value={searchTerm || initialValue}
							onChange={handleInputChange}
							onClick={handleInputClick}
							placeholder={placeholder}
							className="w-full pl-10 pr-16 py-3 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:[var(--yellow)] focus:border-transparent transition-all duration-200"
							disabled={disabled || geoLoading}
						/>
						{/* <input
							ref={inputRef}
							value={searchTerm || initialValue}
							onChange={(e) => {
								setSearchTerm(e.target.value);
								if (e.target.value.length >= 1) {
									setOpen(true);
								}
							}}
							onClick={handleInputClick}
							onFocus={() => {
								if (searchTerm.length >= 1) {
									setOpen(true);
								}
							}}
							placeholder={placeholder}
							className="w-full pl-10 pr-16 py-3 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:[var(--yellow)] focus:border-transparent transition-all duration-200"
							disabled={disabled || geoLoading}
						/> */}
						{searchTerm && (
							<Button
								type="button"
								variant="ghost"
								size="icon"
								className="absolute right-10 text-gray-400 hover:text-gray-700"
								onClick={(e) => {
									e.preventDefault();
									e.stopPropagation();
									clearSearch();
								}}
								disabled={disabled || geoLoading}>
								<X className="h-4 w-4" />
							</Button>
						)}
						<Button
							type="button"
							variant="ghost"
							size="icon"
							className="absolute right-2 text-gray-500 hover:text-blue-500 hover:bg-blue-50 rounded-full"
							onClick={handleCurrentLocation}
							disabled={disabled || geoLoading}>
							{geoLoading ? (
								<Loader2 className="h-5 w-5 animate-spin" />
							) : (
								<MapPin className="h-5 w-5" />
							)}
						</Button>
					</div>
				</PopoverTrigger>
				<PopoverContent
					className="p-0 w-full min-w-[300px] max-h-[320px] overflow-y-auto shadow-lg rounded-lg border border-gray-200"
					align="start">
					<Command>
						<CommandList>
							{loading && (
								<div className="flex justify-center p-4">
									<Loader2 className="h-6 w-6 animate-spin bg-white text-blue-500" />
								</div>
							)}
							<CommandEmpty className="py-6 text-center bg-white text-gray-500">
								No locations found
							</CommandEmpty>
							{suggestions.map((place) => (
								<CommandItem
									key={`${place.osm_id}-${place.name}`}
									onSelect={() => {
										setSearchTerm(place.name);
										setOpen(false);
										onSelect({
											display: place.name,
											lat: place.lat,
											lon: place.lon,
											details: {
												name: place.name,
												city: place.city,
												village: place.village,
												town: place.town,
												county: place.county,
												state: place.state,
												country: place.country,
											},
										});
									}}
									className="flex flex-col items-start p-3 hover:bg-blue-50 cursor-pointer transition-colors duration-200">
									<div className="flex items-center w-full">
										<MapPin className="h-4 w-4 text-blue-500 mr-2 flex-shrink-0" />
										<div className="flex flex-col w-full overflow-hidden">
											<div className="font-medium text-gray-900 truncate">
												{place.name}
											</div>
											<div className="text-sm text-gray-500 truncate">
												{[
													place.city ||
														place.town ||
														place.village,
													place.county,
													place.state,
													place.country,
												]
													.filter(Boolean)
													.join(", ")}
											</div>
										</div>
									</div>
								</CommandItem>
							))}
						</CommandList>
					</Command>
				</PopoverContent>
			</Popover>
		</div>
	);
}
