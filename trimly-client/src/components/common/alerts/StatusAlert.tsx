import React from "react";
import { Check } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { motion } from "framer-motion";

interface StatusAlertProps {
	success: boolean;
	error: string | null;
}

export const StatusAlert: React.FC<StatusAlertProps> = ({ success, error }) => {
	if (!success && !error) return null;

	return (
		<>
			{success && (
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					className="fixed bottom-4 right-4 max-w-md">
					<Alert className="bg-green-100 border-green-300 text-green-800">
						<Check className="h-5 w-5 text-green-600" />
						<AlertTitle className="text-green-800">
							Success!
						</AlertTitle>
						<AlertDescription className="text-green-700">
							Shop registration submitted successfully! We'll
							review your application and get back to you soon.
						</AlertDescription>
					</Alert>
				</motion.div>
			)}

			{error && (
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					className="fixed bottom-4 right-4 max-w-md">
					<Alert className="bg-red-100 border-red-300 text-red-800">
						<AlertTitle className="text-red-800">Error</AlertTitle>
						<AlertDescription className="text-red-700">
							{error}
						</AlertDescription>
					</Alert>
				</motion.div>
			)}
		</>
	);
};
