import { Card, CardContent } from "../../ui/card";
import { MapPin, Star, Calendar } from "lucide-react";
import { Button } from "../../ui/button";
import BarberStandingImg from "@/assets/common/barber-standing.png";

export function BarberCard() {
	return (
		<Card className="overflow-hidden py-0 border-0">
			<div className="relative">
				<img
					src={BarberStandingImg}
					alt="Barber"
					width={300}
					height={200}
					className="w-full h-[200px] object-fill"
				/>
				<Button className="absolute left-0 bottom-0 rounded-br-none rounded-tl-none py-2 px-4 text-white font-medium hover:bg-[var(--darkblue-hover)] bg-[var(--darkblue)]">
					Visit Profile
				</Button>
				<Button className="absolute right-0 bottom-0 rounded-bl-none  rounded-tr-none py-2 px-4 text-white font-medium flex items-center gap-1 hover:bg-[var(--yellow-hover)] bg-[var(--yellow)]">
					Book Now <Calendar size={16} />
				</Button>
			</div>
			<CardContent className="p-0">
				<div className="flex justify-between"></div>

				<div className="p-4">
					<h3 className="font-semibold text-base">
						Master piece Barbershop - Haircut styling, Hair Coloring
					</h3>

					<div className="flex items-center justify-between gap-1 mt-2 text-muted-foreground">
						<div className="flex text-gray-600 font- items-center gap-1">
							<MapPin size={14} />
							<span className="text-sm">
								Joga Expo Centre (2 km)
							</span>
						</div>
						<div className="flex items-center gap-1 mt-1">
							<div className="flex">
								{[1, 2, 3, 4, 5].map((star) => (
									<Star
										key={star}
										size={14}
										className="text-yellow-500 fill-yellow-500"
									/>
								))}
							</div>
							<span className="text-sm font-medium">5.0</span>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
