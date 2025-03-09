import { CircularProgress, circularProgressClasses } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export const Spinner = ({
	size = 40,
	thickness = 4,
	color,
}: {
	size?: number;
	thickness?: number;
	color: string;
}) => {
	const theme = useTheme();

	return (
		<CircularProgress
			variant="indeterminate"
			disableShrink
			sx={{
				color: color || theme.palette.primary.main,
				animationDuration: "550ms",
				position: "absolute",
				left: 0,
				[`& .${circularProgressClasses.circle}`]: {
					strokeLinecap: "round",
				},
			}}
			size={size}
			thickness={thickness}
		/>
	);
};
