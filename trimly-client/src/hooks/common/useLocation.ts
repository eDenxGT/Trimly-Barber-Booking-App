import { useState, useCallback, useEffect } from "react";

interface LocationData {
	osm_id: string;
	name: string;
	city?: string;
	village?: string;
	town?: string;
	county?: string;
	state?: string;
	country: string;
	zipCode?: string;
	lat: number;
	lon: number;
}

const useLocation = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [suggestions, setSuggestions] = useState<LocationData[]>([]);
	const [loading, setLoading] = useState(false);
	const [geoLoading, setGeoLoading] = useState(false);
	const [debouncedTerm, setDebouncedTerm] = useState(searchTerm);

	useEffect(() => {
		const timer = setTimeout(() => {
			setDebouncedTerm(searchTerm);
		}, 300);
		return () => clearTimeout(timer);
	}, [searchTerm]);

	useEffect(() => {
		if (debouncedTerm.length >= 1) {
			fetchLocations(debouncedTerm);
		} else {
			setSuggestions([]);
		}
	}, [debouncedTerm]);

	const fetchLocations = useCallback(async (query: string) => {
		if (query.length < 1) return;
		setLoading(true);
		try {
			const response = await fetch(
				`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
					query
				)}&addressdetails=1&limit=8`
			);
			if (!response.ok) throw new Error("Network error");

			const data = await response.json();
			const formattedSuggestions = data.map((place: any) => {
				const address = place.address || {};
				return {
					osm_id: place.osm_id || `place-${Date.now()}`,
					name:
						place.display_name.split(",")[0] +
							"," +
							place.display_name.split(",")[1] +
							"," +
							place.display_name.split(",")[2] ||
						place.name ||
						"",
					city: address.city || "",
					village: address.village || "",
					town: address.town || "",
					county: address.county || "",
					state: address.state || "",
					zipCode: address.postcode || "",
					country: address.country || "",
					lat: parseFloat(place.lat),
					lon: parseFloat(place.lon),
				};
			});
			setSuggestions(formattedSuggestions);
		} catch (error) {
			console.error("Error fetching locations:", error);
			setSuggestions([]);
		} finally {
			setLoading(false);
		}
	}, []);

	const getCurrentLocation = useCallback(
		() =>
			new Promise<LocationData | null>((resolve) => {
				if (!navigator.geolocation) {
					console.error("Geolocation not supported");
					resolve(null);
					return;
				}
				setGeoLoading(true);
				navigator.geolocation.getCurrentPosition(
					async ({ coords }) => {
						try {
							const response = await fetch(
								`https://nominatim.openstreetmap.org/reverse?format=json&lat=${coords.latitude}&lon=${coords.longitude}&zoom=18&addressdetails=1`
							);
							if (!response.ok)
								throw new Error("Failed to fetch location");

							const data = await response.json();
							const address = data.address || {};

							const displayName = [
								address.house_number && address.road
									? `${address.house_number} ${address.road}`
									: address.road,
								address.city || address.town || address.village,
								address.county,
								address.state,
								address.country,
							]
								.filter(Boolean)
								.join(", ");

							const location: LocationData = {
								osm_id: data.osm_id || `geo-${Date.now()}`,
								name:
									displayName ||
									data.display_name ||
									`${coords.latitude}, ${coords.longitude}`,
								city: address.city || "",
								village: address.village || "",
								town: address.town || "",
								county: address.county || "",
								state: address.state || "",
								country: address.country || "",
								zipCode: address.postcode || "",
								lat: coords.latitude,
								lon: coords.longitude,
							};
							setSearchTerm(displayName);
							resolve(location);
						} catch (error) {
							console.error(
								"Error fetching reverse geolocation:",
								error
							);
							resolve(null);
						} finally {
							setGeoLoading(false);
						}
					},
					(error) => {
						console.error("Geolocation error:", error.message);
						setGeoLoading(false);
						resolve(null);
					},
					{ enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
				);
			}),
		[]
	);

	const clearSearch = useCallback(() => {
		setSearchTerm("");
		setSuggestions([]);
	}, []);

	return {
		searchTerm,
		setSearchTerm,
		suggestions,
		loading,
		fetchLocations,
		geoLoading,
		getCurrentLocation,
		clearSearch,
	};
};

export default useLocation;
